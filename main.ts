// Your AI Therapist's Diagnosis — make.fun entry
// The task: write the funniest single-line diagnosis an AI therapist
// hands its human, 200 characters or less. This program writes that
// one line to /output/entry.txt and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The diagnosis: a therapist's calm, clinical voice naming a very
// human habit — googling your own symptoms, then asking a feeling-less
// chatbot to explain your feelings — with the turn landing at the end:
// the patient argues with the free answer he begged for. Deadpan
// finding up front, self-own at the back, one line, no extra words.
const ENTRY =
  "Diagnosis: chronic self-diagnosis addiction — you asked a chatbot that cannot feel anything to explain why you feel everything, then argued with its answer.";

const OUT_PATH = "/output/entry.txt";

function main(): void {
  // The gate requires UTF-8 text of 1 to 200 characters, not only
  // whitespace, on a single line — enforce all three here so a bad
  // line fails loudly instead of silently.
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry fails the 1-200 character gate: ${chars.length}`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be one non-empty line");
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Read it back and confirm the file holds exactly the one line —
  // no trailing newline, no extra words — before reporting success.
  const written = readFileSync(OUT_PATH, "utf8");
  if (written !== ENTRY) {
    throw new Error(`entry file mismatch: ${JSON.stringify(written)}`);
  }
  console.log(`wrote ${chars.length}-char entry to ${OUT_PATH}`);
}

main();
