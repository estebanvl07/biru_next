import { env } from "~/env";
import { FixedMovements } from "@prisma/client";

export const reminderMovement = ({
  movements,
  name,
}: {
  movements: FixedMovements[];
  name: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Browser</title>  
  <style>
  	body {
  		margin: 20px;
	  }
    .button {
    	background-color: #000;
    	color: #fff;
    	text-decoration: none;
    	padding: 10px 40px;
    	border-radius: 6px
    }
  </style>
</head

<body>
  	
  <main style="max-width: 550px; margin: auto;">
  
    
  <h1 style="width: 100%; padding: 10px 6px; text-align: center">
    Biru.
  </h1>

  <section style="background-color:#f5f5f5;padding:40px;border-radius:4px;display: grid;margin-bottom:20px;flex-direction: column;">
    <h2 style="text-align: center; margin: 0">
      Hola ${name}, queremos recordarte tus movimiento pendientes
  	</h2>
    <p style="text-align: center; margin-top: 5px;margin-bottom: 10px">
      Pulsa el siguiente botón para ver todos tus movimientos
    </p>
    <a href="#" class="button" style="margin: auto; color: white;">Ver</a>
  </section>
  
  
  <h2 style="margin: 10px 0px;">Somos del equipo Biru.</h2>
  <p style="margin: 0;">Queremos que tu experiencia con nosotros sea la mejor, por eso te recordamos los movimientos que tienes pendientes por realizar el dia de hoy.</p>
  
  <div style="margin: 20px 0;display:flex;flex-wrap:wrap;gap: 6px;">
    ${movements.map((mov) => {
      return `<article style="max-width:200px;">
                <h3 style="margin: 0">${mov.name}</h3>
                <p style="margin-top: 0">$ ${mov.amount.toLocaleString()}</p>
                <a href="${env.FRONTEND_URL}/account/${mov.accountId}}/movements/${mov.id}/save-quick" class="button" style="margin-top: 20px; text-align: center; color: white;" >Realizar</a>
              </article>`;
    })}
  </div>
  
  	<footer style="background-color: #414141; padding: 20px; color: #fff">
    	Gracias por ver este correo  
  	</footer>
  
    
  </main>
  
  <script src="script.js"></script>
</body>

</html>
  `;
};
