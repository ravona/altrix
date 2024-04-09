import { regexRules } from './logic'
import { Story } from './types/types'

export class TextPlayer {
    public content: string[]
    private index: number = 0
    private isPlaying: boolean = false
    private intervalId: number | null = null
    private intervalSpeed: number = 1000
    private onChangeCallback: (index: number, isPlaying: boolean) => void

    constructor(
        story: Story,
        onChangeCallback: (index: number, isPlaying: boolean) => void,
    ) {
        this.onChangeCallback = onChangeCallback
        this.content = this.splitTextWithRegex(
            story.content,
            regexRules.sentences,
        )
    }

    private splitTextWithRegex(text: string, regex: RegExp): string[] {
        return text.split(regex)
    }

    private updateState() {
        this.onChangeCallback(this.index, this.isPlaying)
    }

    play() {
        if (this.isPlaying) return

        this.isPlaying = true
        this.intervalId = window.setInterval(() => {
            this.index = (this.index + 1) % this.content.length
            this.updateState()
            if (this.index === this.content.length - 1) {
                this.pause()
            }
        }, this.intervalSpeed)
    }

    pause() {
        if (!this.isPlaying) return

        if (this.intervalId) clearInterval(this.intervalId)
        this.isPlaying = false
        this.updateState()
    }

    stop() {
        if (this.intervalId) clearInterval(this.intervalId)
        this.isPlaying = false
        this.index = 0
        this.updateState()
    }

    seek(newIndex: number) {
        this.index = newIndex
        this.updateState()
    }
}

export default TextPlayer
