import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, TouchableHighlight, Image, View } from 'react-native'

class Stepper extends Component {
  constructor() {
    super();
    this.state = {
      value: this.props.initValue,
      hasReachedMinValue: false,
      hasReachedMaxValue: false,
    };
  }

  render() {
    return (
      <View>
        <Text>Oi: {this.state.value}</Text>
      </View>
    );
  }

}

Stepper.propTypes = {
    // Min value, if null is unlimited
    minValue: React.PropTypes.number,
    // Max value, if null is unlimited
    maxValue: React.PropTypes.number,
    // Initial value
    initValue: React.PropTypes.number,
    // Step value
    stepValue: React.PropTypes.number,
};
