import Link from 'next/link';
import GoogleLogin from 'react-google-login';

const Index = props => {
	return <Login/>
}

const Login = props => {
	const responseGoogle = (response) => {
		var profile = response.getBasicProfile();
		const data = {
		 	id : response.getAuthResponse().id_token,
		 	name : profile.getName(),
			email: profile.getEmail(),
			image : profile.getImageUrl()
		}
		
		fetch('/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(result => {
			console.log(result)
		});
	}
	
	return (
		<div>
			<GoogleLogin
			clientId="623112692123-qme5o65dd50rsetvqp006ulrcva3t68k.apps.googleusercontent.com"
			buttonText="Login"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
  			/>
		</div>
	);
};

export default Index;