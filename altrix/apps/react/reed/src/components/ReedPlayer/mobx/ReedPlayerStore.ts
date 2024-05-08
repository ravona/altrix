import stories from '../../../data/stories.json';
import {
    makeAutoObservable,
    action,
    computed,
    observable,
    runInAction,
    reaction,
} from 'mobx';
import {
    Story,
    Frame,
    generateTextFrame,
    regexRules,
    splitTextWithRegex,
    PlayerTheme,
    PlayerSpeed,
    PlayerMode,
} from '@altrix/reed-core';

export class ReedPlayerStore {
    @observable story: Story | null = null;
    @observable frames: Frame[] = [];
    @observable isPlaying: boolean = false;
    @observable intervalId?: number;
    @observable playerSpeed: PlayerSpeed = 2;
    @observable index: number = 0;
    @observable showPlayerOptions: boolean = false;
    @observable showPlaylist: boolean = false;
    @observable theme: PlayerTheme = 'dark';
    @observable playerMode: PlayerMode = 'auto';

    constructor(story: Story) {
        makeAutoObservable(this);
        this.setStory(story);

        reaction(
            () => this.activeFrame,
            (activeFrame: Frame | null) => {
                if (activeFrame?.id) {
                    const element = document.querySelector(
                        `#${activeFrame.id}`
                    );
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }
            }
        );
    }

    @action setStory(story: Story) {
        this.story = story;
        const parsedContent = splitTextWithRegex(
            story.content,
            regexRules.sentences
        );
        this.frames = parsedContent.map(
            (text: string): Frame => generateTextFrame(text)
        );
        this.index = 0;
        this.isPlaying = false;
    }

    @computed get activeFrame(): Frame | null {
        return this.frames[this.index] || null;
    }

    @action play() {
        if (this.isPlaying || this.frames.length === 0) return;

        this.isPlaying = true;
        if (this.showPlayerOptions) {
            this.showPlayerOptions = false;
        }
        this.intervalId = window.setInterval(() => {
            if (this.index >= this.frames.length - 1) {
                this.pause();
            } else {
                this.setIndex(this.index + 1);
            }
        }, this.playerSpeed * 1000);
    }

    @action pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.isPlaying = false;
    }

    @action play2() {
        if (this.isPlaying || this.frames.length === 0) return;
        this.isPlaying = true;
        this.intervalId = window.setInterval(() => {
            runInAction(() => {
                if (this.index >= this.frames.length - 1) {
                    this.pause();
                } else {
                    this.index += 1;
                }
            });
        }, this.playerSpeed);
    }

    @action stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.isPlaying = false;
        this.index = 0;
    }

    @action restart() {
        this.stop();
        this.play();
    }

    @action setIndex(index: number) {
        this.index = index;
    }

    @action togglePlayerOptions() {
        this.showPlayerOptions = !this.showPlayerOptions;
    }

    @action toggleShowPlaylist() {
        this.showPlaylist = !this.showPlaylist;
    }

    @action setActiveFrame(frame: Frame) {
        const index = this.frames.findIndex((f) => f.id === frame.id);
        this.setIndex(index);
    }

    @action setPlayerSpeed(duration: PlayerSpeed) {
        this.playerSpeed = duration;
    }

    @action setTheme(theme: PlayerTheme) {
        this.theme = theme;
    }

    @action setMode(mode: PlayerMode) {
        this.playerMode = mode;
    }
}

const defaultStory = stories[0];
export const reedPlayerStore = new ReedPlayerStore(defaultStory);
