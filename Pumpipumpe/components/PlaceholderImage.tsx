import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

interface PlaceholderImageProps {
  text: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
}

export function PlaceholderImage({ 
  text, 
  width = 300, 
  height = 300, 
  backgroundColor = '#E2E8F0',
  textColor = '#64748B',
  fontSize = 14
}: PlaceholderImageProps) {
  return (
    <View 
      style={[
        styles.container, 
        { 
          width, 
          height, 
          backgroundColor 
        }
      ]}
    >
      <ThemedText 
        style={[
          styles.text, 
          { 
            color: textColor, 
            fontSize 
          }
        ]}
      >
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});