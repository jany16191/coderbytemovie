import styled from "styled-components";

interface MenuProps {
  background: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: #f1f1f1;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: ${(props) => props.color};
`;

export const Menu = styled.section<MenuProps>`
  background: ${(props) => props.background};
`;
