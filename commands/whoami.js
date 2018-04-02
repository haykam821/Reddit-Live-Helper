exports.command = "whoami";
exports.describe = "Find out who you are.";
exports.builder = {};
exports.handler = args => {
    args.respond(`You are u/${args.data.author.name}.`);
};