import { Form, Button } from 'react-bootstrap';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import PermissionView from './PermissionView';

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

        <PermissionView permissions={permissions} disabled/>

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

export default AddMemberBox;