const fs = require('fs');
const path = require('path');
const dbs = require('../config/db'); // Importa el objeto con todas las instancias

describe('Testing Microservice Functionality', () => {
  test('db.js file exists', () => {
    const filePath = path.join(__dirname, '../config/db.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  Object.entries(dbs).forEach(([dbName, dbInstance]) => {
    test(`Database connection for "${dbName}" is established successfully`, async () => {
      expect.assertions(1);
      try {
        await dbInstance.authenticate();
        console.log(`✅ Database connection test for "${dbName}" completed and approved successfully.`);
        expect(true).toBe(true);
      } catch (error) {
        console.error(`❌ Error connecting to the database "${dbName}":`, error);
        expect(error).toBeUndefined();
      }
    });
  });

  afterAll(async () => {
    for (const [dbName, dbInstance] of Object.entries(dbs)) {
      await dbInstance.close();
      console.log(`✅ Database connection "${dbName}" closed.`);
    }
  });
});