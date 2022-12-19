import React from "react";
import { Link } from "react-router-dom";
import { Avatar, List, Skeleton, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import "./UserCard.scss";

function UserCard(props) {
  return (
    <List.Item
      key={props.uuid}
      className="user-item"
      actions={[
        <div className="user-item-action">
        <DeleteOutlined
          style={{ display: "block"}}
          onClick={() => props.onDelete(props.uuid)}
        />
        Delete
        </div>,
      ]}
    >
      <Skeleton avatar title={false} loading={props.isLoading} active>
        <List.Item.Meta
          avatar={
            <Link to={`/users/${props.uuid}`}>
              <Avatar
                size={{ xs: 80 }}
                src={props.picture.large}
              />
            </Link>
          }
          title={
            <Link to={`/users/${props.uuid}`}>
              {props.name.first} {props.name.last}
            </Link>
          }
          description={
            <Row className="user-item-description">
              <Col className="user-item-description-email">{props.email}</Col>
              <Col>
                <p>{props.location.street?.number} {props.location.street?.name}, {props.location.postcode}
                <br/>
                {props.location.city}, {props.location.state},{" "}
                {props.location.country}
                </p>
              </Col>
            </Row>
          }
        />
      </Skeleton>
    </List.Item>
  );
}

export default UserCard;
