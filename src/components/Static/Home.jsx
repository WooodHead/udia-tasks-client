import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import Logo from "./Logo";

const Home = () => {
  document.title = "UDIA";
  return (
    <div style={{ marginTop: -14 }}>
      <Segment size="massive" textAlign="center" padded basic>
        <Header as="h1" icon>
          <Logo maxHeight="90px" />
          <div>UDIA</div>
          <Header.Subheader>
            Universal Dream, Infinite Awareness
          </Header.Subheader>
        </Header>
      </Segment>
      <Container>
        In a constant pursuit of meaning in life, we stumble into serendipity.
      </Container>
    </div>
  );
};

export default Home;
