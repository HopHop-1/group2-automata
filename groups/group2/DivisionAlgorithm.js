function main(inputs) {
  const rawA = String(inputs[0] ?? "").trim();
  const rawB = String(inputs[1] ?? "").trim();

  if (rawA === "" || rawB === "") {
    throw new Error("Please fill in both integer fields before running.");
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("Both inputs must be whole integers (no decimals).");
  }

  if (a <= 0 || b <= 0) {
    throw new Error("Both integers must be positive (greater than 0).");
  }

  const m = Math.max(a, b);
  const n = Math.min(a, b);

  const q = Math.floor(m / n);
  const r = m % n;

  const fmt = (num) => num.toLocaleString("en-US");

  return [
    "SOLUTION:",
    `${fmt(m)} = ${fmt(n)}(${fmt(q)}) + ${fmt(r)}`,
    "",
    `The dividend is ${fmt(m)}`,
    `The divisor is ${fmt(n)}`,
    `The quotient is ${fmt(q)} and the remainder is ${fmt(r)}`,
  ].join("\n");
}
