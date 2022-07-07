// deprecated: use mui instead
import styled from 'styled-components';

export const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

export const HeaderLogoContainer = styled.div`
  display: block;
`;

export const HeaderLogo = styled.img`
  width: auto;
  height: 40px;
  @media (max-width: 768px) {
    height: 35px;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors?.main || 'black'};
    font-size: 18px;
    font-weight: bold;
    padding: 10px 10px 10px 5px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors?.sub || 'grey'};
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    min-width: 100px;
    width: 80vw;
    background-color: ${({ theme }) => theme.colors?.primaryBg || '#333'};
    animation: ${({ isOpen }) => (isOpen ? 'slideIn 0.3s ease-in-out' : 'slideOut 0.3s ease-in-out')};
    a {
      color: ${({ theme }) => theme.colors?.primaryText || '#fff'};
      padding: 10px;
      font-size: 16px;
      width: 100%;
    }
    z-index: 100;
  }

  @keyframes slideIn {
    0% {
      left: -100%;
      opacity: 0;
    }
    100% {
      left: 0;
      opacity: 1;
    }
  }

  @keyframes slideOut {
    0% {
      left: 0;
      opacity: 1;
    }
    100% {
      left: -100%;
      opacity: 0;
    }
  }
`;

export const BlackOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease-in-out;
`;
