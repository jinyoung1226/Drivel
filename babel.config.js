module.exports = {
  presets: [['module:@react-native/babel-preset', {loose: true}]],
  plugins: [
    ['@babel/plugin-transform-private-methods', {loose: true}],
    'react-native-reanimated/plugin',
  ],
};
