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

function parseCommand(input: string): string[] {
  const args: string[] = [];
  let current = "";
  let i = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  while (i < input.length) {
    const char = input[i];

    if (inSingleQuote) {
      if (char === "'") {
        inSingleQuote = false;
      } else {
        current += char;
      }
      i++;
    } else if (inDoubleQuote) {
      if (char === '"') {
        inDoubleQuote = false;
      } else if (char === '\\' && i + 1 < input.length) {
        const nextChar = input[i + 1];
        current += nextChar;
        i += 2;
      } else {
        current += char;
        i++;
      }
    } else {
      if (char === "'") {
        inSingleQuote = true;
        i++;
      } else if (char === '"') {
        inDoubleQuote = true;
        i++;
      } else if (char === '\\' && i + 1 < input.length) {
        const nextChar = input[i + 1];
        current += nextChar;
        i += 2;
      } else if (/\s/.test(char)) {
        if (current.length > 0 || input[i - 1] === '"' || input[i - 1] === "'") {
          args.push(current);
          current = "";
        }
        while (i < input.length && /\s/.test(input[i])) i++; // Skip whitespace
      } else {
        current += char;
        i++;
      }
    }
  }

  if (inSingleQuote || inDoubleQuote) {
    throw new Error("Unmatched quote in command");
  }

  if (current.length > 0 || input.endsWith("''") || input.endsWith('""')) {
    args.push(current);
  }

  return args;
}



async function main() {
  while (true) {
    const command = await readCommand();
    const [cmd, ...args] = parseCommand(command);

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