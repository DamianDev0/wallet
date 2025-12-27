import { width, height } from '@utils/dimensios';
import { StyleSheet } from 'react-native';

export const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06, 
  },

  welcomeTextContainer: {
    marginTop: height * 0.07, 
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: width,
    height: height * 0.4, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.03,
  },

  image: {
    width: width * 0.85, 
    height: '100%',
    resizeMode: 'contain',
  },


  textContainer: {
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },

  title: {
    fontSize: width * 0.075,
    marginBottom: height * 0.015,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: width * 0.04, 
    textAlign: 'center',
    opacity: 0.6,
    lineHeight: height * 0.03,
  },

  bottomActions: {
    paddingBottom: height * 0.03,
    gap: height * 0.015,
  },
});
