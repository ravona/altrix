import { addUniqueId } from '@altrix/shared-lib';
import { Frame } from './types';

export const regexRules = {
    sentences: /(?<=\.|\?|!)\s+|\r?\n|\r/g,
    words: /[\s,]+/g,
    paragraphs: /\n\s*\n/g,
};

export function splitTextWithRegex(text: string, regex: RegExp): string[] {
    return text.split(regex);
}

export function generateTextFrame(text: string): Frame {
    return addUniqueId({
        text,
    });
}
