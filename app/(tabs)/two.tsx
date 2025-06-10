// app/(tabs)/two.tsx
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.container}>
      <Image source={require('../../assets/images/meal-up-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sobre</Text>
      <Text style={styles.text}>
    O MealUp é um aplicativo de receitas que permite ao usuário explorar diversas opções culinárias de forma prática e intuitiva.</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  text: { color: 'white', fontSize: 16, textAlign: 'center' },
});
