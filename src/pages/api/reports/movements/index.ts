import { PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";
import { generateHTML } from "../../templates/table";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const prisma = new PrismaClient();

    // 🔹 Obtener datos desde la DB con Prisma
    const movements = await prisma.fixedMovements.findMany({
      where: {
        bookId: "f15a65ff-0991-4292-ae51-95db97c9f0db",
      },
    }); // Cambia "reporte" por tu modelo de datos

    // 🔹 Generar HTML dinámico
    const htmlContent = generateHTML(movements);
    fs.writeFileSync("reporte.html", htmlContent);

    // 🔹 Iniciar Puppeteer (sin interfaz gráfica para producción)
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // 🔹 Generar el PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "100px", bottom: "100px", left: "100px", right: "100px" },
    });

    // 🔹 Cerrar el navegador
    await browser.close();

    // 🔹 Enviar el PDF al cliente
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="reporte_de_movimientos.pdf"',
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).json({ message: "Error generando el reporte" });
  }
}
