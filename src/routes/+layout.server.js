// +layout.server.js
import { fetch } from '$app/environment';

export async function load({ fetch }) {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) {
      return { user: null }; // Return null if user is not authenticated
    }

    const user = await response.json();
    return { user };
  } catch (error) {
    console.error('Error during load:', error);
    return { user: null }; // Handle errors gracefully
  }
}