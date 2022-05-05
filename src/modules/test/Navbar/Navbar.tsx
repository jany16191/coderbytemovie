import React from "react";
import { Container, Logo, Menu } from "./styles";

export const Navbar = ({ username }: { username: string }) => {
  return (
    <Container>
      <Logo color="red">Logo {username}</Logo>
      <Menu background="black">Menu</Menu>
    </Container>
  );
};
