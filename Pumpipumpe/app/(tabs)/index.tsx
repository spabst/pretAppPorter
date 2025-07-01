import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TextInput, View, Alert } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { mockApi } from '@/services/mockApi';
import { Item } from '@/types';

export default function BrowseScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getItems();
      setItems(data);
    } catch {
      Alert.alert('Error', 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const data = await mockApi.searchItems(query);
      setItems(data);
    } catch {
      Alert.alert('Error', 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <ThemedView style={styles.itemCard}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <ThemedText type="subtitle" style={styles.itemTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <ThemedText style={styles.itemOwner}>by {item.owner.name}</ThemedText>
        <View style={styles.itemMeta}>
          <ThemedText style={[styles.categoryTag, { backgroundColor: '#e3f2fd' }]}>
            {item.category}
          </ThemedText>
          <ThemedText style={[styles.statusTag, item.isAvailable ? styles.available : styles.unavailable]}>
            {item.isAvailable ? 'Available' : 'Not Available'}
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Browse Items</ThemedText>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
        />
      </ThemedView>

      {loading ? (
        <ThemedView style={styles.centered}>
          <ThemedText>Loading items...</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 16,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemOwner: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryTag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    color: '#1976d2',
  },
  statusTag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  available: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },
  unavailable: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
