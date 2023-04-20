import React from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function VenuesCard(props) {
  const { id, name, media } = props;
  return (
    <Col className="mb-4">
      <Card>
        <div>
          <img src={media} />
          <Link to={`props/${id}`}>VIEW</Link>
        </div>
      </Card>
    </Col>
  );
}

export default VenuesCard;
