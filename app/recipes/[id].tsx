import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
};

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setMeal(data.meals?.[0] || null);
      } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipeDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!meal) {
    return (
      <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Receita não encontrada.</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.meta}>Categoria: {meal.strCategory} | Origem: {meal.strArea}</Text>
        <Text style={styles.section}>Instruções</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  meta: {
    fontSize: 14,
    marginBottom: 16,
    color: '#fff',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#fff',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
  },
});
