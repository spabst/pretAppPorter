import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getPredefinedItems, searchPredefinedItems, LocalizedPredefinedItem } from '@/data/predefinedItems/index';
import { ItemCategory } from '@/types';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContextV2';


export default function AddItemScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<LocalizedPredefinedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { language, t } = useLanguage();

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

  const filterItems = React.useCallback(() => {
    let items = getPredefinedItems(language);

    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      items = searchPredefinedItems(searchQuery, language).filter(item => 
        !selectedCategory || item.category === selectedCategory
      );
    }

    setFilteredItems(items);
  }, [searchQuery, selectedCategory, language]);

  useEffect(() => {
    filterItems();
  }, [filterItems]);

  const handleItemSelect = (item: LocalizedPredefinedItem) => {
    // Navigate to custom form with pre-filled data
    router.push({
      pathname: '/custom-item',
      params: {
        prefilledTitle: item.title,
        prefilledDescription: item.description,
        prefilledCategory: item.category,
      }
    });
  };

  const handleCustomItem = () => {
    router.push('/custom-item');
  };

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[null, ...Object.values(ItemCategory)]}
        renderItem={({ item: category }) => (
          <TouchableOpacity
            style={[
              styles.categoryFilterButton,
              { backgroundColor: gray[100] },
              selectedCategory === category && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <ThemedText style={[
              styles.categoryFilterText,
              { color: colors.text },
              selectedCategory === category && { color: 'white' }
            ]}>
              {category ? getCategoryTranslation(category) : t('filter.all_categories')}
            </ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item || 'all'}
        contentContainerStyle={styles.categoryFilterContainer}
      />
    </View>
  );

  const renderItem = ({ item }: { item: LocalizedPredefinedItem }) => (
    <TouchableOpacity 
      style={[styles.itemCard, { backgroundColor: colors.card }]}
      onPress={() => handleItemSelect(item)}
    >
      <View style={[styles.itemIcon, { backgroundColor: colors.primary }]}>
        <IconSymbol name={item.icon as any} size={24} color="white" />
      </View>
      <View style={styles.itemInfo}>
        <ThemedText style={[styles.itemTitle, { color: colors.text }]}>{item.title}</ThemedText>
        <ThemedText style={[styles.itemDescription, { color: gray[500] }]} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <View style={[styles.categoryBadge, { backgroundColor: gray[100] }]}>
          <ThemedText style={[styles.categoryText, { color: gray[600] }]}>
            {getCategoryTranslation(item.category)}
          </ThemedText>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={16} color={gray[400]} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: colors.text }]}>{t('action.add_item')}</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchSection}>
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={gray[400]} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('search.placeholder')}
            placeholderTextColor={gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {renderCategoryFilter()}

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
            {t('nav.explore')} ({filteredItems.length})
          </ThemedText>
        </View>

        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.customButton, { backgroundColor: gray[100] }]}
          onPress={handleCustomItem}
        >
          <IconSymbol name="plus.circle.fill" size={24} color={colors.primary} />
          <ThemedText style={[styles.customButtonText, { color: colors.text }]}>
            {t('form.custom_item')}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
  searchSection: {
    padding: 20,
    paddingBottom: 16,
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
  },
  categoryFilter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryFilterContainer: {
    gap: 8,
  },
  categoryFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
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
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  itemDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});