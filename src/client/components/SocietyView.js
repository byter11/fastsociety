import React from 'react';
import { Container, Row, Col, Image, Spinner, Card } from "react-bootstrap";

const SocietyView = ({societies}) => {

    console.log(societies);
    return (
      <>
        {societies &&
          societies.map((society) => {
            return (
              <Card className="shadow" style={{ width: "14rem", border:"1px solid gainsboro" }}>
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
                      roundedCircle
                      width={200}
                      height={200}
                    />
                    <Card.Title text-center>{society.title}</Card.Title>
                  </Col>
                </Row>
                <Card.Body>
                  <span>{society.role.name}</span>
                </Card.Body>
              </Card>
            );
          })}
      </>
    );
}

export default SocietyView;
