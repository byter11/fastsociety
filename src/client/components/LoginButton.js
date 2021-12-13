import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import GoogleLogin from 'react-google-login';
import Cookie from 'js-cookie';
import Router from 'next/router';

const LoginButton = () => {
	const onSignIn = (response) => {
		var profile = response.getBasicProfile();
		const data = {
		 	token : response.getAuthResponse().id_token,
		 	name : profile.getName(),
			email: profile.getEmail(),
			image : profile.getImageUrl()
		}
		
		fetch('/oauth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(({token}) => {
			console.log(token);
			Cookie.set("token", token);
			Router.reload(window.location.pathname);
		});
	}
	
	const onError = (response) => {
		console.log(response);
	}
	
	return (
		<div className="mx-2">
			<GoogleLogin
			clientId={publicRuntimeConfig.clientId}
			buttonText="Login"
			onSuccess={onSignIn}
			onFailure={onError}
  			/>
		</div>
	);
};

export default LoginButton;