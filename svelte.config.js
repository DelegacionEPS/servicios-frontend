import adapter from "@sveltejs/adapter-node"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-node for Docker deployment
        adapter: adapter({
            out: "build"
        }),
        // Disable CSRF protection to fix cross-site POST form submissions
        csrf: {
            checkOrigin: false
        }
    },
    preprocess: vitePreprocess()
}

export default config
