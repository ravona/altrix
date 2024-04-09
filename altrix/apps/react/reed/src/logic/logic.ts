export const regexRules = {
    sentences: /(?<=\.|\?|!)\s+|\r?\n|\r/g,
    words: /[\s,]+/g,
};

export function splitTextWithRegex(text: string, regex: RegExp): string[] {
    return text.split(regex);
}
