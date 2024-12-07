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
  
    if (!nickname || !password) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid input' }), { status: 400 });
    }
  
    try {
      // Fetch user by nickname
      const user = await db.select().from(usersTable).where(eq(usersTable.nickname, nickname)).get();
  
      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
      }
  
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid password' }), { status: 401 });
      }
  
      // Create session cookie
      const sessionCookie = serialize('session', user.id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
  
      // Mark user as online
      await db.update(usersTable).set({ isOnline: 1 }).where(eq(usersTable.id, user.id)).run();
  
      // Return success with the Set-Cookie header
      return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
        status: 200,
        headers: { 'Set-Cookie': sessionCookie },
      });
    } catch (error) {
      console.error('Login error:', error);
      return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
  }
  