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
                const paths = process.env["PATH"]?.split(":") || [];
                for (const path of paths) {
                    const fullPath = `${path}/${args[0]}`;
                    if (existsSync(fullPath)) {
                        console.log(`${args[0]} is ${fullPath}`);
                        return;
                    }
                };
            }
        }
    }
} as const;

export type Command = keyof typeof commandHandlers;

function isValidCommand(cmd: string): cmd is Command {
    return cmd in commandHandlers;
}