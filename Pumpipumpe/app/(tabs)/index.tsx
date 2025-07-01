import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TextInput, View, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockApi } from '@/services/mockApi';
import { Item, ItemCategory } from '@/types';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContextV2';

const categoryIcons = {
  [ItemCategory.TOOLS]: 'hammer.fill',
  [ItemCategory.ELECTRONICS]: 'tv.fill',
  [ItemCategory.BOOKS]: 'book.fill',
  [ItemCategory.KITCHEN]: 'fork.knife',
  [ItemCategory.GARDEN]: 'leaf.fill',
  [ItemCategory.SPORTS]: 'figure.run',
  [ItemCategory.HOUSEHOLD]: 'house.fill',
  [ItemCategory.AUTOMOTIVE]: 'car.fill',
  [ItemCategory.OTHER]: 'ellipsis'
};

export default function BrowseScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();
  
  const getCategoryTranslation = (category: ItemCategory) => {
    const translations = {
      [ItemCategory.TOOLS]: t('category.tools'),
      [ItemCategory.ELECTRONICS]: t('category.electronics'),
      [ItemCategory.BOOKS]: t('category.books'),
      [ItemCategory.KITCHEN]: t('category.kitchen'),
      [ItemCategory.GARDEN]: t('category.garden'),
      [ItemCategory.SPORTS]: t('category.sports'),
      [ItemCategory.HOUSEHOLD]: t('category.household'),
      [ItemCategory.AUTOMOTIVE]: t('category.automotive'),
      [ItemCategory.OTHER]: t('category.other')
    };
    return translations[category];
  };

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getItems();
      setItems(data);
    } catch {
      Alert.alert(t('error.generic'), 'Failed to load items');
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
      Alert.alert(t('error.generic'), 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: ItemCategory) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const data = await mockApi.getItems({ category });
      setItems(data);
    } catch {
      Alert.alert(t('error.generic'), 'Failed to filter items');
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = async () => {
    setSelectedCategory(null);
    loadItems();
  };

  const renderCategoryGrid = () => (
    <View style={styles.categorySection}>
      <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>{t('nav.explore')}</ThemedText>
      <View style={styles.categoryGrid}>
        {Object.values(ItemCategory).slice(0, 4).map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryCard, { backgroundColor: colors.card }]}
            onPress={() => handleCategorySelect(category)}
          >
            <View style={[styles.categoryIcon, { backgroundColor: colors.primary }]}>
              <IconSymbol 
                name={categoryIcons[category] as any} 
                size={32} 
                color="white" 
              />
            </View>
            <ThemedText style={[styles.categoryLabel, { color: colors.text }]}>
              {getCategoryTranslation(category)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderItemsList = () => (
    <View style={styles.itemsSection}>
      <View style={styles.itemsHeader}>
        <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
          {selectedCategory ? `${t('nav.explore')} - ${getCategoryTranslation(selectedCategory)}` : t('nav.explore')}
        </ThemedText>
        {selectedCategory && (
          <TouchableOpacity onPress={resetFilter}>
            <ThemedText style={[styles.clearFilter, { color: colors.primary }]}>{t('filter.all_categories')}</ThemedText>
          </TouchableOpacity>
        )}
      </View>
      
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={[styles.itemCard, { backgroundColor: colors.card }]}>
          <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <ThemedText style={[styles.itemTitle, { color: colors.text }]}>{item.title}</ThemedText>
            <ThemedText style={[styles.itemOwner, { color: gray[500] }]}>Da {item.owner.name}</ThemedText>
            <View style={styles.itemMeta}>
              <View style={[styles.statusBadge, item.isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
                <ThemedText style={[styles.statusText, { color: item.isAvailable ? '#22C55E' : '#EF4444' }]}>
                  {item.isAvailable ? t('items.available') : t('items.not_available')}
                </ThemedText>
              </View>
            </View>
          </View>
          <IconSymbol name="chevron.right" size={16} color={gray[400]} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.title, { color: colors.text }]}>{t('action.search')}</ThemedText>
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={gray[400]} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('search.placeholder')}
            placeholderTextColor={gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
            returnKeyType="search"
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ThemedText style={{ color: colors.text }}>{t('loading')}</ThemedText>
        </View>
      ) : (
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View>
              {renderCategoryGrid()}
              {renderItemsList()}
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categorySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: '46%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  itemsSection: {
    paddingHorizontal: 20,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearFilter: {
    fontSize: 16,
    fontWeight: '600',
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
