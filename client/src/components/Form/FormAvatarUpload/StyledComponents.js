import styled from 'styled-components';
import { Avatar, Button as MuiButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { CloudUpload as MuiCloudUpload, Delete as MuiDelete } from '@mui/icons-material';
import { spacing } from '@mui/system';

export const Button = styled(MuiButton)(spacing);
export const UploadIcon = styled(MuiCloudUpload)(spacing);
export const DeleteIcon = styled(MuiDelete)(spacing);

export const BigAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  margin: 0 auto ${(props) => props.theme.spacing(2)};
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;
