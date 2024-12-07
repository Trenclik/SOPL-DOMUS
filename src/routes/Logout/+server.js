import { serialize } from 'cookie';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(event) {
  try {
    const { locals } = event;

    // Check if the user is logged in (i.e., if locals.user exists)
    if (locals.user) {
      // Update the user's status to offline (isOnline = 0)
      await db.update(usersTable)
        .set({ isOnline: 0 })
        .where(eq(usersTable.id, locals.user.id))
        .run();
    }

    // Set the cookie to expire immediately
    const cookie = serialize('session', '', {
      httpOnly: true,
      maxAge: -1, // Expires immediately
      sameSite: 'strict',
      secure: true,
    });

    // Return a response with the Set-Cookie header
    return new Response('Logout successful', {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
