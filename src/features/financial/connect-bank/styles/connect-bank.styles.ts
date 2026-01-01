import { StyleSheet } from 'react-native';

export const connectBankStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    opacity: 0.7,
    lineHeight: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 280,
    height: 280,
  },
  benefitsContainer: {
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  benefitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitText: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  skipButton: {
    opacity: 0.6,
  },
  widgetContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  widgetHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  widgetContent: {
    flex: 1,
  },
});
