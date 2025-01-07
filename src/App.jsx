import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

// *sytled-components是一個CSS-in-JS的函式庫，可以讓我們在React元件中撰寫CSS樣式
const StyledApp = styled.main`
  background-color: #f0f0f0;
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
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check in and out</Heading>
        <Heading as="h3">Form</Heading>

        <Button onClick={() => alert("Check in")}>Check in</Button>
        <Input type="number" placeholder="Number of guests" />
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
