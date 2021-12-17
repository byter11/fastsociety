import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Modal } from 'react-bootstrap';
import EventsView from '../../components/Events/EventsView';
import AddMemberBox from '../../components/Society/AddMemberBox';
import AddRoleBox from '../../components/Society/AddRolesBox';
import Layout from '../../components/Layout';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetchUser } from '../../hooks/user';
import { toast } from "react-toastify";

const Society = () => {
  const {user, token} = useFetchUser();
  const [membersModal, setMembersModal] = useState({ show: false, members: [] });
  const [rolesModal, setRolesModal] = useState({ show: false, roles: [] });
  const [society, setSociety] = useState({});
  const router = useRouter();

  const fetchSociety = (id) => {
    fetch(`/api/society/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        setSociety(results);
      });
  }

  const fetchMembers = (id) => {
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
        setMembersModal({ show: false, members: members })
      });
  }

  const fetchRoles = (id) => {
    fetch(`/api/society/${id}/role`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(results => {
        setRolesModal({show:false, roles: roles});
      });
  }


  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    fetchSociety(id);
    fetchMembers(id);
    // fetchRoles(id);
  }, [router.isReady]);

  const removeMember = (email) => {
    if(!confirm("Are you sure?")) return;
    fetch(`/api/society/${society.id}/user`, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json", token: token},
      body: JSON.stringify({
        email, Society_id: society.id 
      })
    })
    .then(res => {
      console.log(res);
      if(res.status == 200)
        toast(`Removed user ${email}. Please refresh the page`);
      else
        toast(`${email} not removed.`);
    })    
  }

  const canManageMembers = (() => {
    try{
      return !!user.societies.filter(s => s.id == society.id)[0].role.manageMembers
    }
    catch{
      return false;
    }
  })()

  const canManageRoles = (() => {
    try{
      return !!user.societies.filter(s => s.id == society.id)[0].role.manageRoles
    }
    catch{
      return false;
    }
  })()

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
          <div className="d-flex justify-content-center">
              <Button
                className="mx-2"
                variant="light"
                onClick={() =>
                  setMembersModal({ ...membersModal, show: true })
                }
              >
                Members
              </Button>
                <Button
                  className="mx-2"
                  variant="light"
                  onClick={() => setRolesModal({...rolesModal, show: true})}
                  >
                  Roles
                </Button>
            </div>
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
            {canManageMembers &&
            <Row className="justify-content-start">
              <AddMemberBox society={society} />
            </Row>
            }
            
            {membersModal.members.map(([role, roleMembers], i) => (
              <details className="p-2" key={i} open>
                <summary className="heading text-muted">{role.toUpperCase()}</summary>
            
                {roleMembers.map((m, j) =>
                  <Row key={j}>
                    <div className="d-flex align-items-center m-2">
                      <Image className="mx-2" width={25} height={25} src={m.image} roundedCircle />
                      <span><b>{m.name}</b> {m.email == society.headEmail && '(owner)'}</span>
                      {canManageMembers && <FontAwesomeIcon
                        className="mx-2 link"
                        icon="user-slash"
                        color="red"
                        onClick={()=>removeMember(m.email)}
                        />}
                    </div>
                  </Row>
                )}
              </details>
            ))}
            {/* </Card> */}
          </Container>
        </Modal.Body>
      </Modal>
        
      <Modal
        show={rolesModal.show}
        onHide={() => setRolesModal({ ...rolesModal, show: false })}
      >
        <Modal.Header className="p-2" style={{ border: "none" }} closeButton>
          Roles
        </Modal.Header>
        <Modal.Body>
          <Container>
            {
            <Row className="justify-content-start">
              <AddRoleBox society={society} />
            </Row>
            }
            
            {rolesModal.roles.map((role, i) => (
              <details className="p-2" key={i} open>
                <summary className="heading text-muted">{role.toUpperCase()}</summary>
            
                
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