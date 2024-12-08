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
    const verified = await db.select().from(usersTable).where(eq(usersTable.isEmailVerified, 1)).get()
    if (!verified) {
      return new Response(JSON.stringify({ success: false, message: 'Email not verified' }), { status: 401 });
    }
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
    try {
      const formData = await request.formData();
      const nickname = formData.get('nickname');
      const password = formData.get('password');
  
      if (!nickname || !password) {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid input' }),
          { status: 400 }
        );
      }
  
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.nickname, nickname))
        .get();
  
      // Check if the user exists and the password is valid
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return new Response(
          JSON.stringify({ success: false, message: 'Invalid credentials' }),
          { status: 401 }
        );
      }
  
      // Check if the email is verified
      if (!user.isEmailVerified) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Email not verified. Please verify your email first.',
          }),
          { status: 403 }
        );
      }
  
      // Set the user as online
      await db
        .update(usersTable)
        .set({ isOnline: 1 })
        .where(eq(usersTable.id, user.id))
        .run();
  
      // Create session cookie
      const sessionCookie = serialize('session', user.id.toString(), {
        httpOnly: true,
        secure: true, // Ensure this is true in production (HTTPS)
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
  
      return new Response(
        JSON.stringify({ success: true, message: 'Login successful' }),
        {
          status: 200,
          headers: { 'Set-Cookie': sessionCookie },
        }
      );
    } catch (error) {
      console.error('Login error:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Internal Server Error' }),
        { status: 500 }
      );
    }
  }
  