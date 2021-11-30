import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Image, Spinner} from 'react-bootstrap';

const Profile = () => {

	const [user, setUser] = useState(null);
	const router = useRouter();
		

	useEffect(()=> {
		if (!router.isReady) return;
		const { username } = router.query;		
		fetch(`/user/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				}
			})
			.then(res => res.json())
			.then(results => {
				console.log(results);
				setUser(results);			
			});
	}, [router.isReady]);

	return user 
		? 
		<Container>
			<Image src={user.image} roundedCircle />
			<h1>{user.name}</h1>
			<pre>{user.email}</pre>
		</Container>
		: 
		<Spinner animation="border" />
}

export default Profile;