function main(inputs) {
  const raw = String(inputs[0] ?? "").trim();

  if (raw === "") {
    throw new Error("Please enter a string before running.");
  }

  const original = raw;
  const length = original.length;

  // Convert to lowercase manually (ASCII: A-Z is 65-90, add 32 for lowercase)
  let lower = "";
  for (let i = 0; i < original.length; i++) {
    const code = original.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      lower += String.fromCharCode(code + 32);
    } else {
      lower += original[i];
    }
  }

  // Keep only letters (a-z, 97-122) and digits (0-9, 48-57)
  let cleaned = "";
  for (let i = 0; i < lower.length; i++) {
    const code = lower.charCodeAt(i);
    if ((code >= 97 && code <= 122) || (code >= 48 && code <= 57)) {
      cleaned += lower[i];
    }
  }

  if (cleaned.length === 0) {
    throw new Error("The string contains no letters or digits to check.");
  }

  // Check palindrome
  let isPalindrome = true;
  for (let i = 0; i < Math.floor(cleaned.length / 2); i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      isPalindrome = false;
      break;
    }
  }

  return [
    `Entered string: ${original}`,
    `Length of string: ${length}`,
    `Cleaned (letters/digits only): ${cleaned}`,
    "",
    isPalindrome
      ? "The string is a PALINDROME :D"
      : "The string is NOT a PALINDROME >:(",
  ].join("\n");
}
