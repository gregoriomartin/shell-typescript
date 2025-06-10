import { createInterface } from "readline";
import { Command, commandHandlers } from "./commands";

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

    if (cmd in commandHandlers) {
      commandHandlers[cmd as Command](args);
    }
    else {
      console.log(`${command}: command not found`);
    }

  }
}

main();