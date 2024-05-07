import { regexRules } from './logic';
import { Story, Frame, PlayerOptions, PlayerSpeed } from './types/types';
import {
    generateTextFrame,
    splitTextWithRegex,
} from '../components/ReedPlayer/utils';

class ReedPlayer {
    private story: Story;
    private frames: Frame[] = [];
    private activeFrame: Frame;
    private index: number = 0;
    private options: PlayerOptions = {
        speed: 1000,
        theme: 'primary',
        mode: 'auto',
        splitPattern: 'sentences',
    };
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

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    setIntervalSpeed(value: PlayerSpeed) {
        this.options.speed = value;
    }

    getIntervalSpeed(): PlayerSpeed {
        return this.options.speed;
    }
}

export default ReedPlayer;
