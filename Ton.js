const crypto = require('crypto');

const telegramBotToken = '5768337691:AAGDAe6rjxu1cUgxK4BizYi--Utc3J9v5AU';
const initData = 'user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3788475317572404878&chat_type=private&auth_date=1709144340&hash=371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827';

// Step 1: Parse init data into key-value pairs
const params = new URLSearchParams(initData);
const data = {};
params.forEach((value, key) => {
  if (key !== 'hash') {
    data[key] = decodeURIComponent(value);
  }
});

const receivedHash = params.get('hash');

// Step 2: Sort key-value pairs by key
const sortedPairs = Object.keys(data).sort().map(key => `${key}=${data[key]}`);
const joinedPairs = sortedPairs.join('\n');

// Step 3: Create HMAC-SHA256 key based on WebAppData and Telegram Bot token
const hmacKey = crypto.createHmac('sha256', telegramBotToken).update('WebAppData').digest('hex');

// Step 4: Create HMAC-SHA256 using the key from Step 3 and the sorted pairs from Step 2
const computedHash = crypto.createHmac('sha256', hmacKey).update(joinedPairs).digest('hex');

// Step 5: Compare the computed hash with the received hash
if (computedHash === receivedHash) {
  console.log('The submitted init data is trustworthy.');
} else {
  console.log('The submitted init data is not trustworthy.');
}
console.log('Sorted pairs:', sortedPairs);
console.log('Joined pairs:', joinedPairs);
console.log('Computed hash:', computedHash);
console.log('Received hash:', receivedHash);
console.log("hmacKey1:", hmacKey);
