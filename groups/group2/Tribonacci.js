function main(inputs) {
  const raw = String(inputs[0] ?? "").trim();

  if (raw === "") {
    throw new Error("Please enter the number of terms before running.");
  }

  const n = Number(raw);

  if (!Number.isInteger(n)) {
    throw new Error("Input must be a whole integer (no decimals).");
  }

  if (n <= 3) {
    throw new Error("Number of terms must be greater than 3 (enter 4 or more).");
  }

  if (n > 60) {
    throw new Error("Please enter a value of 60 or less to avoid overflow.");
  }

  // Recursive with memoization — Tribonacci: T(0)=0, T(1)=0, T(2)=1, T(n)=T(n-1)+T(n-2)+T(n-3)
  const memo = {};
  function trib(k) {
    if (k === 0) return 0;
    if (k === 1) return 0;
    if (k === 2) return 1;
    if (memo[k] !== undefined) return memo[k];
    memo[k] = trib(k - 1) + trib(k - 2) + trib(k - 3);
    return memo[k];
  }

  const terms = [];
  for (let i = 0; i < n; i++) {
    terms.push(trib(i));
  }

  return [
    "This program will find all the terms of the Tribonacci numbers.",
    "",
    `Input the number of terms: ${n}`,
    "",
    `The Tribonacci numbers are: ${terms.join(", ")}`,
  ].join("\n");
}
