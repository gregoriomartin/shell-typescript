import { createInterface } from "readline";
import { type Command, commandHandlers, resolveExecutable } from "./commands";
import exec from "child_process";

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
    else if (resolveExecutable(cmd)) {
      exec.execSync(command, { stdio: "inherit" });
    }
    else {
      console.log(`${command}: command not found`);
    }

  }
}

main();