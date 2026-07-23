const DATABASE_NAME = 'lampa_iptv';
const DATABASE_VERSION = 1;
const STORE_NAME = 'cache';

interface CacheRecord {
  key: string;
  value: unknown;
  expiresAt: number;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error('IndexedDB не поддерживается.'));
      return;
    }
    const request = globalThis.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Ошибка IndexedDB.'));
  });
}

export async function cacheGet<T>(key: string): Promise<T | undefined> {
  try {
    const database = await openDatabase();
    return await new Promise<T | undefined>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const request = transaction.objectStore(STORE_NAME).get(key);
      request.onsuccess = () => {
        const record = request.result as CacheRecord | undefined;
        if (!record || record.expiresAt < Date.now()) resolve(undefined);
        else resolve(record.value as T);
      };
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => database.close();
    });
  } catch {
    return undefined;
  }
}

export async function cacheSet(key: string, value: unknown, ttlMs: number): Promise<void> {
  try {
    const database = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put({
        key,
        value,
        expiresAt: Date.now() + ttlMs
      } satisfies CacheRecord);
      transaction.oncomplete = () => {
        database.close();
        resolve();
      };
      transaction.onerror = () => reject(transaction.error);
    });
  } catch {
    // Cache failure must never block channel playback.
  }
}

export async function cacheClear(): Promise<void> {
  if (!globalThis.indexedDB) return;
  await new Promise<void>((resolve) => {
    const request = globalThis.indexedDB.deleteDatabase(DATABASE_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
    request.onblocked = () => resolve();
  });
}
