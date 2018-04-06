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
		describe: "The timespan that the top post should be found in.",
	},
	subreddit: {
		default: "all",
		type: "string",
		describe: "The subreddit to find the top post in.",
	},
};
exports.handler = args => {
	const sub = args.reddit.getSubreddit(args.subreddit);
	sub.fetch().catch(() => {
		args.respond("Couldn't get that subreddit! Does it exist?");
	}).then(async () => {
		const top = await sub.getTop({
			time: args.timespan,
		});
		args.respond(top[0].url);
	});
};