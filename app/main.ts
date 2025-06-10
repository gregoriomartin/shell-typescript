import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readCommand(): Promise<string> {
  return new Promise((resolve) => {
    rl.question("$ ", (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  while (true) {
    const answer = await readCommand();
    console.log(`${answer}: command not found`)
  }
  rl.close();
}

main();