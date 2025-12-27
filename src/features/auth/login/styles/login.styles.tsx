import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 180,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
  },
  placeholderEmoji: {
    fontSize: 80,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  divider: {
    textAlign: 'center',
    opacity: 0.5,
    marginVertical: 8,
  },
  googleIcon: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
