import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const NoMatch = ({ location }) => (
  <Container>
    <h3>Page not found!</h3>
    <p>No match found for <code>{location.pathname}</code></p>
    <p><Link to="/">Go to the home page →</Link></p>
  </Container>
);

export default NoMatch;
