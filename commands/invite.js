exports.command = "invite <username>";
exports.describe = "Invite another user to join the live thread.";
exports.builder = {};
exports.handler = async args => {
    const thread = args.thread;
    const contributors = await thread.getContributors();

    if (contributors.map(value => value.name).includes(args.username)) {
        args.respond(`Silly you! That person already is a contributor.`);
    } else {
        try {
            await thread.inviteContributor({
                name: args.username,
                permissions: [
                    "update",
                ],
            });
            args.respond(`I've invited u/${args.username} to update this live thread.`);
        } catch (error) {
            if (error.name.startsWith("LIVEUPDATE_ALREADY_CONTRIBUTOR")) {
                args.respond(`Silly you! That person already is a contributor.`);
            } else {
                args.genericError();
            }
        }
    }
};