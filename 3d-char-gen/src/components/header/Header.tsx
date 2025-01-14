import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
	margin-right: 30px;
	font-family: 'Helvetica', sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  a {
    color: #61dafb;
    text-decoration: none;
		font-family: 'Helvetica', sans-serif;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header: React.FC = () => {
	return (
		<HeaderContainer>
			<Logo>3D Pixel Generator</Logo>
			<Nav>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				<Link href="/contact">Contact</Link>
			</Nav>
		</HeaderContainer>
	);
};

export default Header;
