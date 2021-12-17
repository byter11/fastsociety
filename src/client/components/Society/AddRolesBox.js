import { Form, Button } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import PermissionView from './PermissionView';

const AddRoleBox = ({ society }) => {
    const { user, token } = useFetchUser();
    const [roleData, setRoleData] = useState({
        createEvent: 0,
        deleteEvent: 0,
        createPost: 0,
        deletePost: 0,
        manageMembers: 0,
        manageChat: 0
    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setRoleData((old) => ({...old, [name]: value}))
    }

    const postMember = (e) => {
        e.preventDefault();
        e.target.reset();
    }

    return <>
    <Form onSubmit={postMember}>
        <div className="d-flex flex-wrap">
            <input
                className="hover my-2 mx-1 rounded border-light" 
                name="User_id" 
                placeholder="Role name" 
                autoComplete="off" 
                onChange={handleChange}/>
        </div>

        <PermissionView permissions={permissions} onChange={(e)=>updateRole(e,'yo')}/>

        <div class="d-flex">
        <Button 
            type="submit" 
            className="btn btn-primary flex-fill">
                Add member
        </Button>
        </div>
    </Form>
    </>
}

export default AddRoleBox;