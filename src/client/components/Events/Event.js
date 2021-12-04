import Link from 'next/link';   
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Spinner, Image, Button} from 'react-bootstrap';


const Event = ({data}) => {
    const {id, textContent, createdOn, startTime, endTime, image, User_id, society} = data;

    return <Card className="m-2">
        <Container fluid>
            <Row className="justify-content-start">
                <div ><Image className="m-2" src={image} roundedCircle height={40} width={40}/>
                <b>{society.title}</b> added an <b>Event</b></div>
            </Row>
            <Row className="px-2"><p>{textContent}</p></Row>
            <Row>
                <div className="btn-group">
                    <Button variant="light">Rate</Button>
                    <Button variant="light">Comment</Button>
                    <Button variant="light">Share</Button>
                </div>
            </Row>
        </Container>
    </Card>;
}

export default Event;