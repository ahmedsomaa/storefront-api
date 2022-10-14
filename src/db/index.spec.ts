import db from './index';

describe('-- PostgreSQL Pool', (): void => {
  it('should create a database client', (): void => {
    expect(db).toBeDefined();
  });

  it('should be able to connect to the database', async (): Promise<void> => {
    const connection = await db.connect();
    expect(connection).toBeDefined();
    connection.release();
  });
});
