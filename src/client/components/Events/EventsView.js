import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFetchUser } from '../../hooks/user';
import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, FloatingLabel, Form, Button} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Event from './Event';

const EventsView = ({societies = []}) => {
    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [ratingModal, setRatingModal] = useState({show: false, event: {}});
    const {user, token} = useFetchUser();

    const fetchEvents = () => {
        fetch('/api/event/?'+ new URLSearchParams({societies: societies, offset: events.length}).toString(),{
            method: 'GET',
            headers: {'Content-Type': 'application/json', token: token}
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

    return (
      <>
        <InfiniteScroll
          dataLength={events.length}
          next={fetchEvents}
          hasMore={hasMore}
          loader={<Skeleton count={10} />}
          endMessage={
            <p className="text-muted" style={{ textAlign: "center" }}>
              End of stream
            </p>
          }
          style={{
            maxWidth: 800,
            overflowX: "hidden",
            margin: "auto",
          }}
          initialScrollY={1}
        >
          {events.map((e, index) => (
            <Event
              data={e}
              key={index}
              showRatingModal={(eventId, userRating) =>
                setRatingModal({
                  show: true,
                  event: { index, eventId, userRating },
                })
              }
            />
            // <PostsView />
          ))}
          {hasMore && (
            <div className="text-center">
              <Button variant="light" onClick={fetchEvents}>
                Load More
              </Button>
            </div>
          )}
        </InfiniteScroll>

        {/* Single stateful modal to avoid large html size */}
        {user && (
          <Modal
            show={ratingModal.show}
            onHide={() => setRatingModal({ show: false, event: {} })}
          >
            <Modal.Header
              className="p-2"
              style={{ border: "none" }}
              closeButton
            />
            <Modal.Body>
              <Container>
                <Row className="justify-content-start">
                  <RatingButtons
                    event={ratingModal.event}
                    setUserRating={(i) =>
                      setRatingModal((old) => {
                        old.event.userRating = i;
                        setEvents((events) => {
                          events[old.event.index].userRating = i;
                          return events;
                        });
                        return old;
                      })
                    }
                  />
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
    
}

const RatingButtons = ({n=5, event={}, setUserRating=()=>{}}) => {
    const getColors = (i) => {
        return [...Array(i).fill('yellow'), ...Array(n-i).fill('gainsboro')]
    }
    const [colors, setColors] = useState(
        getColors(event.userRating || 0)
    );
    const {user, token} = useFetchUser();
    
    const handleClick = (i) => {
        if(!user || !token)
            return;
        fetch(`/api/event/${event.eventId}/rating`,{
            method: "POST",
            headers: {'Content-Type': 'application/json', token: token},
            body: JSON.stringify({rating: i})
        })
        .then(res => {
            if (res.status === 200){
                setUserRating(i);
            }
        });
    }

    return Array(n).fill().map((_, i) => 
        <Col className="text-center" key={i}>
            <FontAwesomeIcon
                key={i}
                color={colors[i]}
                icon="star" 
                onMouseEnter={()=>setColors(getColors(i+1))}
                onMouseLeave={()=>setColors(getColors(event.userRating || 0))}
                onClick={()=>handleClick(i+1)}
                size="2x"
                className="ratingStarButton"
            />
        </Col>
    )
}


export default EventsView;