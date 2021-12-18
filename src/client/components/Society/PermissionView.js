import {Form} from 'react-bootstrap';
import { useState } from 'react';
import { useFetchUser } from '../../hooks/user';
import {toast} from 'react-toastify';

const PermissionView = ({role, disabled, onChange}) => {
    const {user, token} = useFetchUser();
    const [permissions, setPermissions] = useState(role);

    const onChangeDefault = (e) => {
        const {name} = e.target;
        const value = +(!permissions[name]);
        value = +value;
        setPermissions(old => ({...old, [name]: value}))
        onChange(name, value);
    }

    onChange = onChange || ( (name, value) => {
        
        fetch(`/api/society/${role.societyId}/role`, {
            method: "PUT",
            headers: {"Content-Type": "application/json", token: token},
            body: JSON.stringify({role: role.name, name: name, value: value}) 
        })
        .then(res => {
            if(res.status == 200){
                setPermissions(p => ({...p, [name]: value}));
            }
        });
    });

    return (
    <div className="d-flex flex-wrap justify-content-between">
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="createEvent" onChange={onChangeDefault} label="Create Event" type="checkbox" disabled={disabled} checked={permissions.createEvent || false}/>
            <Form.Check name="deleteEvent" onChange={onChangeDefault} label="Delete Event" type="checkbox" disabled={disabled} checked={permissions.deleteEvent || false}/>
        </div>
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="createPost" onChange={onChangeDefault} label="Create Post" type="checkbox" disabled={disabled} checked={permissions.createPost || false}/>
            <Form.Check name="deletePost" onChange={onChangeDefault} label="Delete Post" type="checkbox" disabled={disabled} checked={permissions.deletePost || false}/>
        </div>
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="manageMembers" onChange={onChangeDefault} label="Manage Members" type="checkbox" disabled={disabled} checked={permissions.manageMembers || false}/>
            <Form.Check name="manageChat" onChange={onChangeDefault} label="Manage Chat" type="checkbox" disabled={disabled} checked={permissions.manageChat || false}/>
        </div>
    </div>
    )
}

export default PermissionView;