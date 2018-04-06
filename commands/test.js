exports.command = "test";
exports.describe = "A simple test command.";
exports.builder = {
	"delay": {
		description: "An addition delay before returning the message.",
		default: 0,
		type: "number",
	},
};
exports.handler = args => {
	setTimeout(() => {
		args.respond("The test is complete!");
	}, args.delay);
};