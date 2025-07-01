import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Alert, Modal, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockApi } from '@/services/mockApi';
import { Item, ItemCategory, ItemCondition } from '@/types';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function MyItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const insets = useSafeAreaInsets();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.OTHER);
  const [condition, setCondition] = useState<ItemCondition>(ItemCondition.GOOD);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    loadUserItems();
  }, []);

  // Reload items when screen comes into focus (after adding new item)
  useFocusEffect(
    React.useCallback(() => {
      loadUserItems();
    }, [])
  );

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
    router.push('/add-item');
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
    <TouchableOpacity style={[styles.itemCard, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <ThemedText style={[styles.itemTitle, { color: colors.text }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.itemOwner, { color: gray[500] }]}>Da te</ThemedText>
        <View style={styles.itemMeta}>
          <View style={[styles.statusBadge, item.isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
            <ThemedText style={[styles.statusText, { color: item.isAvailable ? '#22C55E' : '#EF4444' }]}>
              {item.isAvailable ? 'Disponibile' : 'Non disponibile'}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
          <IconSymbol name="pencil" size={20} color={gray[500]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item)} style={styles.actionButton}>
          <IconSymbol name="trash" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.title, { color: colors.text }]}>I Miei Oggetti</ThemedText>
        <TouchableOpacity onPress={openAddModal} style={[styles.addButton, { backgroundColor: colors.primary }]}>
          <IconSymbol name="plus" size={20} color="white" />
          <ThemedText style={styles.addButtonText}>Aggiungi</ThemedText>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ThemedText style={{ color: colors.text }}>Caricamento...</ThemedText>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
            <IconSymbol name="plus.circle.fill" size={64} color={gray[300]} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>Nessun oggetto</ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: gray[500] }]}>
              Aggiungi il tuo primo oggetto per iniziare a condividere!
            </ThemedText>
            <TouchableOpacity 
              onPress={() => router.push('/add-item')} 
              style={[styles.emptyButton, { backgroundColor: colors.primary }]}
            >
              <ThemedText style={styles.emptyButtonText}>Aggiungi Oggetto</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
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
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <ThemedText style={[styles.cancelButton, { color: gray[500] }]}>Annulla</ThemedText>
            </TouchableOpacity>
            <ThemedText style={[styles.modalTitle, { color: colors.text }]}>
              {editingItem ? 'Modifica Oggetto' : 'Aggiungi Oggetto'}
            </ThemedText>
            <TouchableOpacity onPress={handleSave}>
              <ThemedText style={[styles.saveButton, { color: colors.primary }]}>Salva</ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>Titolo</ThemedText>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={title}
              onChangeText={setTitle}
              placeholder="Cosa stai condividendo?"
              placeholderTextColor={gray[400]}
            />

            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>Descrizione</ThemedText>
            <TextInput
              style={[styles.textInput, styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Descrivi il tuo oggetto..."
              placeholderTextColor={gray[400]}
              multiline
              numberOfLines={4}
            />

            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>Categoria</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {Object.values(ItemCategory).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryButton, 
                    { backgroundColor: gray[100] },
                    category === cat && { backgroundColor: colors.primary }
                  ]}
                >
                  <ThemedText style={[
                    styles.categoryText, 
                    { color: colors.text },
                    category === cat && { color: 'white' }
                  ]}>
                    {cat.replace('_', ' ')}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>Condizioni</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {Object.values(ItemCondition).map((cond) => (
                <TouchableOpacity
                  key={cond}
                  onPress={() => setCondition(cond)}
                  style={[
                    styles.categoryButton, 
                    { backgroundColor: gray[100] },
                    condition === cond && { backgroundColor: colors.primary }
                  ]}
                >
                  <ThemedText style={[
                    styles.categoryText, 
                    { color: colors.text },
                    condition === cond && { color: 'white' }
                  ]}>
                    {cond.replace('_', ' ')}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setIsAvailable(!isAvailable)}
              style={styles.availabilityToggle}
            >
              <ThemedText style={{ color: colors.text }}>Disponibile per il prestito</ThemedText>
              <View style={[styles.toggle, isAvailable && styles.toggleActive]}>
                {isAvailable && <IconSymbol name="checkmark" size={16} color="white" />}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F1F5F9',
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemOwner: {
    fontSize: 14,
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  availableBadge: {
    backgroundColor: '#F0FDF4',
  },
  unavailableBadge: {
    backgroundColor: '#FEF2F2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContainer: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    fontSize: 16,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
  },
  categoryText: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '500',
  },
  availabilityToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  toggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#22C55E',
  },
});