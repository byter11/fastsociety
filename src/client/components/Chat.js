import {useState, useEffect} from 'react';
import {Button,Image, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetchUser } from '../hooks/user';

export const Chat = ({society, reverse}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const {user, token} = useFetchUser();
    console.log(society)
    const image = reverse ? society.image : (user||{}).image;
    
    const fetchMessages = () => {
        fetch(`/api/society/${society.id}/message`,{
            method: "GET",
            headers: {token: token}
        })
        .then(res => res.json())
        .then(messages => {
            console.log(messages);
            setMessages(messages);
        })
    }

    const handleSend = (e) => {
        e.preventDefault();
        console.log(society);
        fetch(`/api/society/${society.id}/message`,{
            method: "POST",
            headers: {"Content-Type": 'application/json', token: token},
            body: JSON.stringify({textContent: input})
        })
        .then(res => {
            if(res.status == 200){
                setMessages(old => ([
                    ...old,
                    {isReply: 0,textContent: input}
                ]));
                e.target.reset();
            }
        });
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        fetchMessages();
    }, []);


    return <>
        <div style={{height: 30}} className="bg-dark text-light d-flex align-items-center text-center rounded justify-content-center">Chat</div>
        <div style={{height: 50}} className="bg-primary text-light d-flex align-items-center text-center rounded justify-content-start">
            <Image src={image} height={40} width={40} roundedCircle/>
        </div>
        <div style={{maxHeight: 200, overflow: 'auto'}} className="d-flex flex-column">
            {messages.map(m => 
                m.isReply ?
                <div style={{whiteSpace: 'pre-wrap'}} className="align-self-start bg-secondary m-2 p-2 text-dark float-left rounded-pill">{m.textContent}</div>
                :
                <div style={{whiteSpace: 'pre-wrap'}} className="align-self-end bg-primary m-2 p-2 float-right text-end text-light rounded-pill">{m.textContent}</div>
            )
            }
        </div>
        
        <Form onSubmit={handleSend}>
        <div className="d-flex">
        <Form.Control
            required
            as="textarea"
            autoComplete="off"
            className="bg-light rounded-pill" 
            placeholder="Enter a message..."
            rows={1}
            style={ {width:'100%', outline: 'none', margin: '5px 0px 5px 5px', padding: '0 10px'} } 
            onChange={handleChange}
          />
        <button className="border-0 bg-transparent">
            <FontAwesomeIcon
              icon="paper-plane"
              size="2x"
              className="ratingStarButton p-1"
              width={0}
              color="silver"
            />
          </button>
          </div>
          </Form>
          
    </>
}