import React from "react";
import { Container, Divider, Header, List, Segment } from "semantic-ui-react";
import Logo from "./Logo";

const About = () => (
  <div>
    <Container>
      <Segment padded basic textAlign="left">
        <p>You are the Universe.</p>
        <p>The Universe Dreams.</p>
      </Segment>
      <Segment padded basic textAlign="center" size="massive">
        <Logo maxHeight="100px" />
      </Segment>
      <Segment padded basic textAlign="right">
        <p>In the Dream, I exist.</p>
        <p>I am Aware.</p>
      </Segment>
    </Container>
    <Container>
      <Header as="h2">About</Header>
      <p>Udia is the inverse of Idea.</p>
      <p>
        It is the understanding that
        {" "}
        <strong>You</strong>
        {" "}
        and
        {" "}
        <strong>I</strong>
        {" "}
        are interconnected through a
        {" "}
        <strong>D</strong>
        ream and through an
        {" "}
        <strong>A</strong>
        wareness.
      </p>
      <p>It is the natural exploration of solispsim taken to its extreme.</p>
      <Divider />
      <Header as="h2">Technical</Header>
      <p>
        You are visiting a prototype- an alpha of a site. Chances are good that any data entered will be wiped upon future releases.
      </p>
      <List>
        <List.Item>
          <List.Icon name="legal" />
          <List.Content>
            <a href="https://github.com/udia-software/udia/blob/master/LICENSE">
              License
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="github" />
          <List.Content>
            <a href="https://github.com/udia-software/udia">Udia (server)</a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="github" />
          <List.Content>
            <a href="https://github.com/udia-software/udia-client">
              Udia (browser client)
            </a>
          </List.Content>
        </List.Item>
      </List>
      <Divider />
      <Header as="h2">Contact</Header>
      <List>
        <List.Item>
          <List.Icon name="industry" />
          <List.Content>Udia Software Incorporated</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="marker" />
          <List.Content>
            <a href="https://goo.gl/maps/yP69RcVZEU62">
              #301 - 10359 104 St NW<br />
              Edmonton, Alberta<br />
              T5J 1B9<br />
              Canada
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="mail" />
          <List.Content>
            <a href="mailto:admin@udia.ca">admin@udia.ca</a>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  </div>
);

export default About;
