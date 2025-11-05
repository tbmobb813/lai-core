import { AIClient } from './src/index';

async function test() {
  const client = new AIClient({
    provider: {
      type: 'ollama',
      model: 'llama2',
    },
    storagePath: './test.db',
  });

  try {
    const response = await client.ask('Say hello!');
    console.log('Response:', response);
    console.log('✅ Test passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

test();