import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Event from '../components/Events/Event';
import PostsView from '../components/Posts/PostsView';

const EventPage = () => {
    const router = useRouter();
    const [event, setEvent] = useState({});

    useEffect(() => {
        if(!router.isReady) return;
        const { id } = router.query;
        fetch(`/api/event/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(event => {
            setEvent(event);
        });
    }, [router.isReady]);

    return <>
        <Event data={event}/>
        <PostsView eventId={event.id}/>
        </>
}

export default Event;