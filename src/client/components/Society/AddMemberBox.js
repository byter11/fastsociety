import { Container, Row, Col, Button, Image, Form, FloatingLabel, Toast } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const AddMemberBox = ({ society }) => {
    const { user, token } = useFetchUser();
    const [memberData, setMemberData] = useState({role: {}})
    const [permissions, setPermissions] = useState(
        society.roles.length > 0 
        ? society.roles[0]
        : {}
    );
    const [toast, setToast] = useState({show: false, message: ''})

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value)
        if(name == 'Role_name'){
            const role = society.roles.filter(r => r.name == value)[0]
            setPermissions(role);
        }
    }

    const postMember = (e) => {
        e.preventDefault();
        e.target.reset();

        fetch(`/api/society/${society.id}/user`,{
            method: 'POST',
            headers: {token: token},
            body: memberData
        })
        .then((res) => {
            if(res.status == 200)
                setToast({show: true, message: "Member registered!"});
            else
                setToast({show: true, message: "Error registering member."});
            console.log(res)
        })
        .catch(e => setToast({show: true, message: JSON.stringify(e)}));
    
    }


    return <>
    <Form onSubmit={postMember}>
        <div className="d-flex flex-wrap">
            <input 
                className="hover my-2 mx-1 rounded border-light" 
                name="User_id" 
                placeholder="User id (k21xxxx)" 
                autoComplete="off" />
            <Form.Select
                className="my-2 mx-1"
                style={{ border: 0, width: '10rem' }}
                name="Role_name"
                onChange={handleChange}>
                {society.roles.map((r, i) =>
                    <option key={i} value={r.name}>{r.name}</option>
                )}
            </Form.Select>
        </div>

        <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check label="Create Event" type="checkbox" disabled checked={permissions.createEvent || false}/>
            <Form.Check label="Delete Event" type="checkbox" disabled checked={permissions.deleteEvent || false}/>
            </div>
            <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check label="Create Post" type="checkbox" disabled checked={permissions.createPost || false}/>
            <Form.Check label="Delete Post" type="checkbox" disabled checked={permissions.deletePost || false}/>
            </div>
        </div>
        <button 
            type="submit" 
            className="btn btn-primary flex-fill">
                Add member
        </button>
    </Form>

    <Toast autohide show={toast.show} onClose={()=>setToast({show: false, message: ''})}>
          <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
    </>
}

export default AddMemberBox;