import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPlayer from 'react-player'
import {
  Card,
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHourglassStart,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import CommentsView from "./CommentsView";
import { useFetchUser } from "../../hooks/user";
import { toast } from "react-toastify";

const Event = ({ data, showRatingModal = () => {}, controls = true }) => {
  const {user, token} = useFetchUser();
  const {
    id,
    textContent,
    createdOn,
    startTime,
    endTime,
    image,
    rating,
    userRating,
    User_id,
    society,
    deleteButton
  } = data;

  const handleComment = () => {};

  const handleRate = (id, userRating) => {
    showRatingModal(id, userRating);
  };

  const handleDelete = () => {
    fetch('/api/event',{
      method: 'DELETE',
      headers: {"Content-Type": "application/json", token: token},
      body: JSON.stringify({eventId: id, societyId: society.id})
    })
    .then(res => {
      if(res.status == 200)
        toast("Success! event deleted.")
      else
        toast("Sorry, failed to delete the event.")
    })
  }
  
  const canDelete = (() => {
    try{
      return !!user.societies.filter(s => s.id == society.id)[0].role.deleteEvent
    }
    catch{
      return false;
    }
  })()

  return (
    <>
      <Card className="m-2 shadow">
        <Container fluid>
          <div className="d-flex flex-wrap">
            {startTime && (
              <span className="m-auto">
                <FontAwesomeIcon icon={faHourglassStart} className="mx-2" />
                {new Date(startTime).toLocaleString()}
              </span>
            )}
            {endTime && (
              <span className="m-auto">
                <FontAwesomeIcon icon={faHourglassEnd} className="mx-2" />
                {new Date(endTime).toLocaleString()}
              </span>
            )}
          </div>
          <Row className="justify-content-between">
            <Col style={{ cursor: "pointer" }} xs={8}>
              <Link href={`/society/${society.id}`}>
                <span>
                  <Image
                    className="m-2"
                    src={
                      society.image ||
                      "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    }
                    roundedCircle
                    height={40}
                    width={40}
                  />
                  <b>{society.title || "[deleted]"}</b>
                </span>
              </Link>
            </Col>
            <Col className="text-end align-self-center mx-2">
              <Dropdown>
                <Dropdown.Toggle variant=""/>
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + `/event/${id}`);
                      toast("Copied link to clipboard");
                    }}>
                    Copy link
                  </Dropdown.Item>
                  {canDelete && <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: userRating ? "yellow" : "grey" }}
              ></FontAwesomeIcon>
              <span> {rating || 0}</span>
            </Col>
          </Row>
          <Link href={`/event/${id}`}>
            <span style={{ cursor: "pointer" }}>
              <Row className="px-2">
                <p style={{whiteSpace: 'pre-wrap'}}>{textContent}</p>
              </Row>
              {image &&
              <Row>
                <Col className="text-center">
                {(image.endsWith('jpg') || image.endsWith('png') || image.endsWith('jpeg')) && <Image fluid className="p-2" src={image}></Image>}
                {image.endsWith('mp4') && <ReactPlayer className="p-2" controls width='' height='' url={image}/>}
                </Col>
              </Row>
              }
            </span>
          </Link>
            {controls && (
                <div className="btn-group d-flex">
                  <Button
                    href="#rating"
                    onClick={() => handleRate(id, userRating)}
                    variant="light"
                  >
                    Rate
                  </Button>
                  <Button onClick={handleComment} variant="light">
                    Comment
                  </Button>
                </div>
            )}
            <CommentsView eventId={id} />
        </Container>
      </Card>
    </>
  );
};

export default Event;
