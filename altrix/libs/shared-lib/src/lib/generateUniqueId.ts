import { customAlphabet, nanoid } from 'nanoid';

/**
 * Generates a unique ID.
 * @param args Optional arguments that nanoid accepts, like the size of the ID.
 * @returns A unique string ID.
 */
export function generateUniqueId(...args: Parameters<typeof nanoid>): string {
    const myAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const uniqueId = customAlphabet(myAlphabet, 21);
    return uniqueId(...args);
}

/**
 * Adds a unique ID to an object.
 * @param obj The object to add the ID to.
 * @returns A new object with the same properties as the original object plus a unique ID.
 */
export function addUniqueId<T extends object>(obj: T): T & { id: string } {
    return {
        ...obj,
        id: generateUniqueId(),
    };
}
