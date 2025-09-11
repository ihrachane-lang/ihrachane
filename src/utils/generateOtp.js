import crypto from "crypto";

export default function generateRandomCode(length) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  const randomNumber = crypto.randomInt(min, max + 1);
  return randomNumber.toString().padStart(length, "0");
}
