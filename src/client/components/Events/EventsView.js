import Link from 'next/link';   
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Button} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Event from './Event';

const EventsView = ({societies = []}) => {
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchEvents = () => {
        fetch('/api/event/?'+ new URLSearchParams({societies: societies, offset: events.length}).toString(),{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(newEvents => {
            if(!Array.isArray(newEvents) || newEvents.length === 0){
                setHasMore(false);
                return;
            }
            setEvents(events => [...events, ...newEvents]);
        });
    }

    // OnComponentMount
    useEffect(() => {
        const scrollBarExists = document.body.scrollHeight > document.body.clientHeight;
        if (!scrollBarExists)
            fetchEvents();
    }, []);

    return <InfiniteScroll
            dataLength={events.length}
            next={fetchEvents}
            hasMore={hasMore}
            loader={<Skeleton count={10}/>}
            endMessage={
                <p className="text-muted" style={{ textAlign: "center" }}>
                    End of stream
                </p>
            }
            style={{
                maxWidth: 800,
                overflowX: 'hidden',
                margin: 'auto'
            }}
            initialScrollY={1}
        >
        {events.map((e, index) => (
            <Event data={e} key={index}></Event>
        ))}
        {hasMore && <div  className="text-center"><Button variant="light" onClick={fetchEvents}>Load More</Button></div>}
        </InfiniteScroll>
    
}

export default EventsView;