exports.command = "whois <username>";
exports.describe = "Get information on a Reddit user.";
exports.builder = {};
exports.handler = async args => {
	const user = await args.reddit.getUser(args.username).fetch();
	args.respond(`**u/${user.name}** ${user.is_mod ? "🛡" : ""}${user.is_gold ? "⭐" : ""}${user.has_verified_email ? "📧" : ""} has ${user.comment_karma + user.link_karma} total karma:
	
	* ${user.comment_karma} comment karma
	* ${user.link_karma} post karma
	
	This account was created on ${new Date(user.created_utc * 1000)}.
	`);
};