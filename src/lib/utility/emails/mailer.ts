import { NODEMAILER_KEY } from "~/config/environments";
import { RecoveryEmail } from "./recoveryEmail";
import { SignInTemplate } from "./signInEmail";
import { RequestError } from "../errorClass";
import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";

const fromNoreply = "Biru <noreply@biru.com>";
const _fromBiru = "Biru <biruSoft@biru.com>";

const transporter = nodemailer.createTransport(
  new Transport({
    apiKey: NODEMAILER_KEY,
  })
);

const handleMailerError = (err: Error | null) => {
  if (err) {
    console.log(err);
  }
};

const handleEmailExist = (to: string) => {
  if (!to) {
    throw new RequestError({
      status: 400,
      message: "Correo electronico requerido",
      code: "EMAIL_REQUIRED",
    });
  }
};

export const mailer = {
  signUpEmail: ({
    to,
    token,
    name,
  }: {
    to: string;
    token: string;
    name: string;
  }) => {
    handleEmailExist(to);
    const signupOptions = {
      from: fromNoreply,
      to,
      subject: "Bienvenido a Biru",
      html: SignInTemplate({ name, link: token }),
    };
    return transporter.sendMail(signupOptions, handleMailerError);
  },
  recover: ({
    to,
    name,
    description,
    code,
  }: {
    to: string;
    name: string;
    description: string;
    code: string;
  }) => {
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
