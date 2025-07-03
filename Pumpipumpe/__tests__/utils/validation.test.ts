// Utility tests for validation functions
import { ItemCategory, ItemCondition } from '@/types';

// Create validation utilities to test
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  // Check if it's between 7 and 15 digits
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

const validateItemData = (data: {
  title: string;
  description: string;
  category: ItemCategory;
  condition: ItemCondition;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (data.title && data.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (data.description && data.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }

  if (!Object.values(ItemCategory).includes(data.category)) {
    errors.push('Invalid category');
  }

  if (!Object.values(ItemCondition).includes(data.condition)) {
    errors.push('Invalid condition');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'name+tag@example.org',
        '123@example.com'
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid',
        '@example.com',
        'test@',
        'test.example.com',
        'test @example.com',
        ''
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '1234567890',
        '+41791234567',
        '(555) 123-4567',
        '+1-555-123-4567',
        '123 456 7890'
      ];

      validPhones.forEach(phone => {
        expect(validatePhone(phone)).toBe(true);
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '123',
        '12345678901234567890',
        'abc123',
        '',
        '++'
      ];

      invalidPhones.forEach(phone => {
        expect(validatePhone(phone)).toBe(false);
      });
    });
  });

  describe('validateItemData', () => {
    const validItemData = {
      title: 'Test Item',
      description: 'A test item description',
      category: ItemCategory.TOOLS,
      condition: ItemCondition.GOOD
    };

    it('should validate correct item data', () => {
      const result = validateItemData(validItemData);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject empty title', () => {
      const result = validateItemData({
        ...validItemData,
        title: ''
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('should reject empty description', () => {
      const result = validateItemData({
        ...validItemData,
        description: ''
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description is required');
    });

    it('should reject title that is too long', () => {
      const result = validateItemData({
        ...validItemData,
        title: 'a'.repeat(101)
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be less than 100 characters');
    });

    it('should reject description that is too long', () => {
      const result = validateItemData({
        ...validItemData,
        description: 'a'.repeat(501)
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description must be less than 500 characters');
    });

    it('should collect multiple validation errors', () => {
      const result = validateItemData({
        title: '',
        description: '',
        category: 'invalid' as ItemCategory,
        condition: 'invalid' as ItemCondition
      });
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(4);
      expect(result.errors).toContain('Title is required');
      expect(result.errors).toContain('Description is required');
      expect(result.errors).toContain('Invalid category');
      expect(result.errors).toContain('Invalid condition');
    });
  });

  describe('Edge Cases', () => {
    it('should handle whitespace-only strings', () => {
      const emailResult = validateEmail('   ');
      const phoneResult = validatePhone('   ');
      const itemResult = validateItemData({
        title: '   ',
        description: '   ',
        category: ItemCategory.TOOLS,
        condition: ItemCondition.GOOD
      });

      expect(emailResult).toBe(false);
      expect(phoneResult).toBe(false);
      expect(itemResult.isValid).toBe(false);
    });

    it('should handle null and undefined inputs gracefully', () => {
      // Note: In TypeScript, these would cause compilation errors,
      // but we test runtime behavior for edge cases
      expect(() => validateEmail(null as any)).not.toThrow();
      expect(() => validatePhone(undefined as any)).not.toThrow();
    });
  });
});