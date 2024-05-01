import { assign, setup, fromCallback, sendParent } from 'xstate';

export const reedPlayerMachine = setup({
    types: {
        context: {
            index: 0,
            isPlaying: false,
            intervalId: null,
        } as {
            index: number;
            isPlaying: boolean;
            intervalId: null | number | NodeJS.Timeout;
        },
        events: {} as
            | { type: 'PLAY' }
            | { type: 'PAUSE' }
            | { type: 'STOP' }
            | { type: 'SET_INDEX'; index: number },
    },
    actions: {
        playing: assign({
            isPlaying: true,
            intervalId: ({ context }) =>
                setInterval(() => {
                    sendParent({
                        type: 'SET_INDEX',
                        index: context.index + 1,
                    });
                }, 1000),
        }),

        pausing: ({ context }) => {
            clearInterval(context.intervalId as NodeJS.Timeout);
            return {
                isPlaying: false,
                intervalId: null,
            };
        },
        stopping: assign({
            index: 0,
            isPlaying: false,
            intervalId: ({ context }) => {
                if (context.intervalId) clearInterval(context.intervalId);
                return null;
            },
        }),
        settingIndex: assign({
            index: ({ context }, event: { type: string; index: number }) =>
                event?.type === 'SET_INDEX' ? event.index : context.index,
        }),
    },
    schemas: {
        events: {
            PLAY: {
                type: 'void',
                actions: ['playing'],
            },
            PAUSE: {
                type: 'void',
                actions: ['pausing'],
            },
            STOP: {
                type: 'void',
                actions: ['stopping'],
            },
            SET_INDEX: {
                type: 'number',
                actions: ['settingIndex'],
            },
        },
        context: {
            index: {
                type: 'number',
            },
            isPlaying: {
                type: 'boolean',
            },
            intervalId: {
                type: 'NodeJS.Timeout | null',
            },
        },
    },
}).createMachine({
    id: 'reedPlayer',
    context: {
        index: 0,
        isPlaying: false,
        intervalId: null,
    },
    initial: 'stopped',
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
            },
        },
        playing: {
            on: {
                PAUSE: {
                    target: 'paused',
                    actions: ['pausing'],
                },
                STOP: {
                    target: 'stopped',
                    actions: ['stopping'],
                },
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
            },
        },
    },
});
