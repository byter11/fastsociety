import {Form} from 'react-bootstrap';

const PermissionView = ({permissions, disabled, onChange}) => {

    const [permissions, setPermissions] = useState(Object.fromEntries(Object.keys(roleData).map(key => [key, 0])));

    console.log(permissions);
    const updateRole = onChange || ( (e, role) => {
        const {name} = e.target;
        const value = +(!permissions[name]);
        
        value = +value;
        fetch(`/api/society/${society.id}/role`, {
            method: "PUT",
            headers: {"Content-Type": "application/json", token: token},
            body: JSON.stringify({name: role, [name]: value}) 
        })
        .then(res => {
            setPermissions(p => ({...p, [name]: value}));
            toast(res.status);
        });
    });

    return (
    <div className="d-flex flex-wrap justify-content-between">
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="createEvent" onChange={updateRole} label="Create Event" type="checkbox" disabled={disabled} checked={permissions.createEvent || false}/>
            <Form.Check name="deleteEvent" onChange={updateRole} label="Delete Event" type="checkbox" disabled={disabled} checked={permissions.deleteEvent || false}/>
        </div>
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="createPost" onChange={updateRole} label="Create Post" type="checkbox" disabled={disabled} checked={permissions.createPost || false}/>
            <Form.Check name="deletePost" onChange={updateRole} label="Delete Post" type="checkbox" disabled={disabled} checked={permissions.deletePost || false}/>
        </div>
        <div className="d-flex flex-wrap flex-fill justify-content-between">
            <Form.Check name="manageMembers" onChange={updateRole} label="Manage Members" type="checkbox" disabled={disabled} checked={permissions.manageMembers || false}/>
            <Form.Check name="manageChat" onChange={updateRole} label="Manage Chat" type="checkbox" disabled={disabled} checked={permissions.manageChat || false}/>
        </div>
    </div>
    )
}

export default PermissionView;