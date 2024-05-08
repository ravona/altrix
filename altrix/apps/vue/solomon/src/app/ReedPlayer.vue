<template>
  <div class="ReedPlayer">
    <header class="ReedPlayer__Header">
      <h2 class="ReedPlayer__Header-Title">Story Title</h2>
      <h3 class="ReedPlayer__Header-Subtitle">Story Subtitle</h3>
    </header>

    <div class="ReedPlayer__Content">
      <div
        v-for="frame in frames"
        :key="frame.id"
        class="ReedPlayer__Frame"
        :class="{ 'is-active': frame.id === activeFrame.id }"
        @click="onClickFrame(frame)"
      >
        {{ frame.text }}
      </div>
    </div>

    <div class="ReedPlayer__Controls">
      <button class="ReedPlayer__Control" @click="stepBack">Back</button>
      <button class="ReedPlayer__Control" @click="play" v-if="!isPlaying">
        Play
      </button>
      <button class="ReedPlayer__Control" @click="stepForward">Forward</button>
      <button class="ReedPlayer__Control" @click="pause" v-if="isPlaying">
        Pause
      </button>
      <button class="ReedPlayer__Control" @click="stop" v-if="currentIndex > 0">
        Stop
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import myData from '../data.json';
import { Frame } from '@altrix/reed-core';
import '@altrix/shared-styles/shared/_index.scss';
import '@altrix/shared-styles/themes/alt/_index.scss';

const frames: Frame[] = myData;

export default {
  data() {
    return {
      frames: frames,
      isPlaying: false,
      currentIndex: 0,
      intervalId: 0,
      activeFrame: frames[0],
    };
  },
  methods: {
    play() {
      this.isPlaying = true;
      this.intervalId = setInterval(this.playNextFrame, 1000);
    },

    stepBack(frame: Frame) {
      this.currentIndex = this.currentIndex - 1;
      this.activeFrame = this.frames[this.currentIndex];
    },

    stepForward(frame: Frame) {
      this.currentIndex = this.currentIndex + 1;
      this.activeFrame = this.frames[this.currentIndex];
    },

    playNextFrame() {
      this.currentIndex = (this.currentIndex + 1) % this.frames.length;
      this.activeFrame = this.frames[this.currentIndex];
    },
    pause() {
      this.isPlaying = false;
      clearInterval(this.intervalId);
    },
    stop() {
      this.isPlaying = false;
      clearInterval(this.intervalId);
      this.currentIndex = 0;
      this.activeFrame = this.frames[0];
      this.frames = this.frames.map((frame) => ({
        ...frame,
        isActive: false,
      }));
    },
    onClickFrame(frame: Frame) {
      this.activeFrame = frame;
    },
  },
};
</script>

<style scoped lang="scss">
$player_background_color: var(--clr-primary);

$frame_font_size: var(--txt-sm);

$active_frame_font_color: var(--clr-action);
$active_frame_font_size: calc($frame_font_size + 15%);

$active_frame_sibling_font_size: calc($frame_font_size + 10%);

.ReedPlayer {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  background-color: $player_background_color;

  &__Header {
    font-family: var(--font-secondary);
    padding: var(--spacing-md);

    &-Title {
      font-size: var(--txt-lg);
      line-height: 1;
    }

    &-Subtitle {
      font-size: var(--txt-md);
      line-height: 1;
    }
  }

  &__Screen {
    overflow-y: auto;
  }

  &__Content {
    line-height: 1.618;
    font-family: var(--font-primary);
    color: var(--clr-txt2);
    padding: var(--spacing-md);
  }

  &__Frame {
    cursor: pointer;
    font-size: $frame_font_size;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
    transition: all 0.25s ease;

    &:hover {
      opacity: 1;
    }

    &:has(+ .is-active) {
      font-size: $active_frame_sibling_font_size;
      opacity: 1;
      transition: all 0.25s ease;
    }

    &.is-active {
      opacity: 1;
      transition: all 0.25s ease;
      font-size: $active_frame_font_size;
      color: $active_frame_font_color;
    }

    &.is-active + & {
      font-size: $active_frame_sibling_font_size;
      opacity: 1;
      transition: all 0.25s ease;
    }
  }

  &__Footer {
    z-index: var(--z-high);
    padding: var(--spacing-md);
    font-family: var(--font-secondary);
  }

  &__Controls {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    padding-block: var(--spacing-md);
  }

  &__Control {
    color: var(--clr-action);
    &:hover {
      color: lightem(var(--clr-action), 10%);
    }
  }

  &__Slider {
    width: 100%;
    padding: var(--spacing-md);
  }

  &__Playlist {
    display: grid;
    gap: var(--spacing-md);
  }

  &__PlaylistItem {
    cursor: pointer;
    font-size: var(--txt-sm);
    opacity: 0.5;
    transition: all 0.25s ease;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
