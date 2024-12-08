import adapter from '@sveltejs/adapter-vercel';

const config = {
    kit: {
        adapter: adapter(),
        // other config options
    }
};

export default config;
