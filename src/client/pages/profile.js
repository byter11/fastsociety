// import { useFetchUser } from '../hooks/user';
import { useState, useEffect } from "react";

const Profile = props => {
	const {user, setUser} = useState(null);

	useEffect(()=> {
		fetch(`/user/${props.username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				}
			})
			.then(res => res.json())
			.then(({user}) => {
				setUser(user);			
			});
	}, [])

	return user 
	? user
	: "Loading";
}