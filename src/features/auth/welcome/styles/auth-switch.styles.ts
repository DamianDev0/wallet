import { lightColors } from '@theme/index';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
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
    backgroundColor: lightColors.primary
  },


  activeText: {
    color: '#FFF',
  },
});
