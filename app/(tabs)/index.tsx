// app/(tabs)/index.tsx
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.container}>
      <Text style={styles.title}>MEAL</Text>
      <Text style={styles.title}>UP</Text>

      <Image source={require('../../assets/images/meal-up-logo.png')} style={styles.logo} />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/recipes')}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <Text style={styles.slogan}>Descubra, prepare, saboreie</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 72, color: 'white', letterSpacing: 4 },
  logo: { width: 160, height: 160, marginVertical: 30 },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: { color: '#ff7e5f', fontWeight: '600', fontSize: 16 },
  slogan: {
    position: 'absolute',
    bottom: 40,
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
});
