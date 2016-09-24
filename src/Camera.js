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


class VideoCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      commentText: "府中本町",
      videoPath: null
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  startRecording() {
    console.log("Onocame: start recording video");

    this.camera.capture()
      .then(function(data) {
        this.setState({
          videoPath: data.path,
          isRecording: false
        });
        console.log(data.path);
      }.bind(this))
      .catch((err) => {
        console.error(err)
      });

    this.setState({
      isRecording: true
    });

    setTimeout(this.stopRecording, 600);
  }

  stopRecording() {
    if (this.camera) {
      console.log("Onocame: stop recording");
      this.camera.stopCapture();
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={ styles.preview }
          aspect={ Camera.constants.Aspect.fill }
          captureQuality="middle"
          captureTarget={ Camera.constants.CaptureTarget.temp }
          captureMode={ Camera.constants.CaptureMode.video }
          type="back"
          flashMode={ Camera.constants.FlashMode.on }
        >
          <View style={ styles.backdropView }>
            <Text style={ styles.overlayText} value="abc">{ this.state.commentText }</Text>
          </View>
          {
            this.state.isRecording ?
              <Text style={ styles.capture }>Recording...</Text>
              : <Text style={ styles.capture } onPress={this.startRecording.bind(this)}>Rec</Text>
          }
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginRight: 10
  },

  overlayText: {
    flex: 0,
    color: "#fff",
    fontSize: 24,
    borderColor: "#fff"
  }
});

export default VideoCamera;
