import { regexRules } from './logic';
import { Story, Frame } from './types/types';
import {
    generateTextFrame,
    splitTextWithRegex,
} from '../components/ReedPlayer/utils';

export class ReedPlayer {
    private frames: Frame[] = [];
    private activeFrame: Frame | null = null;
    private index: number = 0;
    private intervalId?: NodeJS.Timeout;
    private intervalSpeed: number = 2000;
    private isPlaying: boolean = false;

    constructor(story: Story) {
        const parsedContent = splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );

        this.frames = parsedContent.map(
            (text: string): Frame => generateTextFrame(text),
        );

        this.activeFrame = this.frames[this.index];
    }

    private handleAutoFrameChange() {
        if (this.index === this.frames.length - 1) {
            this.pause();
            return;
        }

        this.activeFrame = this.frames[this.index];
        this.index++;
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        if (!this.intervalId) {
            this.intervalId = setInterval(
                this.handleAutoFrameChange,
                this.intervalSpeed,
            );
        }
    }

    pause() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        clearInterval(this.intervalId as NodeJS.Timeout);
    }

    stop() {
        clearInterval(this.intervalId as NodeJS.Timeout);
        this.index = 0;
        this.isPlaying = false;
    }

    getFrames(): Frame[] {
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

    getActiveFrame(): Frame | null {
        return this.activeFrame;
    }

    setActiveFrame(id: string) {
        const newActiveFrame = this.frames.find(
            (frame: Frame) => frame.id === id,
        );

        if (!newActiveFrame) {
            console.error('TextFrame not found');
        } else {
            this.activeFrame = newActiveFrame;
        }
    }

    setIntervalSpeed(value: number) {
        this.intervalSpeed = value;
    }

    getIntervalSpeed(): number {
        return this.intervalSpeed;
    }
}

export default ReedPlayer;
