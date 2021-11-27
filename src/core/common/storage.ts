import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';

export class Storage {

  private driver: StorageDriver;

  public constructor(private name: string,
                     private secure = false) {
  }

  public async ready(): Promise<void> {
    if (this.driver)
      return;
    this.driver = this.secure && await SecureStore.isAvailableAsync() ?
      new SecureStorageDriver() :
      new DefaultStorageDriver();
  }

  public async set<T>(key: string, value: T): Promise<void> {
    await this.ready();
    let path = this.path(key);
    let str = JSON.stringify(value);
    await this.driver.set(path, str);
  }

  public async get<T>(key: string, def?: T): Promise<T> {
    await this.ready();
    let path = this.path(key);
    let str = await this.driver.get(path);
    let value: T = JSON.parse(str);
    return value ?? def;
  }

  public async remove(key: string): Promise<void> {
    await this.ready();
    let path = this.path(key);
    return this.driver.remove(path);
  }

  private path(key: string): string {
    return `__${this.name}___${key}__`;
  }

}

export interface StorageDriver {

  set(key: string, value: string): Promise<void>;

  get(key: string): Promise<string>;

  remove(key: string): Promise<void>;

}

export class DefaultStorageDriver implements StorageDriver {

  public async set(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
  }

  public async get(key: string): Promise<string> {
    return AsyncStorage.getItem(key);
  }

  public async remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

}

export class SecureStorageDriver implements StorageDriver {

  public async set(key: string, value: string): Promise<void> {
    return SecureStore.setItemAsync(key, value);
  }

  public async get(key: string): Promise<string> {
    return SecureStore.getItemAsync(key);
  }

  public async remove(key: string): Promise<void> {
    return SecureStore.deleteItemAsync(key);
  }

}

export default new Storage('default');
