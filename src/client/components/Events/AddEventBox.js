import {Container, Row, Col, Button, Image, Form, FloatingLabel, Modal} from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import {useState, useEffect} from 'react';
import Link from 'next/link';

const AddEventBox = () => {
    const {user, loading, token} = useFetchUser();
    const [society, setSociety] = useState(null);
    const [dropDown, setDropDown] = useState(false);
    const [eventData, setEventData] = useState({
      
    });

    useEffect(()=>{
        if(loading)
            return;

        setSociety( (_) =>{
            const society = user.societies.filter(s => s.role.createEvent)[0]
            setEventData((old) => ({...old, Society_id: society.id}))
            return society;
        });
        
    }, [loading]);

    const handleChange = e => {
        const {name, value} = e.target;
        if(name == 'Society_id')
            setSociety(user.societies.filter(s=>s.id == value)[0])
        if(name == 'startTime' || name == 'endTime' && eventData.date)
            value = eventData.date + ' ' + value;
        
        setEventData((e) => ({...e, [name]: value}));
        console.log(eventData);
        console.log(name, value);
    }


    const handleSubmit = () => {

    }

    const postEvent = () => {
        fetch('/api/event/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json', token: token},
            body: eventData
        })
        .then((res) => console.log(res));
    }

    if (!society) return <></>;
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
                    onClick={()=>setDropDown(true)}
                >
                    Create an event...
                </div>
        </div>
    </Container>

    <Modal show={dropDown} onHide={()=>setDropDown(false)}>
        <Modal.Body>
            <Form onSubmit={postEvent}>
                <div className="d-flex flex-wrap">
                    <Link href={`/society/${society.id}`}>
                        <Image className="m-2" src={society.image || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='} roundedCircle height={40} width={40} />
                    </Link>
                    <Form.Select 
                        className="my-2" 
                        style={{ border: 0, width: '10rem'}}
                        name="Society_id"
                        onChange={handleChange}>
                        {user.societies.map((s,i) => 
                            <option key={i} value={s.id}>{s.title}</option>    
                        )}
                    </Form.Select>
                </div>
                <input
                    type="date"
                    name="date"
                    value={null}
                    onChange={handleChange}
                    style={{border:'none'}}/>
                <div className="m-2 d-flex flex-wrap justify-content-between">
                    <input
                        type="time"
                        name="startTime"
                        value={null}
                        onChange={handleChange}
                        style={{border: 'none'}}
                        />
                        -
                    <input
                        type="time"
                        name="endTime"
                        value={null}
                        onChange={handleChange}
                        style={{border: 'none'}}
                        />
                </div>
                {/* <FloatingLabel label="Venue"> */}
                    <Form.Control
                        className="mb-2"
                        size="sm"
                        placeholder="Venue"
                        type="text"
                        name="venue"
                        value={null}
                        onChange={handleChange}
                        />
                {/* </FloatingLabel> */}
                <FloatingLabel controlId="floatingTextarea2" label="Event text">
                    <Form.Control
                    name="textContent"
                    onChange={handleChange}
                    as="textarea"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>

                <Row>
                    <Col className=''><Button style={{width: '100%'}} className="my-1" variant="primary" type="submit">
                        Post Event
                    </Button></Col>
                </Row>
            </Form>
        </Modal.Body>
    </Modal>
    </>
}

export default AddEventBox;