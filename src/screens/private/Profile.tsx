import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container, Text } from '@components/index';
import { ThemeToggle } from '@components/organisms';
import { LogOut } from 'lucide-react-native';
import { useLogout } from '@hooks/useAuth';
import { useTheme } from '@contexts/index';

export default function Profile() {
  const { theme } = useTheme();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container padding="none">
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text variant="title-xxl">Profile</Text>
          <View style={styles.headerActions}>
            <ThemeToggle size="small" />
            <TouchableOpacity
              onPress={handleLogout}
              disabled={isPending}
              style={[styles.iconButton, { backgroundColor: theme.colors.surfaceSecondary }]}
            >
              <LogOut color={theme.colors.danger} size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          {/* Aquí puedes agregar más contenido del perfil */}
        </View>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
