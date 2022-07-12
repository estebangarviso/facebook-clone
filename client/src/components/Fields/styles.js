// deprecated: use mui instead of material-ui
import styled from 'styled-components';
import { common, shrink } from './functions';
// Make floating label style when input is focused
export const FieldContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FieldInput = styled.input`
  ${common}
  [type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FieldTextarea = styled.textarea`
  ${common}
  box-sizing: border-box;
  resize: none;
`;

export const FieldLabel = styled.label`
  ${shrink}
  font-weight: normal;
  position: absolute;
  left: 5px;
  pointer-events: none;
  transition: 300ms ease all;
`;
export const FieldSubmit = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors?.primaryBg || '#333'};
  color: ${({ theme }) => theme.colors?.primaryText || '#fff'};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 300ms ease all;
  &:hover {
    background-color: ${({ theme }) => theme.colors?.primaryBgHover || '#000'};
  }
  &:focus {
    outline: none;
  }
`;
