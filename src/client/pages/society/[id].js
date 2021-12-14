import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Modal, Card } from 'react-bootstrap';
import EventsView from '../../components/Events/EventsView';
import AddMemberBox from '../../components/Society/AddMemberBox';
import Layout from '../../components/Layout';
import Skeleton from 'react-loading-skeleton';

const Society = () => {
  const [membersModal, setMembersModal] = useState({ show: false, members: [] });
  const [society, setSociety] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    fetch(`/api/society/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        console.log(results)
        setSociety(results);
      });

    fetch(`/api/society/${id}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        const roles = [...new Set(results.map(r => r.roleName))];
        const members = roles.map(r => [
          r,
          results.filter(m => m.roleName == r)
        ]
        );
        console.log(members);
        setMembersModal({ show: false, members: members })
      });
  }, [router.isReady]);


  return (
    <>
      <Layout>
        <Container className="text-center mt-3">
          {society.image ? (
            <Image
              src={society.image}
              roundedCircle
              width={100}
              height={100}
            />
          ) : (
            <Skeleton circle width={100} height={100} />
          )}

          <h1>{society.title || <Skeleton width={250} />}</h1>
          {society.email && <pre>{society.email}</pre>}
          <Row className="justify-content-">
            {/* <Col><Button variant='light'>Edit</Button></Col> */}
            <Col>
              <Button
                variant="light"
                onClick={() =>
                  setMembersModal({ ...membersModal, show: true })
                }
              >
                Members
              </Button>
            </Col>
          </Row>
        </Container>
        <hr />
        <h2 className="text-center text-muted">Events</h2>
        {society.id && <EventsView societies={[society.id]} />}
      </Layout>

      <Modal
        show={membersModal.show}
        onHide={() => setMembersModal({ ...membersModal, show: false })}
      >
        <Modal.Header className="p-2" style={{ border: "none" }} closeButton>
          Members
        </Modal.Header>
        <Modal.Body>
          <Container>
            {/* <Card> */}
            <Row className="justify-content-start">
              <AddMemberBox society={society} />
            </Row>
            {/* </Card> */}
            {/* <Card> */}
            {membersModal.members.map(([role, roleMembers], i) => (
              <details className="p-2" key={i} open>
                <summary className="heading text-muted">{role.toUpperCase()}</summary>
                {/* <Row>
                    <Col className="heading text-muted">{role.toUpperCase()}</Col>
                  </Row> */}
                {roleMembers.map((m, j) =>
                  <Row key={j}>
                    <div className="d-flex m-2">
                      <Image className="mx-2" width={25} height={25} src={m.image} roundedCircle />
                      <b>{m.name}</b>
                    </div>
                  </Row>
                )}
              </details>
            ))}
            {/* </Card> */}
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Society;