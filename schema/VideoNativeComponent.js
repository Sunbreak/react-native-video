import { requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';
import VideoProps from '../VideoProps';

const NativeVideoProps = {
  ...VideoProps,
  seek: PropTypes.any,
  fullscreen: PropTypes.bool,
  restoreUserInterfaceForPIPStopCompletionHandler: PropTypes.bool,
}

export default requireNativeComponent('RCTVideo')