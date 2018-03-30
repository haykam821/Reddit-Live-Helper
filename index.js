const config = require("config.json");
const snoowrap = require("snoowrap");

const reddit = new snoowrap(config.auth);

const thread = reddit.getLivethread("10otrx267owkb");
thread.stream.on("update", data => {
    console.log(data);
});