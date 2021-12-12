import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Layout from '../../components/Layout';
import SocietyView from '../../components/SocietyView';

const Profile = () => {
	const [user, setUser] = useState({});
	const router = useRouter();
		
	useEffect(()=> {
		if (!router.isReady) return;
		const { username } = router.query;	
		fetch(`/api/user/${username}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				}
			})
			.then(res => res.json())
			.then(results => {
				setUser(results);			
			});
	}, [router.isReady]);

	return (
    <Layout>
      <Container className="text-center mt-4">
        {user.image ? (
          <Image
            src={user.image} 
            roundedCircle
            width={150}
            height={150}
			style={{ objectFit: 'cover' }}
          />
        ) : (
          <Skeleton circle width={100} height={100} />
        )}

        <h2>{user.name || <Skeleton width={250} />}</h2>
        <pre>{user.email || <Skeleton width={200} />}</pre>
		<hr/>
		<h1 className="heading">SOCIETIES</h1>
		<SocietyView societies={user.societies}/>
      </Container>
    </Layout>
  );
}

export default Profile;