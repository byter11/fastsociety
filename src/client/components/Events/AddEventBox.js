import {Container, Row, Col, Button, Image, Form, FloatingLabel} from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import {useState, useEffect} from 'react';
import Link from 'next/link';

const AddEventBox = () => {
    const {user, token} = useFetchUser();
    const [society, setSociety] = useState(null);

    useEffect(()=>{
        setSociety(
            user ? user.societies.filter(s => s.role.createEvent)[0] : null
        );
        console.log(society);
    });

    const postEvent = (data) => {
        fetch('/api/event/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', token: token},
            body: data
        })
        .then((res) => console.log(res));
    }


    return <>
        {society &&
            <Container style={{}}>
                <Row className="justify-content-start">
                    <Col style={{cursor:'pointer'}}>
                        <Link href={`/society/${society.id}`}>
                            <Image className="m-2" src={society.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                        </Link>
                    </Col>
                    <Col>
                        <Form.Select className="my-2" style={{ border: 0, width: '10rem'}}>
                            {user.societies.map((s,i) => 
                                <option key={i} value={s.id}>{s.title}</option>    
                            )}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel></Col>
                </Row>
            </Container>
        }
    </>
}

export default AddEventBox;