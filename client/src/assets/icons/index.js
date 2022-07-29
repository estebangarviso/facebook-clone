import { SvgIcon } from '@mui/material';
import { ReactComponent as FeelingActivity } from './FeelingActivity.svg';
import { ReactComponent as LiveVideo } from './LiveVideo.svg';
import { ReactComponent as Media } from './Media.svg';
import { ReactComponent as Messenger } from './Messenger.svg';
import { ReactComponent as Notifications } from './Notifications.svg';

export const FeelingActivityIcon = (props) => <SvgIcon {...props} component={FeelingActivity} />;
export const LiveVideoIcon = (props) => <SvgIcon {...props} component={LiveVideo} />;
export const MediaIcon = (props) => <SvgIcon {...props} component={Media} />;
export const MessengerIcon = (props) => <SvgIcon {...props} component={Messenger} />;
export const NotificationsIcon = (props) => <SvgIcon {...props} component={Notifications} />;
