import {Container, Row, Col, Button, Image, Form, FloatingLabel, Modal} from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import {useState, useEffect} from 'react';
import Link from 'next/link';

const AddEventBox = ({eventId}) => {
    const {user, token} = useFetchUser();
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState({});

    const handleChange = e => {
        const {name, value, files} = e.target;
        setPostData((e) => ({...e, [name]: files? files[0] : value}));
        console.log(postData);
    }

    const postUpdate = () => {
        setShowModal(false);
        const formData = new FormData();
        for(var key in postData)
            formData.append(key, postData[key]);
            
        fetch(`/api/event/${eventId}/post`,{
            method: 'POST',
            headers: {token: token},
            body: formData
        })
        .then((res) => console.log(res));
    }

    if (!user || !eventId) return <></>;
    
    return <>
    <Container>
        <div className="d-flex flex-wrap m-auto"
        style={{
            cursor: 'pointer',
            maxWidth: 768
            }}>
                <Link href={`/profile/${user.id}`}>
                    <Image className="my-2" src={user.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                </Link>
            
                <div 
                    className='p-2 m-2 flex-fill d-flex bg-light rounded-pill border text-muted hover'
                    onClick={()=>setShowModal(true)}
                >
                    Post an update...
                </div>
        </div>
    </Container>

    <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Body>
            {/* <Form onSubmit={postEvent}> */}
                <div className="d-flex flex-wrap align-items-center">
                    <Image className="m-2" src={user.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                    <b>{user.name}</b>
                </div>
                
                
                <FloatingLabel className="mb-2" controlId="floatingTextarea2" label="Post text">
                    <Form.Control
                    name="textContent"
                    onChange={handleChange}
                    as="textarea"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
                
                <input type='file' name="image" onChange={handleChange}/>
                <Button onClick={postUpdate} style={{width: '100%'}} className="my-1" variant="primary" type="submit">
                        Post
                </Button>
        </Modal.Body>
    </Modal>
    </>
}

export default AddEventBox;