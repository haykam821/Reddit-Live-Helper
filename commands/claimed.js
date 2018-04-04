exports.command = "claimed <username>";
exports.describe = "Check if a Reddit username has been claimed.";
exports.builder = {};
exports.handler = async args => {
    const unclaimed = await args.reddit.checkUsernameAvailability(args.username);
    args.respond(unclaimed ? "That username is available for use!" : "That username already has been claimed.");
};