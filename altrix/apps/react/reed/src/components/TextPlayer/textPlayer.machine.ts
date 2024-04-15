import { assign, createMachine } from 'xstate';

export const textPlayerMachine = createMachine({
    id: 'textPlayer',
    context: {
        index: 0,
        isPlaying: false,
    },
    states: {
        stopped: {
            on: {
                PLAY: {
                    target: 'playing',
                    actions: assign({ isPlaying: true }),
                },
                SET_INDEX: {
                    actions: assign({
                        index: ({ event }) => event.index,
                    }),
                },
            },
        },
        playing: {
            on: {
                FRAME: {
                    actions: assign({
                        index: ({ context }) => context.index + 1,
                    }),
                },
                PAUSE: {
                    target: 'paused',
                    actions: assign({ isPlaying: false }),
                },
                STOP: {
                    target: 'stopped',
                    actions: assign({ isPlaying: false, index: 0 }),
                },
                SET_INDEX: {
                    actions: assign({
                        index: ({ event }) => event.index,
                    }),
                },
            },
            invoke: {
                src: 'frames',
            },
        },
        paused: {
            on: {
                PLAY: {
                    target: 'playing',
                    actions: assign({ isPlaying: true }),
                },
                STOP: {
                    target: 'stopped',
                    actions: assign({ isPlaying: false, index: 0 }),
                },
                SET_INDEX: {
                    actions: assign({
                        index: ({ event }) => event.index,
                    }),
                },
            },
        },
    },
    initial: 'stopped',
});
