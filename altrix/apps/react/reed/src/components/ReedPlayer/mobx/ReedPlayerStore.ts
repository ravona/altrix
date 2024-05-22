import stories from '../../../data/stories.json';
import {
    makeAutoObservable,
    action,
    observable,
    computed,
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
    @observable currentIndex: number = 0;
    @observable frames: Frame[] = [];
    @observable intervalId?: number;
    @observable isPlaying: boolean = false;
    @observable playerMode: PlayerMode = 'auto';
    @observable playerSpeed: PlayerSpeed = 2;
    @observable playerSplitPattern: 'sentences' | 'words' | 'paragraphs' =
        'sentences';
    @observable showPlayerOptions: boolean = false;
    @observable showPlaylist: boolean = false;
    @observable showStoryForm: boolean = false;
    @observable story: Story | null = null;
    @observable theme: PlayerTheme = 'dark';

    constructor(story: Story) {
        makeAutoObservable(this);
        this.setStory(story);

        reaction(
            () => this.currentIndex,
            () => {
                this.focusCurrentFrame();
            },
        );
    }

    @computed get currentFrame(): Frame | null {
        return this.frames[this.currentIndex] || null;
    }

    @action setStory(story: Story) {
        this.story = story;
        this.frames = splitTextWithRegex(
            story.content,
            regexRules.sentences,
        ).map(generateTextFrame);
        this.setIsPlaying(false);
        this.setCurrentIndex(0);
    }

    @action play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.showPlayerOptions = false;
        this.showPlaylist = false;

        this.intervalId = window.setInterval(() => {
            if (this.currentIndex === this.frames.length - 1) {
                this.stop();
            } else {
                this.currentIndex++;
            }
        }, this.playerSpeed * 1000);
    }

    @action pause() {
        this.stopInterval();
        this.isPlaying = false;
    }

    @action stop() {
        this.stopInterval();
        this.setIsPlaying(false);
        this.setCurrentIndex(0);
    }

    @action restart() {
        this.stop();
        this.play();
    }

    @action setIsPlaying(value: boolean) {
        this.isPlaying = value;
    }

    @action togglePlayerOptions() {
        this.showPlayerOptions = !this.showPlayerOptions;
    }

    @action toggleShowPlaylist() {
        this.showPlaylist = !this.showPlaylist;
    }

    @action toggleShowStoryForm() {
        this.showStoryForm = !this.showStoryForm;
    }

    @action setPlayerSpeed(speed: PlayerSpeed) {
        this.playerSpeed = speed;
        if (this.isPlaying) {
            this.restart();
        }
    }

    @action setTheme(theme: PlayerTheme) {
        this.theme = theme;
    }

    @action setMode(mode: PlayerMode) {
        this.playerMode = mode;
    }

    @action handleClickFrame(frame: Frame) {
        this.currentIndex = this.frames.findIndex((f) => f.id === frame.id);
        this.focusCurrentFrame();
    }

    @action setCurrentIndex(index: number) {
        this.currentIndex = index;
    }

    private stopInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    private focusCurrentFrame() {
        if (!this.currentFrame || !this.frames) return;
        const element = document.querySelector(`#${this.currentFrame?.id}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    @action setSplitPattern(pattern: 'sentences' | 'words' | 'paragraphs') {
        this.playerSplitPattern = pattern;
        this.frames = splitTextWithRegex(
            this.story?.content || '',
            regexRules[pattern],
        ).map(generateTextFrame);
        this.stop();
    }
}

const defaultStory = stories[0];
export const reedPlayerStore = new ReedPlayerStore(defaultStory);
