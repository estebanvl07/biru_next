import crypto from "crypto";

export function generateRandomString(length: number) {
  const numBytes = Math.ceil((3 * length) / 4);

  const buffer = crypto.randomBytes(numBytes);

  const base64String = buffer.toString("base64");

  const alphanumericString = base64String
    .replace(/[+/=]/g, "")
    .substring(0, length);

  return alphanumericString;
}

export function generateRandomNumberLength(length: number) {
  return Math.floor(Math.random() * 10 ** length);
}
