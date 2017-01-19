import React, { Component, PropTypes } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'

class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initValue, //this.props.initValue
      hasReachedMinValue: false,
      hasReachedMaxValue: false,
    };

    this.timer = null;

    this.validateInitValueAgainstMaxValue(props.initValue, props.maxValue);
    this.validateInitValueAgainstMinValue(props.initValue, props.minValue);
    if (!props.ignoreMaxValidation) {
        this.validateRangeMaxValue(props.initValue, props.stepValue, props.maxValue);
    }
    if (!props.ignoreMinValidation) {
        this.validateRangeMinValue(props.initValue, props.stepValue, props.minValue);
    }
  }

  // Checks if initValue are lower than maxValue
  validateInitValueAgainstMaxValue(initValue, maxValue) {
    if (maxValue !== null && initValue > maxValue) {
      throw 'The initital value can\'t be higher than max value';
    }
    return true;
  }

  // Checks if minValue are lower than maxValue
  validateInitValueAgainstMinValue(initValue, minValue) {
    if (minValue !== null && initValue < minValue) {
      throw 'The initital value can\'t be lower than min value';
    }
    return true;
  }

  // Checks if range between initalValue and MaxValue are valids
  validateRangeMaxValue(initValue, stepValue, maxValue) {
    if (maxValue !== null && (((maxValue - initValue) % stepValue) !== 0)) {
      throw 'The initital value or step value are not valids with this max value';
    }
    return true;
  }

  // Checks if range between initalValue and MinValue are valids
  validateRangeMinValue(initValue, stepValue, minValue) {
    if (minValue !== null && (((initValue - minValue) % stepValue) !== 0)) {
      throw 'The initital value or step value are not valids with this min value';
    }
    return true;
  }

  // Check if reached max value
  hasReachedMaxValue(value) {
    if (this.props.maxValue === null) {
      return false;
    }

    return (value === this.props.maxValue);
  }

  // Check if reached min value
  hasReachedMinValue(value) {
    if (this.props.minValue === null) {
      return false;
    }

    return (value === this.props.minValue);
  }

  // Increase value
  increase(stepValue) {
    const { state } = this;

    if (this.hasReachedMaxValue(state.value)) {
      this.stopTimeInterval();

      return this.handleMessage(this.props.maxMessage);
    }
    const currentValue = state.value + stepValue;

    this.setState({ ...state, value: currentValue });
    this.valueChanged(currentValue);
  }

  // Handle max message
  handleMessage(message) {
    if (typeof message === 'string') {
      return Alert.alert(message);
    }

    if (typeof message === 'function') {
      return message();
    }

    return false;
  }

  // Decrease value
  decrease(stepValue) {
    const { state } = this;
    if (this.hasReachedMinValue(state.value)) {
      this.stopTimeInterval();

      return this.handleMessage(this.props.maxMessage);
    }
    const currentValue = state.value - stepValue;
    this.setState({ ...state, value: currentValue });
    this.valueChanged(currentValue);
  }

  // On press increase button
  onPressIncreaseButton() {
    this.increase(this.props.stepValue);
  }
  // When users press and hold the button
  // Todo: speed up when is a long press
  onPressInIncreaseButton() {
    this.timer = setInterval(
      () => {
        if (!this.hasReachedMaxValue(this.state.value)) {
          this.increase(this.props.stepValue);
        }
      }, 50);
  }


  // On press decrease button
  onPressDecreaseButton() {
    this.decrease(this.props.stepValue);
  }
    // On press decrease button and hold
  onPressInDecreaseButton() {
    this.timer = setInterval(
      () => {
        if (!this.hasReachedMinValue(this.state.value)) {
          this.decrease(this.props.stepValue);
        }
      }, 50);
  }

  // Stops time interval
  stopTimeInterval() {
    clearInterval(this.timer);
  }

  onPressOutButton() {
    this.stopTimeInterval();
  }

  // Value changed: use this function to get value
  valueChanged(value) {
    if (this.props.valueChanged) {
      this.props.valueChanged(value);
    }
  }

  render() {
    const { containerStyle, decreaseButtonStyle, increaseButtonStyle } = this.props.style;

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          style={decreaseButtonStyle}
          onPress={this.onPressDecreaseButton.bind(this)}
          // onPressIn={this.onPressInDecreaseButton.bind(this)}
          // onPressOut={this.onPressOutButton.bind(this)}
        >{this.props.decreaseComponent}</TouchableOpacity>
        {/* <Text>Oi: {this.state.value}</Text> */}
        <TouchableOpacity
          style={increaseButtonStyle}
          onPress={this.onPressIncreaseButton.bind(this)}
          // onPressIn={this.onPressInIncreaseButton.bind(this)}
          // onPressOut={this.onPressOutButton.bind(this)}
        >{this.props.increaseComponent}</TouchableOpacity>
      </View>
    );
  }

}

// Default props values
Stepper.defaultProps = {
  // Scheleton of style
  style: StyleSheet.create({
    containerStyle: {
    },
    decreaseButtonStyle: {
    },
    increaseButtonStyle: {
    }
  }),
  initValue: 0,
  minValue: null,
  maxValue: null,
  stepValue: 1,
  ignoreMinValidation: false,
  ignoreMaxValidation: false,
  valueChanged: null,
  decreaseComponent: (<Text>-</Text>),
  increaseComponent: (<Text>+</Text>),
  minMessage: null,
  maxMessage: null
};

// PropTypes definitions
Stepper.propTypes = {
  // Initial value
  initValue: PropTypes.number,
  // Min value, if null is unlimited
  minValue: PropTypes.number,
  // Max value, if null is unlimited
  maxValue: PropTypes.number,

  // Step value
  stepValue: PropTypes.number,
  ignoreMinValidation: PropTypes.bool,
  ignoreMaxValidation: PropTypes.bool,
  valueChanged: PropTypes.func.isRequired,
  decreaseComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.instanceOf(Object),
  ]),
  increaseComponent: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.instanceOf(Object),
  ]),
  style: PropTypes.instanceOf(Object).isRequired,

  minMessage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  maxMessage: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ])
};

export default Stepper;
