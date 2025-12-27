module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@theme': './src/themes',
          '@types': './src/types',
          '@features': './src/features',
          '@interfaces': './src/interfaces',
          '@contexts': './src/contexts',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
