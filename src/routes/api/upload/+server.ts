import type { RequestHandler } from '@sveltejs/kit';
import { writeFile, mkdir, readFile } from 'fs/promises';
import * as fs from 'fs/promises';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No se envió ningún archivo', { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join('static/uploads', file.name);

  // Asegúrate de que la carpeta exista
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true }); // crea la carpeta si no existe
  await writeFile(filePath, buffer);

  //fs.mkdirSync(path.dirname(filePath), { recursive: true });

  //fs.writeFileSync(filePath, buffer);

  return new Response('Archivo guardado correctamente');
};


export const GET: RequestHandler = async () => {
  const fileName = "Participacion.csv"; // El nombre del archivo CSV

  // Asegúrate de que el archivo existe en la carpeta correcta (usualmente la carpeta `static` está destinada para archivos estáticos)
  const filePath = path.join('static', 'uploads', fileName); // Asegúrate de que 'uploads' esté en la carpeta `static`

  try {
    // Lee el archivo como texto
    const fileBuffer = await fs.readFile(filePath, 'utf-8');

    // Devuelve el archivo con el tipo de contenido CSV
    return new Response(fileBuffer, {
      headers: { 'Content-Type': 'text/csv' }
    });
  } catch (err) {
    console.error(err);
    return new Response('Archivo no encontrado o error al leerlo', { status: 404 });
  }
};
