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
    const [cmd, ...args] = command.trim().split(/\s+/);

    switch (cmd) {
      case 'exit':
        const code = parseInt(args[0]);
        rl.close();
        process.exit(code);
        return;

      case 'echo':
        if (args) {
          console.log(args.join(" "));
        } else {
          console.log("No argument provided for echo");
        }
        break;

      default:
        console.log(`${command}: command not found`);
        break;
    }
  }
}

main();