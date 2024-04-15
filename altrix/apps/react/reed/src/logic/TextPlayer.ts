import { generateUniqueId } from '@altrix/shared-utils';
import { regexRules } from './logic';
import { Story, TextFrame } from './types/types';

export class TextPlayer {
    private frames: TextFrame[] = [];
    private currentFrame: TextFrame | null = null;
    private index: number = 0;
    private intervalId: NodeJS.Timeout | null = null;
    private intervalSpeed: number = 2000;
    private isPlaying: boolean = false;

    constructor(story: Story) {
        const parsedContent = this.splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );
        this.frames = parsedContent.map(
            (content: string): TextFrame => this.generateTextFrame(content),
        );
        this.currentFrame = this.frames[this.index];
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

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.index === this.frames.length - 1) {
                    this.pause();
                    return;
                }
                this.currentFrame = this.frames[this.index];
                this.index++;
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
        this.index = 0;
        this.isPlaying = false;
    }

    getFrames(): TextFrame[] {
        return this.frames;
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    setIsPlaying(value: boolean): void {
        this.isPlaying = value;
    }

    getIndex(): number {
        return this.index;
    }

    setIndex(value: number): void {
        this.index = value;
    }

    getFrame(): TextFrame | null {
        return this.currentFrame;
    }

    setFrame(id: string) {
        const currentFrame = this.frames.find(
            (frame: TextFrame) => frame.id === id,
        );
        if (!currentFrame) {
            console.error('TextFrame not found');
        } else {
            this.currentFrame = currentFrame;
        }
    }
}

export default TextPlayer;
