import { generateUniqueId } from '@altrix/shared-utils';

export const splitTextWithRegex = (text: string, regex: RegExp): string[] => {
    return text.split(regex);
};

export const generateTextFrame = (text: string) => {
    return {
        id: generateUniqueId(),
        text,
    };
};
