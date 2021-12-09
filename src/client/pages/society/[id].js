import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Modal, Card} from 'react-bootstrap';
import EventsView from '../../components/Events/EventsView';
import Layout from '../../components/Layout';
import Skeleton from 'react-loading-skeleton';

const Society = () => {
    const [membersModal, setMembersModal] = useState({show:false, members: []});
	const [society, setSociety] = useState({});
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
        });

        fetch(`/api/society/${id}/user`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(results => setMembersModal({show: false, members: results}));
    }, [router.isReady]);

    return <>
    <Layout>
        <Container className='text-center'>
                    {society.image ? <Image src={society.image} roundedCircle width={100} height={100}/>
                    : <Skeleton circle width={100} height={100}/>}
                    
                    <h1>{society.title || <Skeleton width={250}/>}</h1>
                    {society.email && <pre>{society.email}</pre>}
                    <Row className="justify-content-">
                        {/* <Col><Button variant='light'>Edit</Button></Col> */}
                        <Col><Button variant='light' onClick={()=>setMembersModal({...membersModal, show:true})}>Members</Button></Col>
                    </Row>
        </Container>
        <hr/>
        <h2 className='text-center text-muted'>Events</h2>
        <EventsView societies={[1]}/>
    </Layout>

    <Modal show={membersModal.show} onHide={()=>setMembersModal({...membersModal, show:false})}>
    <Modal.Header className="p-2" style={{border: 'none'}} closeButton>Members</Modal.Header>
    <Modal.Body>
        <Container>
            <Card>
                <Row className="justify-content-start"><Col>
                  Add
                </Col></Row>
            </Card>
            <Card>
                {
                membersModal.members.map((member, i) =>
                    <Row key={i}>
                        <Col>member.name</Col>
                        {/* <Col>member.societies[society.id].role</Col> */}
                    </Row>
                )
                }
            </Card>
        </Container>
    </Modal.Body>
    </Modal>
    </>
}

export default Society;