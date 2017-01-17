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

    this.validateInitValueAgainstMaxValue(props.initValue, props.maxValue);
    this.validateInitValueAgainstMinValue(props.initValue, props.minValue);
    if(!props.ignoreMaxValidation) {
        this.validateRangeMaxValue(props.initValue, props.stepValue, props.maxValue);
    }
    if(!props.ignoreMinValidation) {
        this.validateRangeMinValue(props.initValue, props.stepValue, props.minValue);
    }
  }

  // Checks if initValue are lower than maxValue
  validateInitValueAgainstMaxValue(initValue, maxValue) {
    if(maxValue !== null && initValue > maxValue) {
      throw "The initital value can't be higher than max value";
    }
    return true;
  }

  // Checks if minValue are lower than maxValue
  validateInitValueAgainstMinValue(initValue, minValue) {
    if(minValue !== null && initValue < minValue) {
      throw "The initital value can't be lower than min value";
    }
    return true;
  }

  // Checks if range between initalValue and MaxValue are valids
  validateRangeMaxValue(initValue, stepValue, maxValue) {
    if(maxValue !== null && (((maxValue - initValue) % stepValue) !== 0)) {
      throw "The initital value or step value are not valids with this max value";
    }
    return true;
  }

  // Checks if range between initalValue and MinValue are valids
  validateRangeMinValue(initValue, stepValue, minValue) {
    if(minValue !== null && (((initValue - minValue) % stepValue) !== 0)) {
      throw "The initital value or step value are not valids with this min value";
    }
    return true;
  }

  // Check if reached max value
  hasReachedMaxValue(value) {
    if(this.props.maxValue === null) {
      return false;
    }

    return (value > this.props.maxValue);
  }

  // Check if reached min value
  hasReachedMinValue(value) {
    if(this.props.minValue === null) {
      return false;
    }

    return (value < this.props.minValue);
  }


  // Increase value
  increase(stepValue) {
    const { state } = this;
    const currentValue = state.value + stepValue;
    if(this.hasReachedMaxValue(currentValue)) {
      // fire alert function passed by
      return Alert.alert('Máximo atingido');
    }

    this.setState({...state, value:currentValue});
    this.valueChanged(currentValue);
  }

  // Deacrease value
  decrease(stepValue) {
    const { state } = this;
    const currentValue = state.value - stepValue;
    if(this.hasReachedMinValue(currentValue)) {
      // fire alert function passed by
      return Alert.alert('Minimo atingido');
    }
    this.setState({...state, value: currentValue});
    this.valueChanged(currentValue);
  }

  // On press increase button
  onPressIncreaseButton() {
    this.increase(this.props.stepValue);
  }

  // On press decrease button
  onPressDecreaseButton() {
    this.decrease(this.props.stepValue);
  }

  // Value changed: use this function to get value
  valueChanged(value) {
    if (this.props.valueChanged) {
      this.props.valueChanged(value)
    }
  }

  render() {
    const { containerStyle, deacreaseButtonStyle, increaseButtonStyle } = this.props.style;

    return (
      <View style={containerStyle}>
        <TouchableOpacity style={deacreaseButtonStyle} onPress={this.onPressDecreaseButton.bind(this)}>{this.props.decreaseComponent}</TouchableOpacity>
        {/* <Text>Oi: {this.state.value}</Text> */}
        <TouchableOpacity style={increaseButtonStyle} onPress={this.onPressIncreaseButton.bind(this)}>{this.props.increaseComponent}</TouchableOpacity>
      </View>
    );
  }

}

// Default style
// const styles = StyleSheet.create({
//   containerStyle: {
//     backgroundColor: 'white',
//     flexDirection: 'row'
//   },
//   deacreaseButtonStyle: {
//     padding: 0,
//     borderWidth: 2,
//     borderColor: 'red',
//     borderTopLeftRadius: 4,
//     borderBottomLeftRadius: 4
//   },
//   increaseButtonStyle: {
//     padding: 0,
//     borderWidth: 2,
//     borderColor: 'red',
//     borderTopRightRadius: 4,
//     borderBottomRightRadius: 4
//   }
// });

// Default props values
Stepper.defaultProps = {
  initValue: 0,
  minValue: null,
  maxValue: null,
  ignoreMinValidation: false,
  ignoreMaxValidation: false,
  valueChanged: null,
  decreaseComponent: (<Text>-</Text>),
  increaseComponent: (<Text>+</Text>)
};

// PropTypes definitions
Stepper.propTypes = {
    // Min value, if null is unlimited
    minValue: React.PropTypes.number,
    // Max value, if null is unlimited
    maxValue: React.PropTypes.number,
    // Initial value
    initValue: React.PropTypes.number.isRequired,
    // Step value
    stepValue: React.PropTypes.number.isRequired,
    ignoreMinValidation: React.PropTypes.bool,
    ignoreMaxValidation: React.PropTypes.bool,
    valueChanged: React.PropTypes.func,
    decreaseComponent:  React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Component),
      React.PropTypes.instanceOf(Object),
    ]),
    style: React.PropTypes.instanceOf(Object)
};

export default Stepper;
