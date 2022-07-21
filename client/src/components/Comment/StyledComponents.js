import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledComment = styled(ListItem)`
  position: relative;
  overflow: visible;
  display: block;

  .node-branch-root {
    position: absolute;
    height: 100%;
    width: 85px;
    left: ${(props) => props.theme.spacing(2)};
    top: ${(props) => props.theme.spacing(3.45)};
    border-left: 3px solid ${(props) => props.theme.palette.background.comment};
    border-bottom-left-radius: 50px;
  }
  /*
  .node-branch-curve {
    position: absolute;
    width: 22px;
    height: 20px;
    top: 0;
    left: -${(props) => props.theme.spacing(2)};
    border-bottom-left-radius: 10px;
    ${(props) =>
    !props?.rootNode
      ? `border-left-width: 3px;
    border-left-style: solid;
    border-left-color: ${props.theme.palette.background.comment};
    border-bottom-style: solid;
    border-bottom-color: ${props.theme.palette.background.comment};`
      : ''}
  }*/
`;
