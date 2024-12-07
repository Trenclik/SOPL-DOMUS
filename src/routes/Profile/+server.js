import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
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
  const sessionCookie = request.headers.get('cookie')?.split(';').find(cookie => cookie.trim().startsWith('session='));

  if (!sessionCookie) {
    return new Response(JSON.stringify({ success: false, message: 'Not authenticated' }), { status: 401 });
  }

  const userId = sessionCookie.split('=')[1];

  try {
    // Optionally, you could log out by clearing the session cookie here, but we're just redirecting
    return new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error during logout:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
  }
}
