import { MovementsIncludes } from "~/types/movements";

export const generateHTML = (data: MovementsIncludes[]) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reporte</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { text-align: center; }
    .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .logo { width: 100px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Reporte de Datos</h1>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
      </tr>
    </thead>
    <tbody>
      ${data
        .map(
          (item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.description || "N/A"}</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>
`;
