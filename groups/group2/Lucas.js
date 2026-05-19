function main(inputs) {
  const raw = String(inputs[0] ?? "").trim();

  if (raw === "") {
    throw new Error("Please enter the number of terms before running.");
  }

  const n = Number(raw);

  if (!Number.isInteger(n)) {
    throw new Error("Input must be a whole integer (no decimals).");
  }

  if (n <= 2) {
    throw new Error("Number of terms must be greater than 2 (enter 3 or more).");
  }

  if (n > 80) {
    throw new Error("Please enter a value of 80 or less to avoid overflow.");
  }

  // Recursive with memoization — Lucas: L(0)=2, L(1)=1, L(n)=L(n-1)+L(n-2)
  const memo = {};
  function lucas(k) {
    if (k === 0) return 2;
    if (k === 1) return 1;
    if (memo[k] !== undefined) return memo[k];
    memo[k] = lucas(k - 1) + lucas(k - 2);
    return memo[k];
  }

  const terms = [];
  for (let i = 0; i < n; i++) {
    terms.push(lucas(i));
  }

  return [
    "This program will find all the terms of the Lucas numbers.",
    "",
    `Input the number of terms: ${n}`,
    "",
    `The Lucas numbers are: ${terms.join(", ")}`,
  ].join("\n");
}
