exports.command = "top <subreddit>";
exports.describe = "Get the top post from the specified subreddit.";
exports.builder = {
    timespan: {
        default: "all",
        type: "string",
        alias: [
            "time",
            "period",
            "span",
        ],
        choices: [
            "hour",
            "day",
            "week",
            "month",
            "year",
            "all",
        ],
        describe: "The timespan that the top post should be found in."
    }
};
exports.handler = async args => {
    const sub = args.reddit.getSubreddit(args.subreddit);
    await sub.fetch().catch(() => {
        return args.respond("Couldn't get that subreddit! Does it exist?");
    });
    const top = await sub.getTop({
        time: args.timespan,
    });
    args.respond(top[0].url);
};