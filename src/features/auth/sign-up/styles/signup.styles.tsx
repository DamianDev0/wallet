import { StyleSheet } from 'react-native';

export const signupStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
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
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
