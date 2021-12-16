import { Form } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

const AddMemberBox = ({ society }) => {
    const { user, token } = useFetchUser();
    const [memberData, setMemberData] = useState({Role_name: (society.roles[0]||{}).name})
    const [permissions, setPermissions] = useState(
        society.roles.length > 0 
        ? society.roles[0]
        : {}
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name == 'Role_name'){
            const role = society.roles.filter(r => r.name == value)[0]
            setPermissions(role);
        }
        setMemberData((old) => ({...old, [name]: value}))
    }

    const postMember = (e) => {
        e.preventDefault();
        e.target.reset();

        console.log(memberData);
        fetch(`/api/society/${society.id}/user`,{
            method: 'POST',
            headers: {"Content-Type": "application/json", token: token},
            body: JSON.stringify({
                ...memberData, Society_id: society.id
            })
        })
        .then((res) => {
            console.log('res', res);
            if(res.status == 200)
                toast("Member registered! Please refresh the page.");
            else
                toast("Error registering member.");
        })
    }

    return <>
    <Form onSubmit={postMember}>
        <div className="d-flex flex-wrap">
            <input 
                className="hover my-2 mx-1 rounded border-light" 
                name="User_id" 
                placeholder="User id (k21xxxx)" 
                autoComplete="off" 
                onChange={handleChange}/>
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
            <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check label="Manage Members" type="checkbox" disabled checked={permissions.manageMembers || false}/>
            <Form.Check label="Manage Chat" type="checkbox" disabled checked={permissions.manageChat || false}/>
            </div>
        </div>
        <button 
            type="submit" 
            className="btn btn-primary flex-fill">
                Add member
        </button>
    </Form>
    </>
}

export default AddMemberBox;