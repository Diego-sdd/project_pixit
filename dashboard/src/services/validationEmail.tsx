export function validateEmail(email: string) {
  if (
    typeof email !== "string" ||
    email.length < 4 ||
    !email.includes("@") ||
    !email.includes(".")
  ) {
    return false;
  }
  return true;
}
