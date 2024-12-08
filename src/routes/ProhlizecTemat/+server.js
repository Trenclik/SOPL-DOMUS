// src/routes/ProhlizecTemat/+server.js
import { temata } from '$lib/server/db/schema.js';  // Adjust this path if needed
import { db } from '$lib/server/db';  // Database connection
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Fetch all themes from the database
        const themes = await db.select().from(temata);

        // Return themes as JSON response
        return json(themes);
    } catch (error) {
        console.error('Error fetching themes:', error);
        return json({ error: 'Error fetching themes.' }, { status: 500 });
    }
}
