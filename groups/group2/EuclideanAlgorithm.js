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

  const fmt = (num) => num.toLocaleString("en-US");

  const m = Math.max(a, b);
  const n = Math.min(a, b);

  let dividend = m;
  let divisor = n;
  let gcd = divisor;
  const steps = [];

  while (true) {
    const q = Math.floor(dividend / divisor);
    const r = dividend % divisor;
    if (r === 0) {
      steps.push(`${fmt(dividend)} = ${fmt(divisor)}(${fmt(q)})`);
      gcd = divisor;
      break;
    } else {
      steps.push(`${fmt(dividend)} = ${fmt(divisor)}(${fmt(q)}) + ${fmt(r)}`);
    }
    dividend = divisor;
    divisor = r;
  }

  const lcm = (m * n) / gcd;

  return [
    "SOLUTION:",
    ...steps,
    "",
    `The integers are ${fmt(m)} and ${fmt(n)}`,
    `The greatest common divisor of ${fmt(m)} and ${fmt(n)} is ${fmt(gcd)}`,
    `The least common multiple of ${fmt(m)} and ${fmt(n)} is ${fmt(lcm)}.`,
  ].join("\n");
}
