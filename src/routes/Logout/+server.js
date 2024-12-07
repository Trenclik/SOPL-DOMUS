import { serialize } from 'cookie';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
	try {
		// Extract session cookie
		const sessionCookie = request.headers.get('cookie')?.split(';').find(cookie => cookie.trim().startsWith('session='));

		if (!sessionCookie) {
			return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
		}

		const userId = sessionCookie.split('=')[1];

		// Fetch user to ensure validity
		const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).get();

		if (!user) {
			return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
		}

		// Update the `isOnline` field
		await db.update(usersTable).set({ isOnline: 0 }).where(eq(usersTable.id, user.id)).run();

		// Expire the session cookie
		const expiredCookie = serialize('session', '', {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			maxAge: -1, // Expire immediately
		});

		return new Response(JSON.stringify({ success: true, message: 'Logout successful' }), {
			status: 200,
			headers: { 'Set-Cookie': expiredCookie },
		});
	} catch (error) {
		console.error('Error during logout:', error);
		return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
	}
}
