import { nanoid } from 'nanoid';

/**
 * Generates a unique ID.
 * @param args Optional arguments that nanoid accepts, like the size of the ID.
 * @returns A unique string ID.
 */
export function generateUniqueId(...args: Parameters<typeof nanoid>): string {
    return nanoid(...args);
}
