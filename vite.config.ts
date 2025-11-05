import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [sveltekit()],
    preview: {
        allowedHosts: ["servicios-dele.uc3m.es", "delegacion-interna.uc3m.es", "delegacion.uc3m.es"] // change in production
    }
})
