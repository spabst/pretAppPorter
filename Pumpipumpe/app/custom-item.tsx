import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { mockApi } from '@/services/mockApi';
import { ItemCategory, ItemCondition } from '@/types';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContextV2';


export default function CustomItemScreen() {
  const params = useLocalSearchParams();
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

  const getConditionTranslation = (condition: ItemCondition) => {
    const translations = {
      [ItemCondition.NEW]: t('condition.new'),
      [ItemCondition.LIKE_NEW]: t('condition.like_new'),
      [ItemCondition.GOOD]: t('condition.good'),
      [ItemCondition.FAIR]: t('condition.fair'),
      [ItemCondition.POOR]: t('condition.poor')
    };
    return translations[condition];
  };

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.OTHER);
  const [condition, setCondition] = useState<ItemCondition>(ItemCondition.GOOD);
  const [isAvailable, setIsAvailable] = useState(true);

  // Pre-fill form if coming from suggested items
  useEffect(() => {
    if (params.prefilledTitle) {
      setTitle(params.prefilledTitle as string);
    }
    if (params.prefilledDescription) {
      setDescription(params.prefilledDescription as string);
    }
    if (params.prefilledCategory) {
      setCategory(params.prefilledCategory as ItemCategory);
    }
  }, [params]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert(t('error.generic'), 'Inserisci un titolo per il tuo oggetto');
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

      await mockApi.createItem(itemData);
      Alert.alert('Successo', t('success.item_added'), [
        { text: 'OK', onPress: () => router.dismiss() }
      ]);
    } catch {
      Alert.alert(t('error.generic'), 'Impossibile salvare l\'oggetto');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[styles.backButton, { backgroundColor: gray[100] }]}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={20} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: colors.text }]}>
          {params.prefilledTitle ? t('action.add_item') : t('form.custom_item')}
        </ThemedText>
        <TouchableOpacity 
          onPress={handleSave}
          style={[styles.saveButtonContainer, { backgroundColor: colors.primary }]}
        >
          <ThemedText style={[styles.saveButton, { color: 'white' }]}>{t('action.save')}</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>{t('form.title')} *</ThemedText>
          <TextInput
            style={[styles.textInput, { 
              backgroundColor: colors.card, 
              borderColor: colors.border, 
              color: colors.text 
            }]}
            value={title}
            onChangeText={setTitle}
            placeholder={t('form.title')}
            placeholderTextColor={gray[400]}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>{t('form.description')}</ThemedText>
          <TextInput
            style={[styles.textInput, styles.textArea, { 
              backgroundColor: colors.card, 
              borderColor: colors.border, 
              color: colors.text 
            }]}
            value={description}
            onChangeText={setDescription}
            placeholder={t('form.description')}
            placeholderTextColor={gray[400]}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>{t('form.category')}</ThemedText>
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
                  {getCategoryTranslation(cat)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>{t('form.condition')}</ThemedText>
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
                  {getConditionTranslation(cond)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => setIsAvailable(!isAvailable)}
            style={styles.availabilityToggle}
          >
            <View>
              <ThemedText style={[styles.toggleTitle, { color: colors.text }]}>
                {t('items.available')}
              </ThemedText>
              <ThemedText style={[styles.toggleDescription, { color: gray[500] }]}>
                I vicini potranno richiedere questo oggetto
              </ThemedText>
            </View>
            <View style={[styles.toggle, isAvailable && styles.toggleActive]}>
              {isAvailable && <IconSymbol name="checkmark" size={16} color="white" />}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  saveButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  availabilityToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
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
  bottomPadding: {
    height: 40,
  },
});