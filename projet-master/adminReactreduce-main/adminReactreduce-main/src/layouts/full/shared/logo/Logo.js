import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

// Assuming logo.jpg is an image file (not an SVG)
import LogoImage from 'src/assets/images/logos/logo.jpg';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <img src={LogoImage} alt="Logo" height={70} />
    </LinkStyled>
  );
};

export default Logo;
