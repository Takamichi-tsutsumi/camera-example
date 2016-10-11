import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Animated,
  PanResponder,
  Easing,
  Dimensions
} from 'react-native';

export class DraggableInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      value: ''
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        })
      },
      onPanResponderMove: Animated.event([ null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
      }
    })
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        position: 'absolute',
        height: Dimensions.get('window').height / 2 - 30,
        width: Dimensions.get('window').width / 2 - 30
      },
      animated: {
        backgroundColor: 'rgba(0,0,0,0)',
        height: 90,
        width: 300
      }
    })

    let { pan } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let animatedStyle = {
      transform: [{translateX}, {translateY}]
    };

    return(
      <View style={ styles.container }>
        <Animated.View
          style={ [styles.animated, animatedStyle] }
          { ...this._panResponder.panHandlers }>
          <Text style={ this.props.inputStyle }>
            { this.props.text }
          </Text>
          {/* <TextInput
            style={ this.props.inputStyle }
            placeholder='キャッチフレーズ'
            placeholderTextColor={ this.props.placeholderTextColor }
            onChangeText={ input => { this.setState({value: input})} }
            value={ this.state.value }
          /> */}
        </Animated.View>
      </View>
    )
  }
}
