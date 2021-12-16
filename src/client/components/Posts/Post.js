import Link from 'next/link';
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Dropdown, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { useFetchUser } from '../../hooks/user';
import { toast } from 'react-toastify';

const Post = ({ post, canDelete }) => {
    const { user, token } = useFetchUser();

    const { id, image, textContent, createdOn, user: author, Event_id: eventId } = post;

    const handleDelete = () => {
        fetch(`/api/event/${eventId}/post/${id}`, {
            method: 'DELETE',
            headers: { token: token }
        })
            .then(res => {
                if (res.status == 200)
                    toast("Success! post deleted.")
                else
                    toast("Sorry, failed to delete the post.")
            })
    }

    return <>
        <Card className="m-2 shadow-sm">
            <Container fluid>
                <Row className="justify-content-between">
                    <Col style={{ cursor: 'pointer' }}>
                        <Link href={`/user/${author.id}`}>
                            <span><Image className="m-2" src={author.image} roundedCircle height={40} width={40} />
                                <b>{author.name}</b></span>
                        </Link>
                    </Col>
                    <Col className="text-end align-self-center mx-2">
                        <Dropdown>
                            <Dropdown.Toggle variant="" />
                            <Dropdown.Menu>
                                {canDelete && <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row className="px-2"><p style={{ whiteSpace: 'pre-wrap' }}>{textContent}</p></Row>
                {image &&
                    <Row>
                        <Col className="text-center">
                            {(image.endsWith('jpg') || image.endsWith('png') || image.endsWith('jpeg')) && <Image fluid className="p-2" src={window.location.origin + '/' + image}></Image>}
                            {image.endsWith('mp4') && <ReactPlayer className="p-2" controls width='' height='' url={image} />}
                        </Col>
                    </Row>
                }

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