import { height, width } from '@utils/dimensios';
import { StyleSheet } from 'react-native';


export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeTextContainer: {
    marginTop: height * 0.04,
    paddingHorizontal: width * 0.06,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height * 0.01,
  },
  imageContainer: {
    width: width * 1,
    height: height * 0.36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 2,
    height: '100%',
  },
  formContainer: {
    width: width * 1,
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.03,
    paddingBottom: height * 0.04,
  },
  form: {
    width: '100%',
    gap: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.005,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    marginHorizontal: width * 0.03,
    opacity: 0.5,
  },
  signUpTextContainer: {
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  signUpText: {
    textAlign: 'center',
  },
  footer: {
    paddingBottom: 0,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
