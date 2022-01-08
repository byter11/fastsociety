import React from 'react';
import Link from 'next/link';
import { Row, Col, Card } from "react-bootstrap";

const SocietyView = ({societies}) => {
    return (
      <div style={{
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap'
      }}>
        {societies &&
          societies.map((society, i) => {
            return (
              <Link href={`/society/${society.id}`} key={i}>
              <Card className="link shadow d-inline-block m-1" style={{ width: "14rem", border:"1px solid gainsboro" }}>
                <Row>
                  <Col>
                    <Card.Img
                      variant="top"
                      src={society.image}
                      className="p-3"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                      width={200}
                      height={200}
                    />
                    <Card.Title ><p style={{height: 30, whiteSpace: 'break-spaces'}}><b>{society.title}</b></p></Card.Title>
                  </Col>
                </Row>
                <Card.Body>
                  <span>{society.role.name}</span>
                </Card.Body>
              </Card>
              </Link>
            );
          })}
      </div>
    );
}

export default SocietyView;
