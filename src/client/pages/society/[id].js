import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner} from 'react-bootstrap';

const Society = () => {
	const [society, setSociety] = useState(null);
	const router = useRouter();

    useEffect(()=> {
		if (!router.isReady) return;
		const { id } = router.query;
        fetch(`/api/society/${id}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(results => {
            setSociety(results);
        })
    }, [router.isReady]);

    return society
    //? society page UI
    //:     society page loading UI
}

export default Society;