import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

// *sytled-components是一個CSS-in-JS的函式庫，可以讓我們在React元件中撰寫CSS樣式
const StyledApp = styled.main`
  color: white;
  padding: 20px;
  margin: 20px;
`;

function App() {
  return (
    <>
      {/* GlobalStyles组件不能接收children，只能是sibling */}
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check in and out</Heading>
              <Button onClick={() => alert("Check in")}>Check in</Button>
              <Button
                size="small"
                variation="secondary"
                onClick={() => alert("Check out")}
              >
                Check out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form action="">
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
