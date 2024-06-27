import { RecoveryEmail } from "./recoveryEmail";
import { SignInTemplate } from "./signInEmail";
import nodemailer, { type Transport } from "nodemailer";
import BrevoTransport from "nodemailer-brevo-transport";
import { env } from "~/env";

const FROM_NO_REPLAY = "Biru <noreply@biru.com>";

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
    const link = `${env.FRONTEND_URL}/activation/${token}`;
    const signUpOptions = {
      from: FROM_NO_REPLAY,
      to,
      subject: "Bienvenido a Biru",
      html: SignInTemplate({ name, link }),
    };

    return transporter.sendMail(signUpOptions, handleMailerError);
  },
  recoverUser({ to, name, code }: { to: string; name: string; code: string }) {
    // TODO: const link = `${env.FRONTEND_URL}/recover/${code}`;
    const recoverOptions = {
      from: FROM_NO_REPLAY,
      to,
      subject: "Recuperación de usuario Biru",
      html: RecoveryEmail({
        name,
        code,
      }),
    };
    return transporter.sendMail(recoverOptions, handleMailerError);
  },
};
