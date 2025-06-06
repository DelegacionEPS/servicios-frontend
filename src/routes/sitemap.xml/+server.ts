import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
    const baseUrl = url.origin;
    
    // Define the main routes of the application
    const routes = [
        "/",
        "/taquillas",
        "/osciloscopio",
        "/encuestas",
        "/perfil"
    ];
    
    // Create XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => `
    <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`).join('')}
</urlset>`;
    
    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
};
