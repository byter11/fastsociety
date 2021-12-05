import Link from 'next/link';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

const Event = ({ data, showRatingModal=()=>{}}) => {
    const { id, textContent, createdOn, startTime, endTime, image, rating, userRating, User_id, society } = data;
    console.log(userRating);
    const handleComment = () => {

    }

    const handleShare = () => {

    }

    return <>
        <Card className="m-2">
            <Container fluid>
                <Row className="justify-content-between m-1">
                    {startTime &&
                        <Col>
                            <FontAwesomeIcon icon={faHourglassStart} />
                            {startTime}
                        </Col>
                    }
                    {endTime &&
                        <Col className="text-end">
                            <FontAwesomeIcon icon={faHourglassEnd} />
                            {endTime}
                        </Col>
                    }
                </Row>
                <Row className="justify-content-between">
                    <Col xs={8}>
                        <Link href={`/society/${society.id}`}>
                            <span><Image className="m-2" src={image} roundedCircle height={40} width={40} />
                                <b>{society.title}</b></span>
                        </Link>
                        <span> added an </span>
                        <Link href={`/event/${id}`}>
                            <b>Event</b>
                        </Link>

                    </Col>
                    <Col className="text-end align-self-center mx-2">
                        <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: userRating ? "yellow" : "grey" }}>
                        </FontAwesomeIcon>
                        <span> {rating || 0}</span>
                    </Col>
                </Row>
                <Row className="px-2"><p>{textContent}</p></Row>
                <Row>
                    <div className="btn-group">
                        <Button href="#rating" onClick={()=>showRatingModal(id, userRating)} variant="light">Rate</Button>
                        <Button onClick={handleComment} variant="light">Comment</Button>
                        <Button onClick={handleShare} variant="light">Share</Button>
                    </div>
                </Row>
            </Container>
        </Card>


    </>
}

export default Event;