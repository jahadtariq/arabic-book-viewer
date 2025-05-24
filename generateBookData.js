const fs = require('fs');
const util = require('util');

const inputFilePath = 'decoded.json';
const outputFilePath = 'bookData.js';

// Recursively parse stringified JSON fields (like "dimensions": "{\"width\":100}")
function deepParse(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepParse);
  } else if (typeof obj === 'object' && obj !== null) {
    const parsed = {};
    for (const [key, value] of Object.entries(obj)) {
      try {
        parsed[key] = typeof value === 'string' && value.trim().startsWith('{')
          ? deepParse(JSON.parse(value))
          : deepParse(value);
      } catch {
        parsed[key] = deepParse(value);
      }
    }
    return parsed;
  } else {
    return obj;
  }
}

try {
  const rawData = fs.readFileSync(inputFilePath, 'utf8');
  const jsonData = JSON.parse(rawData);

  const parsedData = deepParse(jsonData);

  // Use util.inspect to convert JS object to nice JS code (not JSON)
  const outputString = `export const bookData = ${util.inspect(parsedData, {
    depth: null,
    maxArrayLength: null,
    compact: false,
    sorted: false,
  })};\n`;

  fs.writeFileSync(outputFilePath, outputString, 'utf8');
  console.log('✅ Clean bookData.js generated successfully');
} catch (err) {
  console.error('❌ Error:', err.message);
}
