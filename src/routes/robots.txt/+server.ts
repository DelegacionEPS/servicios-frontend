import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${url.origin}/sitemap.xml

# Disallow admin paths
Disallow: /admin
Disallow: /gestion_taquillas
Disallow: /gestion_osciloscopios
Disallow: /entrada-supersecretisima
`;

    return new Response(robotsTxt.trim(), {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
};
