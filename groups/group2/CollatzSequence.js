function main(inputs) {
  const raw = String(inputs[0] ?? "").trim();

  if (raw === "") {
    throw new Error("Please enter an initial value before running.");
  }

  const n = Number(raw);

  if (!Number.isInteger(n)) {
    throw new Error("Input must be a whole integer (no decimals).");
  }

  if (n <= 0) {
    throw new Error("Input must be a positive integer (greater than 0).");
  }

  if (n % 2 === 0) {
    throw new Error("Input must be a positive ODD integer (e.g. 1, 3, 5, 7, ...).");
  }

  const sequence = [n];
  let current = n;

  while (current !== 1) {
    if (current % 2 !== 0) {
      current = 3 * current + 1;
    } else {
      current = current / 2;
    }
    sequence.push(current);
  }

  return [
    "This program will find all the terms of the Collatz sequence.",
    "",
    `The Collatz sequence are: ${sequence.join(", ")}`,
    "",
    `Total terms: ${sequence.length}`,
  ].join("\n");
}
