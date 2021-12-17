import Link from "next/link";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
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

const Event = ({ data, showRatingModal = () => {}, controls = true }) => {
  const {
    id,
    venue,
    textContent,
    createdOn,
    startTime,
    endTime,
    image,
    rating,
    userRating,
    User_id,
    society,
  } = data;

  const handleComment = () => {};

  const handleRate = (id, userRating) => {
    console.log(id, userRating);
    showRatingModal(id, userRating);
    console.log(data);
  };

  return (
    <>
      <Card className="m-2 shadow">
        <Container fluid>
          
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
                <p>{textContent}</p>
              </Row>
              <Row>
                <Col className="text-center">
                  <Image fluid className="p-2" src={image}></Image>
                </Col>
              </Row>
            </span>
          </Link>
          <Row className="justify-content-between mx-2"> 
            {startTime && (
              <Col>
                <pre><b> Start Time: </b>
                {moment(startTime).format('MMMM Do YYYY, h:mm a')}</pre>
              </Col>
            )}
          </Row>
          <Row className="justify-content-between mx-2">
          {endTime && (
              <Col>
                <pre><b> End Time: </b>
                {moment(endTime).format('MMMM Do YYYY, h:mm a')}</pre>
              </Col>
            )}
          </Row>
          <Row className="justify-content-between mx-2">  
          {venue &&
              <Col>
                <pre><b> Venue: </b>
                <FontAwesomeIcon className="mx-2" />
                {venue}</pre>
              </Col>}
          </Row>
          
          {controls && (
            <Container>
              <Row>
                <div className="btn-group">
                  {/* <Button href="#rating" onClick={()=>showRatingModal(id, userRating)} variant="light">Rate</Button> */}
                  <Button
                  
                    href="#rating"
                    onClick={() => handleRate(id, userRating)}
                    variant="light"
                  >
                    <img width='5%' src="https://img.icons8.com/material-outlined/24/000000/star--v3.png"/>                    Rate
                  </Button>
                  <Button className='hover' onClick={handleComment} variant="light">
                  <img width='5%' src="https://img.icons8.com/ios/50/000000/comments.png"/>
                    Comment
                  </Button>
                </div>
              </Row>
              <Row>
                <CommentsView eventId={id} />
              </Row>
            </Container>
          )}
        </Container>
      </Card>
    </>
  );
};

export default Event;
