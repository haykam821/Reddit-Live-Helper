const config = require("./config.json");
const snoowrap = require("snoowrap");

const yargs = require("yargs");

const reddit = new snoowrap(config.auth);
const myself = reddit.getMe();

const mathjs = require("mathjs");

const thread = reddit.getLivethread("10otrx267owkb");
function send(msg) {
    thread.addUpdate(msg);
}

function makeBlock(msg) {
    const parts = msg.split("\n");
    return parts.map(item => {
        return "    " + item;
    }).join("\n");
}

let lastParsing = null;

thread.stream.on("update", data => {
    const msg = data.body.replace(config.prefix, "");
    if (!data.body.startsWith(config.prefix) || data.author.name === myself.name) return;

    yargs.command("test", "A simple test command.", {
        "delay": {
            description: "An addition delay before returning the message.",
            default: 0,
            type: "number",
        }
    }, args => {
        setTimeout(function() {
            send("The test is complete!");
        }, args.delay);
    });
    yargs.command("whoami", "Find out who you are.", {}, args => {
        send(`You are u/${data.author.name}.`);
    });
    yargs.command("debug", "Outputs the debug for the last parsed command.", {}, args => {
        if (lastParsing) {
            send(`Here is the debug for the last parsed command:\n\n${makeBlock(lastParsing)}`);
        } else {
            send(`I do not remember any previous commands. Sorry!`);
        }
    });
    //yargs.command("sum", "Gets the sum of the provided numbers.", {}, )

    yargs.help(false);
    yargs.command("help", "Commands and stuff!", {}, () => {
        const helpText = yargs.getUsageInstance().help();
        send(makeBlock(helpText));
    })

    lastParsing = JSON.stringify(yargs.parse(msg), null, 4);
});