import localForage from "localforage";

interface ILocalForageService{
  setItem<T>(key: string, value: T): Promise<T>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

class LocalForageService implements ILocalForageService{
  private static instance: LocalForageService
  
  constructor(){
    localForage.config({
      name: 'NPM File Cache', 
      storeName: 'NPM File Store', 
      version: 1.0,
      description: 'Cache for files served from NPM registry'
    });
  }

  static getInstance(): LocalForageService {
    if (!LocalForageService.instance){
      LocalForageService.instance = new LocalForageService();
    }
    return LocalForageService.instance;
  }

  /**
   * 
   * @param key key of item to be stored
   * @param value value of item to be stored
   * @returns The value supplied if stored 
   */
  async setItem<T>(key: string, value: T): Promise<T> {
    return await localForage.setItem(key, value)
  }

  /**
   * 
   * @param key key of item to be stored
   * @returns returns the value if found 
   */
  async getItem<T>(key: string): Promise<T | null> {
    return await localForage.getItem(key)
  }

  /**
   * 
   * @param key key of item to be removed from storage
   * @returns an empty promise
   */
  async removeItem(key: string): Promise<void> {
    return await localForage.removeItem(key);
  }

  /**
   * 
   * @returns an empty promise
   */
  async clear(): Promise<void> {
    return await localForage.clear();
  }

}

export default LocalForageService.getInstance();

  


