import Link from 'next/link';   
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';

const EventsView = ({societies = []}) => {
    const [events, setEvents] = useState([{id:23}]);
    const [hasMore, setHasMore] = useState(true);

    const fetchEvents = () => {
        fetch('/api/event/?'+ new URLSearchParams({societies: societies, offset: events.length}).toString(),{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(newEvents => {
            if(newEvents.length === 0){
                setHasMore(false);
                return;
            }
            setEvents(events => [...events, ...newEvents]);
        });
    }
    
    // //OnComponentMount
    // useEffect(()=> {
    //     fetchEvents();
    // }, []);

    
    return <InfiniteScroll
            dataLength={events.length}
            next={fetchEvents}
            hasMore={hasMore}
            loader={<Skeleton count={10}/>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
        {events.map(e => (
            <Event data={e}></Event>
        ))}
        {hasMore && <a onClick={fetchEvents}>Load More</a>}
        </InfiniteScroll>
    
}

export default EventsView;