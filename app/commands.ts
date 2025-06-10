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
                console.log(`${args[0]}: not found`);
            }
        }
    }
} as const;

export type Command = keyof typeof commandHandlers;

function isValidCommand(cmd: string): cmd is Command {
    return cmd in commandHandlers;
}