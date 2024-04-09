import { regexRules } from './logic';
import { Story } from './types/types';

export class TextPlayer {
    public content: string[];

    constructor(story: Story) {
        this.content = this.splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );
    }

    private splitTextWithRegex(text: string, regex: RegExp): string[] {
        return text.split(regex).filter(Boolean);
    }

    public getChunk(index: number): string {
        return this.content[index];
    }
}

export default TextPlayer;
