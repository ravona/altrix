import { makeAutoObservable, runInAction } from 'mobx';
import { Chunk, Story } from '../logic/types/types';
import { regexRules, splitTextWithRegex } from '../logic/logic';
import stories from '../data/stories.json';
import { nanoid } from 'nanoid';

class TextPlayerStore {
    story: Story | null = null;
    content: Chunk[] = [];
    isPlaying: Boolean = false;
    intervalId?: number;
    intervalDuration: number = 1000;
    index: number = 0;

    constructor(story: Story) {
        makeAutoObservable(this);
        this.story = story;
        const parsedContent = splitTextWithRegex(
            story.content,
            regexRules.sentences,
        );
        this.setContent(parsedContent);
    }

    getChunk(index: number): Chunk {
        return this.content[index];
    }

    setContent(content: string[]) {
        this.content = content.map((text) => ({
            id: nanoid(),
            text,
        }));
    }

    play() {
        if (this.isPlaying || this.content.length === 0) return;

        this.isPlaying = true;
        this.intervalId = window.setInterval(() => {
            runInAction(() => {
                if (this.index >= this.content.length - 1) {
                    this.pause();
                } else {
                    this.index += 1;
                }
            });
        }, this.intervalDuration);
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        this.isPlaying = false;
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        runInAction(() => {
            this.isPlaying = false;
            this.index = 0;
        });
    }

    restart() {
        this.stop();
        this.play();
    }

    setIndex(index: number) {
        this.index = index;
    }
}

const defaultStory = stories[1];
export const textPlayerStore = new TextPlayerStore(defaultStory);
