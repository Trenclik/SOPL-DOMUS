import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema.js';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { eq } from 'drizzle-orm';

export async function GET({ request }) {
    const sessionCookie = request.headers.get('cookie')?.split(';').find(cookie => cookie.trim().startsWith('session='));
  
    if (!sessionCookie) {
      return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
    }
  
    const userId = sessionCookie.split('=')[1];
  
    try {
      const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).get();
  
      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
      }
  
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
  }

export async function POST({ request }) {
  const formData = await request.formData();
  const nickname = formData.get('nickname');
  const password = formData.get('password');
  const rememberMe = formData.get('rememberMe') === 'true'; // Get the "Remember Me" value

  if (!nickname || !password) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid input' }), { status: 400 });
  }

  try {
    // Query the database for the user by nickname
    const user = await db.select().from(usersTable).where(eq(usersTable.nickname, nickname)).get();
    
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }

    // Compare the provided password with the stored hash
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), { status: 401 });
    }

    // Ensure the user has verified their email
    if (user.isEmailVerified !== 1) {
      return new Response(JSON.stringify({ success: false, message: 'Please verify your email before logging in.' }), { status: 403 });
    }

    // Mark the user as online
    await db.update(usersTable)
      .set({ isOnline: 1 })
      .where(eq(usersTable.id, user.id))
      .run();

    // If "Remember Me" is selected, set maxAge to 30 days; otherwise, leave session cookie
    const cookieOptions = rememberMe
      ? {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30, // 30 days
          sameSite: 'strict', // Set proper type
          secure: true,
          path: '/' // Path for cookie (root of the site)
        }
      : {
          httpOnly: true,
          sameSite: 'strict', // Session cookie without maxAge
          secure: true,
          path: '/' // Path for cookie
        };

    // Create the session cookie with the user's ID as the value
    const cookie = serialize('session', user.id.toString(), cookieOptions);

    // Return the response with the set cookie and success message
    return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Location': '/profile' // Redirect the user after a successful login
      }
    });
  } catch (error) {
    // Log any error that occurs during the login process
    console.error('Login error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}
