import { assign, setup, fromCallback } from 'xstate';

export const textPlayerMachine = setup({
    actors: {
        frames: fromCallback(({ sendBack }) => {
            const interval = setInterval(() => {
                sendBack({ type: 'FRAME' });
            }, 5000);
            return () => clearInterval(interval);
        }),
    },
    actions: {
        playing: assign({ isPlaying: true }),
        pausing: assign({ isPlaying: false }),
        stopping: assign({ isPlaying: false, index: 0 }),
    },
}).createMachine({
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
                    actions: ['playing'],
                },
                STOP: {
                    target: 'stopped',
                    actions: ['stopping'],
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
                    actions: ['pausing'],
                },
                STOP: {
                    target: 'stopped',
                    actions: ['stopping'],
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
                    actions: ['playing'],
                },
                STOP: {
                    target: 'stopped',
                    actions: ['stopping'],
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
