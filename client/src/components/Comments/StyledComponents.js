import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledComments = styled(Box)`
  > .comment-form {
    padding: 4px 16px;
  }
  .comments {
    padding-left: 16px;
    padding-top: 4px;
  }
  .reply {
    margin-left: ${(props) => props.theme.spacing(4)};
    padding-right: ${(props) => props.theme.spacing(4)};
    .MuiAvatar-root {
      width: 24px;
      height: 24px;
    }
  }
`;
