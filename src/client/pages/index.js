import {useState, setState} from 'react';
import Cookie from 'js-cookie';
import LoginButton from '../components/LoginButton';

const Index = props => {
	const [token, setToken] = useState(!!Cookie.get('token'));
	if(token) {
		
	}
	return <LoginButton/>
}	



export default Index;