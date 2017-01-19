## react-native-simple-stepper

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-simple-stepper.svg)](https://www.npmjs.com/package/react-native-stepper)
[![npm version](http://img.shields.io/npm/dm/react-native-stepper.svg)](https://www.npmjs.com/package/react-native-stepper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/peteleco/react-native-stepper/master/LICENSE)


A super simple react-native stepper implementation. Check out the props below for customization.

This package was inspired in [react-native-simple-stepper](https://github.com/devBrian/react-native-simple-stepper) develop by [Brian](https://github.com/devBrian).

### Motivation

This is my first package with react-native and i need a stepper implementation that i could use any type of component as a stepper button.

### Installation
```npm i react-native-stepper --save```

### Usage
```javascript
import Stepper from 'react-native-stepper'
//...
render() {
  return (
      //...
      <Stepper
        initValue={duration}
        minValue={0}
        stepValue={1}
        // style={stepperStyle}
        // decreaseComponent={(<Icon family="Ionicons" name="remove" style={stepperStyle.iconStyle} />)}
        // increaseComponent={(<Icon family="Ionicons" name="add" style={stepperStyle.iconStyle} />)}
        valueChanged={(value) => this.onChangeDurationFilter(value)}
      />
      //...
  )
}
onChangeDurationFilter(value) {
  // ... update your app state here
}
//...
```
