import React from "react";
import { Link } from "react-router-dom";
import { List, Segment } from "semantic-ui-react";

const Footer = () => (
  <Segment textAlign="center" color="green" style={{ margin: "1em 0 0 0 " }}>
    <List bulleted horizontal link>
    <List.Item as={Link} to="/">UDIA</List.Item>
    <List.Item as={Link} to="/about">About</List.Item>
    </List>
  </Segment>
);

export default Footer;
