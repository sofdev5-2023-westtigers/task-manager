import assert from 'assert';
import { listsTest } from '$db/lists';

describe('Integration tests for listsTest collection', () => {
  beforeEach(async () => {
    await listsTest.deleteMany({});
  });

  afterEach(async () => {
    await listsTest.deleteMany({});
  });

  it('should find a document', async () => {
    const document = { test: 'vitest', coverage: 'vitest run --coverage' };
    await listsTest.insertOne(document);

    const result = await listsTest.findOne({ test: 'vitest' });
    assert.deepStrictEqual(result, document);
  });

  it('should update a document', async () => {
    const document = { test: 'vitest', coverage: 'vitest run --coverage' };
    await listsTest.insertOne(document);

    const update = { $set: { coverage: 'new coverage' } };
    const result = await listsTest.updateOne({ test: 'vitest' }, update);
    assert.strictEqual(result.modifiedCount, 1);
  });

  it('should delete a document', async () => {
    const document = { test: 'vitest', coverage: 'vitest run --coverage' };
    await listsTest.insertOne(document);

    const result = await listsTest.deleteOne({ test: 'vitest' });
    assert.strictEqual(result.deletedCount, 1);
  });

  it('should count documents', async () => {
    const document1 = { test: 'vitest', coverage: 'vitest run --coverage' };
    const document2 = { test: 'vitest', coverage: 'vitest run --coverage' };
    await listsTest.insertMany([document1, document2]);

    const count = await listsTest.countDocuments({ test: 'vitest' });
    assert.strictEqual(count, 2);
  });

  it('should find documents with projection', async () => {
    const document = { test: 'vitest', coverage: 'vitest run --coverage' };
    await listsTest.insertOne(document);

    const projection = { test: 1 };
    const result = await listsTest.findOne({ test: 'vitest' }, { projection });
    assert.deepStrictEqual(result.test, 'vitest');
  });

  it('should find documents with pagination', async () => {
    const documents = [];
    for (let i = 0; i < 20; i++) {
      documents.push({ test: `vitest-${i}`, coverage: 'vitest run --coverage' });
    }
    await listsTest.insertMany(documents);

    const pageSize = 10;
    const page = 1;
    const result = await listsTest
      .find({ test: { $regex: '^vitest-' } })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    assert.strictEqual(result.length, pageSize);
  });

  it('should sort documents', async () => {
    const document1 = { test: 'vitest-1', coverage: 'vitest run --coverage' };
    const document2 = { test: 'vitest-2', coverage: 'vitest run --coverage' };
    const document3 = { test: 'vitest-3', coverage: 'vitest run --coverage' };
    await listsTest.insertMany([document3, document1, document2]);

    const result = await listsTest.find({}).sort({ test: 1 }).toArray();
    assert.deepStrictEqual(result, [document1, document2, document3]);
  });

  it('should perform aggregation', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage', value: 5 },
      { test: 'vitest-2', coverage: 'vitest run --coverage', value: 10 },
      { test: 'vitest-3', coverage: 'vitest run --coverage', value: 15 },
    ];
    await listsTest.insertMany(documents);

    const pipeline = [{ $group: { _id: null, total: { $sum: '$value' } } }];
    const result = await listsTest.aggregate(pipeline).toArray();
    assert.deepStrictEqual(result[0].total, 30);
  });

  it('should perform text search', async () => {
    await listsTest.createIndex({ test: 'text', coverage: 'text' });

    const document1 = { test: 'vitest', coverage: 'vitest run --coverage' };
    const document2 = { test: 'sometest', coverage: 'sometest run --coverage' };
    await listsTest.insertMany([document1, document2]);

    const searchString = 'vitest';
    const result = await listsTest.find({ $text: { $search: searchString } }).toArray();
    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].test, 'vitest');
  });

  it('should insert multiple documents', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage' },
      { test: 'vitest-2', coverage: 'vitest run --coverage' },
      { test: 'vitest-3', coverage: 'vitest run --coverage' },
    ];
    const result = await listsTest.insertMany(documents);
    assert.strictEqual(result.insertedCount, documents.length);
  });

  it('should find documents with a specific value', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage' },
      { test: 'vitest-2', coverage: 'vitest run --coverage' },
      { test: 'vitest-3', coverage: 'vitest run --coverage' },
    ];
    await listsTest.insertMany(documents);

    const result = await listsTest.find({ test: 'vitest-2' }).toArray();
    assert.strictEqual(result.length, 1);
    assert.deepStrictEqual(result[0].test, 'vitest-2');
  });

  it('should update multiple documents', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage' },
      { test: 'vitest-2', coverage: 'vitest run --coverage' },
      { test: 'vitest-3', coverage: 'vitest run --coverage' },
    ];
    await listsTest.insertMany(documents);

    const update = { $set: { coverage: 'new coverage' } };
    const result = await listsTest.updateMany({}, update);
    assert.strictEqual(result.modifiedCount, documents.length);
  });

  it('should delete multiple documents', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage' },
      { test: 'vitest-2', coverage: 'vitest run --coverage' },
      { test: 'vitest-3', coverage: 'vitest run --coverage' },
    ];
    await listsTest.insertMany(documents);

    const result = await listsTest.deleteMany({});
    assert.strictEqual(result.deletedCount, documents.length);
  });

  it('should count documents with a specific condition', async () => {
    const documents = [
      { test: 'vitest-1', coverage: 'vitest run --coverage', status: 'active' },
      { test: 'vitest-2', coverage: 'vitest run --coverage', status: 'inactive' },
      { test: 'vitest-3', coverage: 'vitest run --coverage', status: 'active' },
    ];
    await listsTest.insertMany(documents);

    const count = await listsTest.countDocuments({ status: 'active' });
    assert.strictEqual(count, 2);
  });
});
