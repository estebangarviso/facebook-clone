export const common = ({ theme }) => `
  background: none;
  background-color: white;
  color: ${theme.colors?.sub || 'grey'};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${theme.colors?.sub || 'grey'};
  margin: 25px 0;

  &:focus {
    outline: none;
  }
`;

export const shrink = ({ shrink, theme }) =>
  shrink
    ? `
top: -14px;
font-size: 12px;
color: ${theme.colors?.main || 'black'};
`
    : `
top: 10px;
font-size: 16px;
color: ${theme.colors?.sub || 'grey'};
`;
