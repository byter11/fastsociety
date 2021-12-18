import { Form, Button } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import PermissionView from './PermissionView';

const AddRoleBox = ({ society }) => {
    const { user, token } = useFetchUser();
    const permissions = {
        createEvent: 0,
        deleteEvent: 0,
        createPost: 0,
        deletePost: 0,
        manageMembers: 0,
        manageChat: 0
    };

    const [roleData, setRoleData] = useState(permissions);
    
    const handleChange = (name, value) => {
        setRoleData((old) => ({...old, [name]: value}))
    }

    const postMember = (e) => {
        console.log(roleData);
        e.preventDefault();
        fetch(`/api/society/${society.id}/role`, {
            method: "POST",
            headers: {"Content-Type": "application/json", token: token},
            body: JSON.stringify(roleData) 
        })
        .then(res => {
            if(res.status == 200)
                toast("Role added!");
            else
                toast("Server error");
        });
        e.target.reset();
    }

    return <>
    <Form onSubmit={postMember}>
        <div className="d-flex flex-wrap">
            <input
                className="hover my-2 mx-1 rounded border-light" 
                name="name" 
                placeholder="Role name" 
                autoComplete="off" 
                onChange={e => handleChange(e.target.name, e.target.value)}/>
        </div>

        <PermissionView role={permissions} onChange={handleChange}/>

        <div class="d-flex">
        <Button 
            type="submit" 
            className="btn btn-primary flex-fill">
                Add Role
        </Button>
        </div>
    </Form>
    </>
}

export default AddRoleBox;