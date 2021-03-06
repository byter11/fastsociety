import { Container, Row, Col, Button, Image, Form, FloatingLabel, Modal } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from "react-toastify";


const AddEventBox = () => {
    const { user, token } = useFetchUser();
    const [society, setSociety] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [eventData, setEventData] = useState({

    });

    useEffect(() => {
        if (!user)
            return;
        user.societies = user.societies.filter(s => s.role.createEvent);
        setSociety((_) => {
            const society = user.societies[0]
            if (society)
                setEventData((old) => ({ ...old, Society_id: society.id }))
            return society;
        });

    }, [user]);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name == 'Society_id')
            setSociety(user.societies.filter(s => s.id == value)[0])
        if (name == 'startTime' || name == 'endTime' && eventData.date)
            value = eventData.date + ' ' + value;

        setEventData((e) => ({ ...e, [name]: files ? files[0] : value }));
        console.log(eventData);
    }

    const postEvent = (e) => {
        e.preventDefault();
        setShowModal(false);
        const formData = new FormData();
        for (var key in eventData)
            formData.append(key, eventData[key]);

        fetch('/api/event/', {
            method: 'POST',
            headers: { token: token },
            body: formData
        })
            .then((res) => {
                if(res.status == 200)
                    toast("Event submitted!");
                else
                    toast("Failed to post event.");
            });
    }

    if (!society) return <></>;
    console.log(!!society)
    return <>
        <Container>
            <div className="d-flex flex-wrap m-auto"
                style={{
                    cursor: 'pointer',
                    maxWidth: 768
                }}>
                <Link href={`/society/${society.id}`}>
                    <Image className="my-2" src={society.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                </Link>

                <div
                    className='p-2 m-2 flex-fill d-flex bg-light rounded-pill border text-muted hover'
                    onClick={() => setShowModal(true)}
                >
                    Create an event...
                </div>
            </div>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Body>
                <Form onSubmit={postEvent}>
                <div className="d-flex flex-wrap">
                    <Link href={`/society/${society.id}`}>
                        <Image className="m-2" src={society.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                    </Link>
                    <Form.Select value={society.id}
                        className="my-2"
                        style={{ border: 0, width: '10rem' }}
                        name="Society_id"
                        onChange={handleChange}>
                        {user.societies.map((s, i) =>
                            <option key={i} value={s.id}>{s.title}</option>
                        )}
                    </Form.Select>
                </div>
                <Form.Group>
                <Form.Label>*Date</Form.Label>
                <Form.Control
                    required
                    type="date"
                    name="date"
                    onChange={handleChange}
                    style={{ border: 'none' }} />
                </Form.Group>
                <div className="m-2 d-flex flex-wrap justify-content-between">
                    <Form.Group>
                        <Form.Label>Start time</Form.Label>
                        <Form.Control
                            type="time"
                            name="startTime"
                            onChange={handleChange}
                            style={{ border: 'none' }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End time</Form.Label>
                        <Form.Control
                            type="time"
                            name="endTime"
                            onChange={handleChange}
                            style={{ border: 'none' }}
                        />
                    </Form.Group>
                </div>
                {/* <FloatingLabel label="Venue"> */}
                <Form.Control
                    className="mb-2"
                    size="sm"
                    placeholder="Venue"
                    type="text"
                    name="venue"
                    onChange={handleChange}
                />
                {/* </FloatingLabel> */}
                <FloatingLabel controlId="floatingTextarea2" label="*Event text">
                    <Form.Control
                        required
                        className="mb-2"
                        name="textContent"
                        onChange={handleChange}
                        as="textarea"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>

                <Form.Control type='file' name="image" onChange={handleChange} accept=".jpg,.png,.jpeg,.mp4"/>
                <Button style={{ width: '100%' }} className="my-1" variant="primary" type="submit">
                    Post Event
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}

export default AddEventBox;