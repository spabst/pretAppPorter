// Component tests for ThemedText
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';

// Mock the color scheme hook
jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(() => 'light')
}));

describe('ThemedText Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <ThemedText>Hello World</ThemedText>
    );
    
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { fontSize: 20, fontWeight: 'bold' as const };
    const { getByText } = render(
      <ThemedText style={customStyle}>Styled Text</ThemedText>
    );
    
    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customStyle)
      ])
    );
  });

  it('renders with different text types', () => {
    const { getByText: getTitle } = render(
      <ThemedText type="title">Title Text</ThemedText>
    );
    
    const { getByText: getSubtitle } = render(
      <ThemedText type="subtitle">Subtitle Text</ThemedText>
    );
    
    const { getByText: getLink } = render(
      <ThemedText type="link">Link Text</ThemedText>
    );
    
    expect(getTitle('Title Text')).toBeTruthy();
    expect(getSubtitle('Subtitle Text')).toBeTruthy();
    expect(getLink('Link Text')).toBeTruthy();
  });

  it('handles lightColor and darkColor props', () => {
    const { getByText } = render(
      <ThemedText 
        lightColor="#000000" 
        darkColor="#FFFFFF"
      >
        Themed Text
      </ThemedText>
    );
    
    expect(getByText('Themed Text')).toBeTruthy();
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(
      <ThemedText testID="themed-text">Test Text</ThemedText>
    );
    
    expect(getByTestId('themed-text')).toBeTruthy();
  });
});