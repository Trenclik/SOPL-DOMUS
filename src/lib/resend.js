import fetch from 'node-fetch'; // Ensure node-fetch is installed and imported correctly

const { SECRET_RESEND_API_KEY, BASE_URL } = process.env; // Load environment variables

export async function sendVerificationEmail(to, nickname, token) {
	const subject = 'Verify Your Email';
	const verifyLink = `${BASE_URL}/Verify?token=${token}`; // Dynamic link based on BASE_URL
	const htmlContent = `
		Hello ${nickname},<br>
		Please verify your email by clicking on the following link: 
		<a href="${verifyLink}">Verify Email</a>
	`;
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${SECRET_RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: 'delivered@resend.dev',
			to,
			subject,
			html: htmlContent,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to send email: ${errorText}`);
	}

	return response.json();
}

export async function sendEmail(to, subject, html) {
	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${SECRET_RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: 'delivered@resend.dev', // Test email address
			to,
			subject,
			html,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error(`Failed to send email: ${errorText}`);
		throw new Error('Failed to send email');
	}

	return response.json();
}
