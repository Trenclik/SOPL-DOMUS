import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema.js';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '$lib/resend.js'; // Ensure named export is used
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		// Parse the form data
		const formData = await request.formData();
		const email = formData.get('email');
		const nickname = formData.get('nickname');
		const password = formData.get('password');

		if (!email || !nickname || !password) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Invalid input',
				}),
				{ status: 400 }
			);
		}

		// Check for existing user by nickname or email
		const existingUserByNickname = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.nickname, nickname))
			.get();

		const existingUserByEmail = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.get();

		if (existingUserByNickname) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'This username already exists, please try another one',
				}),
				{ status: 409 }
			);
		}

		if (existingUserByEmail) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'This email already exists, please try another one',
				}),
				{ status: 409 }
			);
		}

		// Hash the password
		const passwordHash = await bcrypt.hash(password, 10);
		const token = Math.random().toString(36).substr(2);

		// Insert new user into the database
		await db
			.insert(usersTable)
			.values({
				email,
				nickname,
				passwordHash,
				isEmailVerified: 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			})
			.run();

		// Retrieve the newly created user
		const newUser = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.get();

		if (!newUser) {
			throw new Error('User could not be found after insertion.');
		}

		const userId = newUser.id;

		try {
			// Send the verification email
			await sendVerificationEmail(email, nickname, token);

			// Update the user's token in the database
			await db
				.update(usersTable)
				.set({
					token,
					updatedAt: new Date().toISOString(),
				})
				.where(eq(usersTable.id, userId))
				.run();

			return new Response(
				JSON.stringify({
					success: true,
					message: 'User registered. Please verify your email.',
				}),
				{ status: 201 }
			);
		} catch (emailError) {
			// Rollback the user creation if email fails
			await db.delete(usersTable).where(eq(usersTable.id, userId)).run();
			console.error('Failed to send verification email:', emailError);
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Registration failed. Unable to send verification email.',
				}),
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error during registration process:', error);
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
			}),
			{ status: 500 }
		);
	}
}
