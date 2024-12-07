import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema.js';
import { parse } from 'cookie';
import { eq } from 'drizzle-orm';

export async function GET({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');
  const userId = cookies.session;

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    // Fetch user profile from the database using the userId
    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).get();

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Return the user profile data
    return new Response(JSON.stringify({ profileImage: user.profileImage, nickname: user.nickname}), { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
