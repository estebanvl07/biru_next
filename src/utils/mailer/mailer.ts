import { RecoveryEmail } from "./recoveryEmail";
import { SignInTemplate } from "./signInEmail";
import nodemailer, { type Transport } from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";
import { env } from "~/env";

const fromNoreply = "Biru <noreply@biru.com>";

const getBrevoTransport = (): Transport<string> =>
  new BrevoTransport({ apiKey: env.NODEMAILER_KEY }) as never;

const transporter = nodemailer.createTransport(getBrevoTransport());

const handleMailerError = (err: Error | null) => {
  if (err) {
    console.log("[MAIL_ERROR]", err);
  }
};

export const mailer = {
  userConfirmationEmail({
    to,
    token,
    name,
  }: {
    to: string;
    token: string;
    name: string;
  }) {
    const signupOptions = {
      from: fromNoreply,
      to,
      subject: "Bienvenido a Biru",
      html: SignInTemplate({ name, link: token }),
    };

    return transporter.sendMail(signupOptions, handleMailerError);
  },
  recover({
    to,
    name,
    description,
    code,
  }: {
    to: string;
    name: string;
    description: string;
    code: string;
  }) {
    const configMailer = {
      from: fromNoreply,
      to,
      subject: "Recuperación de contraseña",
      html: RecoveryEmail({
        name,
        description,
        code,
      }),
    };
    return transporter.sendMail(configMailer, handleMailerError);
  },
};
