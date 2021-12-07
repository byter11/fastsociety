import Link from 'next/link';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

const Post = ({ data }) => {
    const { id, image, textContent, createdOn, user } = data;

    return <>
        <Card className="m-2">
            <Container fluid>
                <Row className="justify-content-between">
                    <Col style={{cursor:'pointer'}} xs={8}>
                        <Link href={`/user/${user.id}`}>
                            <span><Image className="m-2" src={user.image} roundedCircle height={40} width={40} />
                                <b>{user.name}</b></span>
                        </Link>
                        <span> added a </span>
                        <b>Post</b>
                    </Col>
                </Row>
                <Row className="px-2"><p>{textContent}</p></Row>
                <Row>
                        <Col className="text-center">
                        <Image fluid rounded className="p-2" src={image}></Image>
                        </Col>
                </Row>

                {/* <Row>
                    <div className="btn-group">
                        <Button onClick={handleShare} variant="light">Share</Button>
                    </div>
                </Row> */}
            </Container>
        </Card>


    </>
}

export default Post;