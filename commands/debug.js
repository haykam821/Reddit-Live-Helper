exports.command = "debug";
exports.describe = "Outputs the debug for the last parsed command.";
exports.builder = {};
exports.handler = args => {
    if (args.previous) {
        args.respond(`Here is the debug for the last parsed command:\n\n${args.makeBlock(args.previous)}`);
    } else {
        args.respond(`I do not remember any previous commands. Sorry!`);
    }
};