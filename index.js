const config = require("./config.json");
const snoowrap = require("snoowrap");

const yargs = require("yargs");

const reddit = new snoowrap(config.auth);
const myself = reddit.getMe();

const thread = reddit.getLivethread("10otrx267owkb");

function makeBlock(msg) {
	const parts = msg.split("\n");
	return parts.map(item => {
		return "    " + item;
	}).join("\n");
}
function send(msg) {
	thread.addUpdate(msg);
}

let lastParsing = null;

thread.stream.on("update", data => {
	const msg = data.body.replace(config.prefix, "");
	if (!data.body.startsWith(config.prefix) || data.author.name === myself.name) return;

	yargs.commandDir("commands");

	// yargs.command("sum", "Gets the sum of the provided numbers.", {}, )

	yargs.help(false);
	yargs.command("help", "Commands and stuff!", {}, () => {
		const helpText = yargs.getUsageInstance().help();
		send(makeBlock(helpText));
	});

	lastParsing = JSON.stringify(yargs.parse(msg, {
		respond: send,
		makeBlock: makeBlock,
		previous: lastParsing,
		data: data,
		thread: thread,
		genericError: function() {
			send("Oops! Something went wrong. Sorry.");
		},
		reddit: reddit,
	}), null, 4);
});