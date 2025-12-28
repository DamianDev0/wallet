import { StyleSheet } from 'react-native';

export const createAuthSwitchStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 14,
    padding: 4,
  },

  item: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  active: {
    backgroundColor: theme.colors.primary,
  },

  activeText: {
    color: theme.colors.primaryText,
  },
});
