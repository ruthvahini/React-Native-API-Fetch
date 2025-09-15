import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// ----------------------
// API List Screen
// ----------------------
function PostListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);   // state to store posts
  const [loading, setLoading] = useState(true); // state for loading

  // Fetch posts when component loads
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts List</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate('Details', { post: item })}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ----------------------
// Details Screen
// ----------------------
function PostDetailsScreen({ route }) {
  const { post } = route.params; // receive post passed from list
  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.body}</Text>
    </View>
  );
}

// ----------------------
// App Navigation
// ----------------------
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen name="Posts" component={PostListScreen} />
        <Stack.Screen name="Details" component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  postItem: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
