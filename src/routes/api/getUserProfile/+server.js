export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const nickname = formData.get('nickname');
		const password = formData.get('password');

		if (!nickname || !password) {
			return new Response(JSON.stringify({ success: false, message: 'Invalid input' }), { status: 400 });
		}

		const user = await db.select().from(usersTable).where(eq(usersTable.nickname, nickname)).get();

		if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
			return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
		}

		// Set the user as online
		await db.update(usersTable).set({ isOnline: 1 }).where(eq(usersTable.id, user.id)).run();

		// Create session cookie
		const sessionCookie = serialize('session', user.id.toString(), {
			httpOnly: true,
			secure: true, // Ensure this is true in production (HTTPS)
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 24 * 30, // 30 days
		});

		return new Response(JSON.stringify({ success: true, message: 'Login successful' }), {
			status: 200,
			headers: { 'Set-Cookie': sessionCookie },
		});
	} catch (error) {
		console.error('Login error:', error);
		return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
	}
}