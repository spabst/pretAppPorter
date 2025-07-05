import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Modal, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router, useFocusEffect } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Toast } from '@/components/Toast';
import { supabaseApi } from '@/services/supabaseApi';
import { Item, ItemCategory, ItemCondition } from '@/types';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContextV2';

export default function MyItemsScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [user, setUser] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.OTHER);
  const [condition, setCondition] = useState<ItemCondition>(ItemCondition.GOOD);
  const [isAvailable, setIsAvailable] = useState(true);

  const loadUserItems = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await supabaseApi.getCurrentUser();
      
      if (!currentUser) {
        console.log('No authenticated user found');
        setUser(null);
        setItems([]);
        return;
      }
      
      setUser(currentUser);
      console.log('Loading items for user:', currentUser.id);
      const data = await supabaseApi.getUserItems(currentUser.id);
      console.log('Loaded items:', data);
      setItems(data);
    } catch (error) {
      console.error('Error loading user items:', error);
      setToastMessage('Failed to load your items');
      setToastType('error');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserItems();
  }, [loadUserItems]);

  // Reload items when screen comes into focus (after adding new item)
  useFocusEffect(
    React.useCallback(() => {
      loadUserItems();
    }, [loadUserItems])
  );

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
      setToastMessage('Please enter a title');
      setToastType('error');
      setShowToast(true);
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
        await supabaseApi.updateItem(editingItem.id, itemData);
      } else {
        await supabaseApi.createItem(itemData);
      }

      setShowAddModal(false);
      resetForm();
      loadUserItems();
      setToastMessage(editingItem ? t('success.item_updated') : t('success.item_added'));
      setToastType('success');
      setShowToast(true);
    } catch {
      setToastMessage(editingItem ? t('error.update_failed') : 'Failed to save item');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleDelete = (item: Item) => {
    console.log('Delete button tapped for item:', item.title, item.id);
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    console.log('Delete confirmed, starting deletion...');
    setIsDeleting(itemToDelete.id);
    setShowDeleteModal(false);
    
    try {
      console.log('Calling supabaseApi.deleteItem with id:', itemToDelete.id);
      const result = await supabaseApi.deleteItem(itemToDelete.id);
      console.log('Delete result:', result);
      
      if (result === false) {
        throw new Error('Delete returned false');
      }
      
      console.log('Reloading user items...');
      loadUserItems();
      setToastMessage('Item deleted successfully');
      setToastType('success');
      setShowToast(true);
      console.log('Delete successful!');
    } catch (error) {
      console.error('Delete failed:', error);
      setToastMessage('Failed to delete item');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsDeleting(null);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    console.log('Delete cancelled');
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity style={[styles.itemCard, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <ThemedText style={[styles.itemTitle, { color: colors.text }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.itemOwner, { color: gray[500] }]}>{t('items.by_you')}</ThemedText>
        <View style={styles.itemMeta}>
          <View style={[styles.statusBadge, item.isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
            <ThemedText style={[styles.statusText, { color: item.isAvailable ? '#22C55E' : '#EF4444' }]}>
              {item.isAvailable ? t('items.available') : t('items.not_available')}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity 
          onPress={() => openEditModal(item)} 
          style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
        >
          <IconSymbol name="pencil" size={16} color="white" />
          <ThemedText style={styles.actionButtonText}>Edit</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            console.log('DELETE BUTTON PRESSED!');
            handleDelete(item);
          }} 
          disabled={isDeleting === item.id}
          style={[
            styles.actionButton, 
            { backgroundColor: isDeleting === item.id ? '#FCA5A5' : '#EF4444' },
            isDeleting === item.id && { opacity: 0.7 }
          ]}
          activeOpacity={0.7}
        >
          {isDeleting === item.id ? (
            <>
              <IconSymbol name="hourglass" size={16} color="white" />
              <ThemedText style={styles.actionButtonText}>Deleting...</ThemedText>
            </>
          ) : (
            <>
              <IconSymbol name="trash" size={16} color="white" />
              <ThemedText style={styles.actionButtonText}>Delete</ThemedText>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.title, { color: colors.text }]}>{t('items.my_items')}</ThemedText>
        <TouchableOpacity onPress={openAddModal} style={[styles.addButton, { backgroundColor: colors.primary }]}>
          <IconSymbol name="plus" size={20} color="white" />
          <ThemedText style={styles.addButtonText}>{t('items.add_item')}</ThemedText>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ThemedText style={{ color: colors.text }}>{t('loading')}</ThemedText>
        </View>
      ) : !user ? (
        <View style={styles.centered}>
          <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
            <IconSymbol name="person.circle" size={64} color={gray[300]} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>Authentication Required</ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: gray[500] }]}>
              Please log in to view and manage your items
            </ThemedText>
            <TouchableOpacity 
              onPress={() => router.push('/(tabs)/settings')} 
              style={[styles.emptyButton, { backgroundColor: colors.primary }]}
            >
              <ThemedText style={styles.emptyButtonText}>Go to Settings</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.centered}>
          <View style={[styles.emptyContainer, { backgroundColor: colors.card }]}>
            <IconSymbol name="plus.circle.fill" size={64} color={gray[300]} />
            <ThemedText style={[styles.emptyText, { color: colors.text }]}>{t('items.no_items')}</ThemedText>
            <ThemedText style={[styles.emptySubtext, { color: gray[500] }]}>
              {t('items.no_items_desc')}
            </ThemedText>
            <TouchableOpacity 
              onPress={() => router.push('/add-item')} 
              style={[styles.emptyButton, { backgroundColor: colors.primary }]}
            >
              <ThemedText style={styles.emptyButtonText}>{t('items.add_first_item')}</ThemedText>
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
      
      <Toast
        message={toastMessage}
        type={toastType}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
      
      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.deleteModal, { backgroundColor: colors.card }]}>
            <View style={styles.deleteModalHeader}>
              <IconSymbol name="exclamationmark.triangle.fill" size={48} color="#EF4444" />
              <ThemedText style={[styles.deleteModalTitle, { color: colors.text }]}>
                Delete Item
              </ThemedText>
              <ThemedText style={[styles.deleteModalMessage, { color: gray[600] }]}>
                Are you sure you want to delete &ldquo;{itemToDelete?.title}&rdquo;? This action cannot be undone.
              </ThemedText>
            </View>
            
            <View style={styles.deleteModalActions}>
              <TouchableOpacity
                onPress={cancelDelete}
                style={[styles.deleteModalButton, { backgroundColor: gray[200] }]}
              >
                <ThemedText style={[styles.deleteModalButtonText, { color: gray[700] }]}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={confirmDelete}
                style={[styles.deleteModalButton, { backgroundColor: '#EF4444' }]}
              >
                <ThemedText style={[styles.deleteModalButtonText, { color: 'white' }]}>
                  Delete
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 4,
    gap: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
    // Additional cancel button styles if needed
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
  // Delete Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteModal: {
    borderRadius: 20,
    padding: 24,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  deleteModalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  deleteModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  deleteModalMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  deleteModalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteModalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});