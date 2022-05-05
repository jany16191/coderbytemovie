import { Input, Button } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { Navbar } from "./Navbar/Navbar";

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const StyledButton = styled(Button)`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  &:hover {
    background: violet;
  }
`;

const OutlinedButton = styled(StyledButton)`
  color: palevioletred;
  background: white;
`;

const StyledInput = styled(Input)`
  border: 2px solid palevioletred;
  color: palevioletred;
`;

type TTest = {
  username: string;
};

const StyledComponent = ({ username }: TTest) => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <StyledButton>Normal button</StyledButton>
      <OutlinedButton>Outlined button</OutlinedButton>
      <StyledInput defaultValue="default value"></StyledInput>
      <Navbar username={username} />
    </Wrapper>
  );
};

const mapStateToProps = (state: TTest) => ({
  username: state.username,
});

export const StyledComponentContainer =
  connect(mapStateToProps)(StyledComponent);
