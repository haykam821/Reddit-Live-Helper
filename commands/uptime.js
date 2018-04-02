const moment = require("moment");

exports.command = "uptime";
exports.describe = "Get the time since the bot's last restart.";
exports.builder = {};
exports.handler = args => {
    args.respond(`I've been up for ${moment.duration(process.uptime(), "seconds").humanize()}`)
};