import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchRecipes = async (query = 'chicken') => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          placeholder="Buscar receita"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchRecipes(search)}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/recipes/${item.idMeal}` as const)} style={styles.card}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.name}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#ffffffcc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});
