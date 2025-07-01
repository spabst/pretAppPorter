import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert, Modal, TextInput, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockApi } from '@/services/mockApi';
import { Item, ItemCategory, ItemCondition } from '@/types';

export default function MyItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.OTHER);
  const [condition, setCondition] = useState<ItemCondition>(ItemCondition.GOOD);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    loadUserItems();
  }, []);

  const loadUserItems = async () => {
    try {
      setLoading(true);
      const user = await mockApi.getCurrentUser();
      const data = await mockApi.getUserItems(user.id);
      setItems(data);
    } catch {
      Alert.alert('Error', 'Failed to load your items');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (item: Item) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setCondition(item.condition);
    setIsAvailable(item.isAvailable);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory(ItemCategory.OTHER);
    setCondition(ItemCondition.GOOD);
    setIsAvailable(true);
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    try {
      const itemData = {
        title: title.trim(),
        description: description.trim(),
        category,
        condition,
        isAvailable,
        images: ['https://via.placeholder.com/300x300?text=' + encodeURIComponent(title)],
        tags: []
      };

      if (editingItem) {
        await mockApi.updateItem(editingItem.id, itemData);
      } else {
        await mockApi.createItem(itemData);
      }

      setShowAddModal(false);
      resetForm();
      loadUserItems();
      Alert.alert('Success', editingItem ? 'Item updated!' : 'Item added!');
    } catch {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const handleDelete = (item: Item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await mockApi.deleteItem(item.id);
              loadUserItems();
              Alert.alert('Success', 'Item deleted');
            } catch {
              Alert.alert('Error', 'Failed to delete item');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <ThemedView style={styles.itemCard}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <ThemedText type="subtitle" style={styles.itemTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <View style={styles.itemMeta}>
          <ThemedText style={[styles.categoryTag, { backgroundColor: '#e3f2fd' }]}>
            {item.category}
          </ThemedText>
          <ThemedText style={[styles.statusTag, item.isAvailable ? styles.available : styles.unavailable]}>
            {item.isAvailable ? 'Available' : 'Not Available'}
          </ThemedText>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
          <IconSymbol name="pencil" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionButton}>
          <IconSymbol name="trash" size={20} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>My Items</ThemedText>
        <TouchableOpacity onPress={openAddModal} style={styles.addButton}>
          <IconSymbol name="plus" size={24} color="#fff" />
          <ThemedText style={styles.addButtonText}>Add Item</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {loading ? (
        <ThemedView style={styles.centered}>
          <ThemedText>Loading your items...</ThemedText>
        </ThemedView>
      ) : items.length === 0 ? (
        <ThemedView style={styles.centered}>
          <ThemedText style={styles.emptyText}>No items yet</ThemedText>
          <ThemedText style={styles.emptySubtext}>Add your first item to start sharing!</ThemedText>
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

      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
            </TouchableOpacity>
            <ThemedText type="subtitle">{editingItem ? 'Edit Item' : 'Add Item'}</ThemedText>
            <TouchableOpacity onPress={handleSave}>
              <ThemedText style={styles.saveButton}>Save</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <ScrollView style={styles.modalContent}>
            <ThemedText style={styles.fieldLabel}>Title</ThemedText>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="What are you sharing?"
            />

            <ThemedText style={styles.fieldLabel}>Description</ThemedText>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your item..."
              multiline
              numberOfLines={4}
            />

            <ThemedText style={styles.fieldLabel}>Category</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {Object.values(ItemCategory).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[styles.categoryButton, category === cat && styles.selectedCategory]}
                >
                  <ThemedText style={[styles.categoryText, category === cat && styles.selectedCategoryText]}>
                    {cat.replace('_', ' ')}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ThemedText style={styles.fieldLabel}>Condition</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {Object.values(ItemCondition).map((cond) => (
                <TouchableOpacity
                  key={cond}
                  onPress={() => setCondition(cond)}
                  style={[styles.categoryButton, condition === cond && styles.selectedCategory]}
                >
                  <ThemedText style={[styles.categoryText, condition === cond && styles.selectedCategoryText]}>
                    {cond.replace('_', ' ')}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsAvailable(!isAvailable)}
              style={styles.availabilityToggle}
            >
              <ThemedText>Available for borrowing</ThemedText>
              <ThemedText style={[styles.toggle, isAvailable && styles.toggleActive]}>
                {isAvailable ? '✓' : '○'}
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
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
    width: 80,
    height: 80,
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
  itemActions: {
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cancelButton: {
    color: '#666',
  },
  saveButton: {
    color: '#2196f3',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#2196f3',
  },
  categoryText: {
    textTransform: 'capitalize',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  availabilityToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  toggle: {
    fontSize: 20,
    color: '#ccc',
  },
  toggleActive: {
    color: '#4caf50',
  },
});