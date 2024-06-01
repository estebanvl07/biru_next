export const RecoveryEmail = ({
  name,
  code,
}: {
  name: string;
  code: string;
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Recover template email</title>
  
      <style>
        .sec_main {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            margin: auto;
            max-width: 34rem;
            padding: 8px;
            color: #000;
            font-size: 16px;
        }
        .container .logo {
            margin-bottom: 6px;
        }
        .container .id_code {
            
            padding: 6px 8px;
            border-radius: 4px;
            margin-top: 8px;
            background-color: #e0e7ff;
            border: 1px solid #4f46e5;
            font-weight: 600;
            font-size: 18px;
            display: inline-block;
        }
      </style>
    </head>
    <body>
        <main class="sec_main">
            <section class="container">
                    <img
                        src="https://biru-images.s3.us-east-2.amazonaws.com/logo.png"
                        alt="Logo de biru"
                        class="logo"
                        title="Logo de biru"
                    />
                    <hr />
                    <h3>¡Hola, ${name}!</h3>
                    <p>Hemos recibido una solicitud de recuperación de contraseña, tu código de recuperación es: </p>
                    <p class="id_code">
                        ${code}
                    </p>
            </section>
        </main>
    </body>
  </html>
    `;
};
