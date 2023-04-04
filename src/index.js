const startListening = require('./consumer');

async function main() {
  await startListening();
  console.log('Listening for messages...');
}

main().catch((err) => {
  console.error('Error starting application', err);
  process.exit(1);
});