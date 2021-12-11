import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Spinner} from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Layout from '../../components/Layout';

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
          <Image src={user.image} cover roundedCircle width={150} height={150} />
        ) : (
          <Skeleton circle width={100} height={100} />
        )}

        <h1>{user.name || <Skeleton width={250} />}</h1>
        <pre>{user.email || <Skeleton width={200} />}</pre>
      </Container>
    </Layout>
  );
}

export default Profile;