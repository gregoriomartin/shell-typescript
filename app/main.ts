import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readCommand(): Promise<string> {
  return new Promise((resolve) => {
    rl.question("$ ", resolve);
  });
}

async function main() {
  while (true) {
    const command = await readCommand();
    const [cmd, arg] = command.trim().split(" ");

    switch (cmd) {
      case 'exit':
        const code = parseInt(arg);
        rl.close();
        process.exit(code);
        return;
      default:
        console.log(`${command}: command not found`);
    }
  }
}

main();