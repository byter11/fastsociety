const router = require('express').Router();
const config = require('../config');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.clientId);

async function verify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: config.clientId,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	const userid = payload['sub'];
	const domain = payload['hd'];
	console.log(payload);
	return payload && domain === 'nu.edu.pk';
}

router.route('/signin')
	.post((req, res) => {
		console.log(req.body);
		verify(req.body.id).then(()=>res.json("Logged in :)")).catch(console.error);
		
	});

module.exports = router;
