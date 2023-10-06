import { cartProduct } from './interface';

export const localStorageHelper = {
    get(key:string) {
        const stored = localStorage.getItem(key);
        return stored == null ? undefined : JSON.parse(stored);
    },
    set(key:string, value:cartProduct) {
        localStorage.setItem(key, JSON.stringify(value));
    },
};