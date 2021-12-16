import React from 'react';
import { Image, Row, Col, Container, Dropdown } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import {useState} from 'react';
import Link from "next/link";
import {toast} from 'react-toastify';

const Comment = ({ data, eventId}) => {
  
  const {user, token} = useFetchUser();
  const [isDeleted, setIsDeleted] = useState(false);
  const { commentId, textContent, createdOn, user: author, name, image, email } = data;
  const date = createdOn.substring(0, 10);
  const username = email.substring(0, 7);
  
  const handleDelete = () => {
    fetch(`/api/event/${eventId}/comment/${commentId}}`, {
      method: 'DELETE',
      headers: { token: token }
  })
      .then(res => {
          if (res.status == 200){
              toast("Success! comment deleted.")
              setIsDeleted(true)
          }
          else
              toast("Failed to delete the comment.")
      })
  }
  const canDelete = user.email == email;
  if(isDeleted)
    return <></>
  return (
    <Container fluid className="my-2 mx-2">
      <Row>
        <Col style={{ cursor: "pointer", display:'flex', justifyContent:'flex-end' }} className="col-auto">
        <Link href={`/profile/${username}`}>
          <Image
            src={image}
            roundedCircle
            height={40}
            width={40}
          />
        </Link>
        </Col>
        <Col >
          <Row>
            <div className="d-flex flex-wrap align-items-center">
            <span>
              <b>{name}</b>
            </span>
            <span className="text-sm text-muted px-1">{date}</span>
            {canDelete && <Dropdown>
                <Dropdown.Toggle variant=""/>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>}
            </div>
          </Row>
          <Row><span>{textContent}</span></Row>
        </Col>
        {/* <Link href={`/event/${id}`}>
            <b>Event</b>
          </Link> */}
      </Row>
    </Container>
  );
};

export default Comment;
