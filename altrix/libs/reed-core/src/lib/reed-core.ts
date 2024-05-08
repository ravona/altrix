import { generateTextFrame, regexRules, splitTextWithRegex } from './logic';
import { Frame, PlayerOptions, PlayerSpeed, Story } from './types';

export class ReedPlayer {
  private story: Story;
  private frames: Frame[] = [];
  private activeFrame: Frame;
  private index = 0;
  private options: PlayerOptions = {
    speed: 1,
    theme: 'primary',
    mode: 'auto',
    splitPattern: 'sentences',
  };
  private isPlaying = false;

  constructor(story: Story) {
    this.story = story;
    const parsedContent = splitTextWithRegex(
      story.content,
      regexRules.sentences
    );
    this.frames = parsedContent.map(
      (text: string): Frame => generateTextFrame(text)
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

  getStory(): Story {
    return this.story;
  }

  setStory(story: Story) {
    this.story = story;
  }

  getFrames(): Frame[] {
    return this.frames;
  }

  setFrames(frames: Frame[]) {
    this.frames = frames;
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

  setIsPlaying(value: boolean): void {
    this.isPlaying = value;
  }

  setIntervalSpeed(value: PlayerSpeed) {
    this.options.speed = value;
  }

  getIntervalSpeed(): PlayerSpeed {
    return this.options.speed;
  }
}
