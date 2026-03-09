// Quick test script for chat endpoint
import axios from 'axios';

async function testChat() {
  try {
    console.log('Testing chat endpoint...');
    const response = await axios.post('http://localhost:3001/api/chat', {
      message: 'Hello',
      language: 'english'
    });
    
    console.log('✅ Success!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error!');
    console.log('Error message:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('No response received. Is the backend server running?');
      console.log('Make sure to run: npm run server');
    } else {
      console.log('Error details:', error);
    }
  }
}

testChat();
