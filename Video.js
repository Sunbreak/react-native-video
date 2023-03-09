import React, { Component } from 'react';
import { StyleSheet, NativeModules, UIManager, View, Image, Platform } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import TextTrackType from './TextTrackType';
import FilterType from './FilterType';
import DRMType from './DRMType';
import VideoResizeMode from './VideoResizeMode.js';
import VideoProps from './VideoProps';
import VideoNativeComponent from './schema/VideoNativeComponent';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

const { VideoDecoderProperties } = NativeModules
export { TextTrackType, FilterType, DRMType, VideoDecoderProperties }

export default class Video extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPoster: !!props.poster,
      seek: null,
      fullscreen: false,
      restoreUserInterfaceForPIPStopCompletionHandler: false,
    };
  }

  toTypeString(x) {
    switch (typeof x) {
      case 'object':
        return x instanceof Date
          ? x.toISOString()
          : JSON.stringify(x); // object, null
      case 'undefined':
        return '';
      default: // boolean, number, string
        return x.toString();
    }
  }

  stringsOnlyObject(obj) {
    const strObj = {};

    Object.keys(obj).forEach(x => {
      strObj[x] = this.toTypeString(obj[x]);
    });

    return strObj;
  }

  seek = (time, tolerance = 100) => {
    if (isNaN(time)) {throw new Error('Specified time is not a number');}

    if (Platform.OS === 'ios') {
      this.setState(state => ({ ...state, seek: { time, tolerance, } }));
    } else {
      this.setState(state => ({ ...state, seek: time }));
    }
  };

  presentFullscreenPlayer = () => {
    this.setState(state => ({ ...state, fullscreen: true }));
  };

  dismissFullscreenPlayer = () => {
    this.setState(state => ({ ...state, fullscreen: false }));
  };

  save = async (options?) => {
    return await NativeModules.VideoManager.save(options, this._root);
  }

  restoreUserInterfaceForPictureInPictureStopCompleted = (restored) => {
    this.setState(state => ({ ...state, restoreUserInterfaceForPIPStopCompletionHandler: restored }));
  };

  _assignRoot = (component) => {
    this._root = component;
  };

  _hidePoster = () => {
    if (this.state.showPoster) {
      this.setState(state => ({ ...state, showPoster: false }));
    }
  }

  _onLoadStart = (event) => {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(event.nativeEvent);
    }
  };

  _onPlaybackStateChanged = (event) => {
    if (this.props.onPlaybackStateChanged) {
      this.props.onPlaybackStateChanged(event.nativeEvent);
    }
  };

  _onLoad = (event) => {
    // Need to hide poster here for windows as onReadyForDisplay is not implemented
    if (Platform.OS === 'windows') {
      this._hidePoster();
    }
    if (this.props.onLoad) {
      this.props.onLoad(event.nativeEvent);
    }
  };

  _onAudioTracks = (event) => {
    if (this.props.onAudioTracks) {
      this.props.onAudioTracks(event.nativeEvent);
    }
  };

  _onTextTracks = (event) => {
    if (this.props.onTextTracks) {
      this.props.onTextTracks(event.nativeEvent);
    }
  };

  _onVideoTracks = (event) => {
    if (this.props.onVideoTracks) {
      this.props.onVideoTracks(event.nativeEvent);
    }
  };

  _onError = (event) => {
    if (this.props.onError) {
      this.props.onError(event.nativeEvent);
    }
  };

  _onProgress = (event) => {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent);
    }
  };

  _onBandwidthUpdate = (event) => {
    if (this.props.onBandwidthUpdate) {
      this.props.onBandwidthUpdate(event.nativeEvent);
    }
  };

  _onSeek = (event) => {
    if (this.props.onSeek) {
      this.props.onSeek(event.nativeEvent);
    }
  };

  _onEnd = (event) => {
    if (this.props.onEnd) {
      this.props.onEnd(event.nativeEvent);
    }
  };

  _onTimedMetadata = (event) => {
    if (this.props.onTimedMetadata) {
      this.props.onTimedMetadata(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillPresent = (event) => {
    if (this.props.onFullscreenPlayerWillPresent) {
      this.props.onFullscreenPlayerWillPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidPresent = (event) => {
    if (this.props.onFullscreenPlayerDidPresent) {
      this.props.onFullscreenPlayerDidPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillDismiss = (event) => {
    if (this.props.onFullscreenPlayerWillDismiss) {
      this.props.onFullscreenPlayerWillDismiss(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidDismiss = (event) => {
    if (this.props.onFullscreenPlayerDidDismiss) {
      this.props.onFullscreenPlayerDidDismiss(event.nativeEvent);
    }
  };

  _onReadyForDisplay = (event) => {
    if (!this.props.audioOnly) {
      this._hidePoster();
    }

    if (this.props.onReadyForDisplay) {
      this.props.onReadyForDisplay(event.nativeEvent);
    }
  };

  _onPlaybackStalled = (event) => {
    if (this.props.onPlaybackStalled) {
      this.props.onPlaybackStalled(event.nativeEvent);
    }
  };

  _onPlaybackResume = (event) => {
    if (this.props.onPlaybackResume) {
      this.props.onPlaybackResume(event.nativeEvent);
    }
  };

  _onPlaybackRateChange = (event) => {
    if (this.props.onPlaybackRateChange) {
      this.props.onPlaybackRateChange(event.nativeEvent);
    }
  };

  _onExternalPlaybackChange = (event) => {
    if (this.props.onExternalPlaybackChange) {
      this.props.onExternalPlaybackChange(event.nativeEvent);
    }
  }

  _onAudioBecomingNoisy = () => {
    if (this.props.onAudioBecomingNoisy) {
      this.props.onAudioBecomingNoisy();
    }
  };

  _onPictureInPictureStatusChanged = (event) => {
    if (this.props.onPictureInPictureStatusChanged) {
      this.props.onPictureInPictureStatusChanged(event.nativeEvent);
    }
  };

  _onRestoreUserInterfaceForPictureInPictureStop = (event) => {
    if (this.props.onRestoreUserInterfaceForPictureInPictureStop) {
      this.props.onRestoreUserInterfaceForPictureInPictureStop();
    }
  };

  _onAudioFocusChanged = (event) => {
    if (this.props.onAudioFocusChanged) {
      this.props.onAudioFocusChanged(event.nativeEvent);
    }
  };

  _onBuffer = (event) => {
    if (this.props.onBuffer) {
      this.props.onBuffer(event.nativeEvent);
    }
  };

  _onGetLicense = (event) => {
    if (this.props.drm && this.props.drm.getLicense instanceof Function) {
      const data = event.nativeEvent;
      if (data && data.spcBase64) {
        const getLicenseOverride = this.props.drm.getLicense(data.spcBase64, data.contentId, data.licenseUrl);
        const getLicensePromise = Promise.resolve(getLicenseOverride); // Handles both scenarios, getLicenseOverride being a promise and not.
        getLicensePromise.then((result => {
          if (result !== undefined) {
            NativeModules.VideoManager.setLicenseResult(result, this._root);
          } else {
            NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('Empty license result', this._root);
          }
        })).catch((error) => {
          NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError(error, this._root);
        });
      } else {
        NativeModules.VideoManager.setLicenseError && NativeModules.VideoManager.setLicenseError('No spc received', this._root);
      }
    }
  }

  _onReceiveAdEvent = (event) => {
    if (this.props.onReceiveAdEvent) {
      this.props.onReceiveAdEvent(event.nativeEvent);
    }
  };

  getViewManagerConfig = viewManagerName => {
    if (!UIManager.getViewManagerConfig) {
      return UIManager[viewManagerName];
    }
    return UIManager.getViewManagerConfig(viewManagerName);
  };

  render() {
    const resizeMode = this.props.resizeMode;
    const source = resolveAssetSource(this.props.source) || {};
    const shouldCache = !source.__packager_asset;

    let uri = source.uri || '';
    if (uri && uri.match(/^\//)) {
      uri = `file://${uri}`;
    }

    if (!uri) {
      console.log('Trying to load empty source.');
    }

    const isNetwork = !!(uri && uri.match(/^https?:/i));
    const isAsset = !!(uri && uri.match(/^(assets-library|ph|ipod-library|file|content|ms-appx|ms-appdata):/i));

    if ((uri || uri === '') && !isNetwork && !isAsset) {
      if (this.props.onError) {
        this.props.onError({error: {errorString: 'invalid url, player will stop', errorCode: 'INVALID_URL'}});
      }
    }

    let nativeResizeMode;
    const RCTVideoInstance = this.getViewManagerConfig('RCTVideo');

    if (resizeMode === VideoResizeMode.stretch) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleToFill;
    } else if (resizeMode === VideoResizeMode.contain) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFit;
    } else if (resizeMode === VideoResizeMode.cover) {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleAspectFill;
    } else {
      nativeResizeMode = RCTVideoInstance.Constants.ScaleNone;
    }

    const nativeProps = Object.assign({}, this.props);
    Object.assign(nativeProps, {
      style: [styles.base, nativeProps.style],
      resizeMode: nativeResizeMode,
      src: {
        uri,
        isNetwork,
        isAsset,
        shouldCache,
        type: source.type || '',
        mainVer: source.mainVer || 0,
        patchVer: source.patchVer || 0,
        requestHeaders: source.headers ? this.stringsOnlyObject(source.headers) : {},
        startTime: source.startTime || 0,
        endTime: source.endTime
      },
      seek: this.state.seek,
      fullscreen: this.state.fullscreen,
      restoreUserInterfaceForPIPStopCompletionHandler: this.state.restoreUserInterfaceForPIPStopCompletionHandler,
      onVideoLoadStart: this._onLoadStart,
      onVideoPlaybackStateChanged: this._onPlaybackStateChanged,
      onVideoLoad: this._onLoad,
      onAudioTracks: this._onAudioTracks,
      onTextTracks: this._onTextTracks,
      onVideoTracks: this._onVideoTracks,
      onVideoError: this._onError,
      onVideoProgress: this._onProgress,
      onVideoSeek: this._onSeek,
      onVideoEnd: this._onEnd,
      onVideoBuffer: this._onBuffer,
      onVideoBandwidthUpdate: this._onBandwidthUpdate,
      onTimedMetadata: this._onTimedMetadata,
      onVideoAudioBecomingNoisy: this._onAudioBecomingNoisy,
      onVideoExternalPlaybackChange: this._onExternalPlaybackChange,
      onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
      onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
      onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
      onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
      onReadyForDisplay: this._onReadyForDisplay,
      onPlaybackStalled: this._onPlaybackStalled,
      onPlaybackResume: this._onPlaybackResume,
      onPlaybackRateChange: this._onPlaybackRateChange,
      onAudioFocusChanged: this._onAudioFocusChanged,
      onAudioBecomingNoisy: this._onAudioBecomingNoisy,
      onGetLicense: nativeProps.drm && nativeProps.drm.getLicense && this._onGetLicense,
      onPictureInPictureStatusChanged: this._onPictureInPictureStatusChanged,
      onRestoreUserInterfaceForPictureInPictureStop: this._onRestoreUserInterfaceForPictureInPictureStop,
      onReceiveAdEvent: this._onReceiveAdEvent,
    });

    const posterStyle = {
      ...StyleSheet.absoluteFillObject,
      resizeMode: this.props.posterResizeMode || 'contain',
    };

    return (
      <View style={nativeProps.style}>
        <VideoWithForwardedRef
          ref={this._assignRoot}
          {...nativeProps}
        />
        {this.state.showPoster && (
          <Image style={posterStyle} source={{ uri: this.props.poster }} />
        )}
      </View>
    );
  }
}

Video.propTypes = VideoProps;

const VideoWithForwardedRef = React.forwardRef((props, forwardedRef) => {
  return (
    <VideoNativeComponent
      ref={forwardedRef}
      {...props}
      style={StyleSheet.absoluteFill}
    />
  );
});