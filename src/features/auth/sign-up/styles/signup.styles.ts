import { height, width } from '@utils/dimensios';
import { StyleSheet } from 'react-native';


export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  welcomeTextContainer: {
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.06,
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.015,
  },

  image: {
    width: width * 0.9,
    height: '100%',
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.01,
    paddingBottom: height * 0.035,
  },

  form: {
    width: '100%',
    gap: 10,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  dividerText: {
    marginHorizontal: width * 0.03,
    opacity: 0.5,
  },

  loginTextContainer: {
    alignItems: 'center',
    marginTop: height * 0.015,
  },

  loginText: {
    textAlign: 'center',
  },
});
