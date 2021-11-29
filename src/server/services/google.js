const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.clientId);

async function verify(req, res, next) {
	const ticket = await client.verifyIdToken({
		idToken: req.body.token,
		audience: config.clientId
	});
	const payload = ticket.getPayload();
	if(!payload || payload.hd !== 'nu.edu.pk')
		return res.status(401);
	req.body.id = payload.sub;
	next();
}

module.exports = {verify};