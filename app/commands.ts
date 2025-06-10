import { existsSync } from "fs";

export const commandHandlers = {
    exit: (args: string[]) => {
        const code = parseInt(args[0]) || 0;
        process.exit(code);
    },
    echo: (args: string[]) => {
        if (args.length > 0) {
            console.log(args.join(" "));
        } else {
            console.log("No argument provided for echo");
        }
    },
    type: (args: string[]) => {
        if (args.length > 0) {
            if (isValidCommand(args[0])) {
                console.log(`${args[0]} is a shell builtin`);
            } else {
                const resolved = resolveExecutable(args[0]);
                if (resolved) {
                    console.log(`${args[0]} is ${resolved}`);
                } else {
                    console.log(`${args[0]}: not found`);
                }
            }
        }
    },
    pwd: () => {
        console.log(process.cwd());
    }
} as const;

export type Command = keyof typeof commandHandlers;

function isValidCommand(cmd: string): cmd is Command {
    return cmd in commandHandlers;
}

export function resolveExecutable(cmd: string): string | null {
    const paths = process.env["PATH"]?.split(":") || [];
    for (const path of paths) {
        const fullPath = `${path}/${cmd}`;
        if (existsSync(fullPath)) return fullPath;
    }
    return null;
}