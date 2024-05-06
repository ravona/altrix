import { regexRules } from './logic';
import { Story, Frame } from './types/types';
import {
    generateTextFrame,
    splitTextWithRegex,
} from '../components/ReedPlayer/utils';

class ReedPlayer {
    private story: Story | null = null;
    private frames: Frame[] = [];
    private activeFrame: Frame | null = null;
    private index: number = 0;
    private intervalSpeed: number = 1000;
    private isPlaying: boolean = false;

    constructor(story: Story) {
        this.story = story;
        const parsedContent = splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );
        this.frames = parsedContent.map(
            (text: string): Frame => generateTextFrame(text),
        );
        this.activeFrame = this.frames[this.index];
    }

    play() {
        this.isPlaying = true;
    }

    pause() {
        this.isPlaying = false;
    }

    stop() {
        this.isPlaying = false;
        this.index = 0;
    }

    getStory(): Story | null {
        return this.story;
    }

    getFrames(): Frame[] {
        return this.frames;
    }

    getActiveFrame(): Frame | null {
        return this.activeFrame;
    }

    setActiveFrame(frame: Frame) {
        this.activeFrame = frame;
    }

    getIndex(): number {
        return this.index;
    }

    setIndex(value: number): void {
        this.index = value;
    }

    getIndexByFrameId(id: string): number {
        return this.frames.findIndex((frame: Frame) => frame.id === id);
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    setIntervalSpeed(value: number) {
        this.intervalSpeed = value;
    }

    getIntervalSpeed(): number {
        return this.intervalSpeed;
    }
}

export default ReedPlayer;
