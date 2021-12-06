import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Event from '../../components/Events/Event';
import PostsView from '../../components/Posts/PostsView';

const EventPage = () => {
    const router = useRouter();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if(!router.isReady) return;
        const { id } = router.query;
        console.log('id', id);
        fetch(`/api/event/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(event => {
            console.log(event);
            setEvent(event);
        });
    }, [router.isReady]);

    return <Layout>
        {
            event && <>
            <Event data={event}/>
            <hr/>
            <h2 className='text-center text-muted'>Updates</h2>
            <PostsView eventId={event.id}/>
            </>
        }
        </Layout>
}

export default EventPage;