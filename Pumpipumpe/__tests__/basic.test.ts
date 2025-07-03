// Basic test to verify Jest is working correctly
describe('Testing Infrastructure', () => {
  it('should run basic tests', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('success');
    expect(result).toBe('success');
  });

  it('should work with TypeScript types', () => {
    interface TestInterface {
      name: string;
      count: number;
    }

    const testObj: TestInterface = {
      name: 'test',
      count: 42
    };

    expect(testObj.name).toBe('test');
    expect(testObj.count).toBe(42);
  });
});