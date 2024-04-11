import { generateUniqueId } from '@altrix/shared-utils';
import { regexRules } from './logic';
import { Story, TextFrame } from './types/types';

export class TextPlayer {
    private textFrames: TextFrame[] = [];
    private currentIndex: number = 0; // ui
    private currentTextFrame: TextFrame | null = null; // ui
    private intervalId: NodeJS.Timeout | null = null;
    private intervalSpeed: number = 2000; // ui
    private isPlaying: boolean = false; // ui

    constructor(story: Story) {
        const parsedContent = this.splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );
        this.textFrames = parsedContent.map(
            (content: string): TextFrame => this.generateTextFrame(content),
        );
        this.currentTextFrame = this.textFrames[this.currentIndex];
    }

    private generateTextFrame(content: string) {
        return {
            id: generateUniqueId(),
            content,
        };
    }

    private splitTextWithRegex(text: string, regex: RegExp): string[] {
        return text.split(regex);
    }

    getTextFrames(): TextFrame[] {
        return this.textFrames;
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.currentIndex === this.textFrames.length - 1) {
                    this.pause();
                    return;
                }
                this.currentTextFrame = this.textFrames[this.currentIndex];
                this.currentIndex++;
            }, this.intervalSpeed);
        }
    }

    pause() {
        if (!this.isPlaying) return;
        clearInterval(this.intervalId as NodeJS.Timeout);
        this.isPlaying = false;
    }

    stop() {
        clearInterval(this.intervalId as NodeJS.Timeout);
        this.currentIndex = 0;
        this.isPlaying = false;
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    setIsPlaying(bool: boolean): void {
        this.isPlaying = bool;
    }

    getCurrentIndex(): number {
        return this.currentIndex;
    }

    setCurrentIndex(i: number): void {
        this.currentIndex = i;
    }

    getCurrentTextFrame(): TextFrame | null {
        return this.currentTextFrame;
    }

    setCurrentTextFrame(id: string) {
        const currentTextFrame = this.textFrames.find(
            (frame: TextFrame) => frame.id === id,
        );
        if (!currentTextFrame) {
            console.error('TextFrame not found');
        } else {
            this.currentTextFrame = currentTextFrame;
        }
    }
}

export default TextPlayer;
