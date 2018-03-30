const config = require("./config.json");
const snoowrap = require("snoowrap");

const yargs = require("yargs");

const reddit = new snoowrap(config.auth);

const thread = reddit.getLivethread("10otrx267owkb");
thread.stream.on("update", data => {
    const msg = data.body.replace(">", "");
    if (!data.body.startsWith(">")) return;

    yargs.command("test", "A simple test command.", {
        "addDelay": {
            description: "An addition delay before returning the message.",
            default: 0,
            type: "number",
        }
    }, args => {
        setTimeout(function() {
            thread.addUpdate("The test is complete!");
        }, args.addDelay);
    });
    yargs.parse(msg);
});