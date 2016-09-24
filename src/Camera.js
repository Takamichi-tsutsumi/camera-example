/**
 * Created by tutty on 2016/09/24.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import Camera from 'react-native-camera';
import Video from 'react-native-video';

class VideoCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      camera: {
        type: "back",
        flashMode: Camera.constants.FlashMode.auto
      },
      isRecording: false,
      commentText: "府中本町",
      videoPath: null,
      recorded: false
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

    this.switchType = this.switchType.bind(this);
    this.switchFlashMode = this.switchFlashMode.bind(this);

    this.renderVideo = this.renderVideo.bind(this);
    this.renderCamera = this.renderCamera.bind(this);
  }

  startRecording() {
    console.log("Onocame: start recording");

    this.camera.capture()
      .then(function(data) {
        this.setState({
          videoPath: data.path,
          isRecording: false,
          recorded: true
        });
        console.log(data.path);
      }.bind(this))
      .catch((err) => {
        console.error(err)
      });

    this.setState({
      isRecording: true
    });

    setTimeout(this.stopRecording, 3000);
  }

  stopRecording() {
    if (this.camera) {
      console.log("Onocame: stop recording");
      this.camera.stopCapture();
    }
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if ( this.state.camera.type === back ) {
      newType = front;
    } else if ( this.state.camera.type === front ) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      }
    });
  }

  switchFlashMode() {
    let newMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if ( this.state.camera.flashMode === auto ) {
      newMode = on;
    } else if ( this.state.camera.type === on ) {
      newMode = off;
    } else if ( this.state.camera.type === off ) {
      newMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newMode
      }
    });
  }


  renderCamera() {
    return <Camera
      ref={(cam) => {
            this.camera = cam;
          }}
      style={ styles.preview }
      aspect={ Camera.constants.Aspect.fill }
      captureQuality="middle"
      captureTarget={ Camera.constants.CaptureTarget.CameraRoll }
      captureMode={ Camera.constants.CaptureMode.video }
      type={ this.state.camera.type }
      flashMode={ this.state.camera.flashMode }
    >
     {
        this.state.isRecording ?
          <Text style={ styles.capture }>Recording</Text>
          : <Text style={ styles.capture } onPress={this.startRecording.bind(this)}>Rec</Text>
      }
    </Camera>
  }

  renderVideo() {
    return <View style={ styles.container }>
      <Video
        source={{ uri: this.state.videoPath }}
        repeat={ true }
        style={ styles.background }
      />
      <View style={ styles.backdropView }>
        <Text style={ styles.overlayText} value="abc">{ this.state.commentText }</Text>
      </View>
    </View>

  }

  render() {
    return (
      <View style={ styles.container }>
        {
          this.state.recorded ?
            this.renderVideo() :
            this.renderCamera()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 10,
    margin: 40
  },

  backdropView: {
    backgroundColor: "rgba(0,0,0,0)",
    width: 25,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: 10
  },

  overlayText: {
    flex: 0,
    color: "#fff",
    fontSize: 24
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default VideoCamera;
