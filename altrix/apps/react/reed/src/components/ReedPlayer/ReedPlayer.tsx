import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SettingsIcon from '@mui/icons-material/Settings';

// react:
import React, {
    ChangeEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

// types:
import {
    Story,
    Frame,
    PlayerOptions,
    PlayerSpeed,
} from '../../logic/types/types';

// styles:
import styles from './ReedPlayer.module.scss';
import ReedPlayer from '../../logic/ReedPlayer';
import ReedPlayerSlider from './components/ReedPlayerSlider/ReedPlayerSlider';
import ReedPlayerHeader from './components/ReedPlayerHeader/ReedPlayerHeader';
import ReedPlayerContent from './components/ReedPlayerContent/ReedPlayerContent';
import ReedPlayerControls from './components/ReedPlayerControls/ReedPlayerControls';
import ReedPlayerOptions from './components/ReedPlayerOptions/ReedPlayerOptions';
import { ReedPlayerContext } from './ReedPlayerContext';

type Props = {
    stories: Story[];
    story?: Story;
};

type PlayerState = {
    story: Story | null;
    frames: Frame[];
    activeFrame: Frame | null;
    isPlaying: boolean;
    playerOptions: PlayerOptions;
};

const ReedPlayerComponent: React.FC<Props> = (props: Props) => {
    const {
        activeFrame,
        setActiveFrame,
        ourStories,
        activeStory,
        setActiveStory,
        index,
        setIndex,
        isPlaying,
        setIsPlaying,
    } = useContext(ReedPlayerContext);

    const defaultStory = props.stories[0];

    const playerRef = useRef<ReedPlayer>(
        new ReedPlayer(activeStory || defaultStory),
    );
    const containerRef = useRef<HTMLDivElement>(null);

    // const [currentStory, setCurrentStory] = useState<Story | null>(
    //     playerRef.current.getStory(),
    // );

    const [frames, setFrames] = useState<Frame[]>(
        playerRef.current.getFrames(),
    );

    // const [activeFrame, setActiveFrame] = useState<Frame | null>(
    //     playerRef.current.getActiveFrame(),
    // );

    // const [index, setIndex] = useState<number>(
    //     playerRef.current.getIndex() || 0,
    // );

    // const [isPlaying, setIsPlaying] = useState(
    //     playerRef.current.getIsPlaying(),
    // );

    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const [playerOptions, setPlayerOptions] = useState<PlayerOptions>({
        speed: 1000,
        theme: 'primary',
        mode: 'auto',
        splitPattern: 'sentences',
    });

    // toggle options:
    const [showPlayerOptions, setShowPlayerOptions] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    useEffect(() => {
        if (activeStory) {
            const player = new ReedPlayer(activeStory);
            playerRef.current = player;

            setFrames(player.getFrames());
            setIndex(player.getIndex());
            setIsPlaying(player.getIsPlaying());
            setActiveFrame(player.getActiveFrame());
        }
    }, [activeStory]);

    useEffect(() => {
        if (frames.length === 0) return;
        setActiveFrame(frames[index]);
    }, [index]);

    useEffect(() => {
        activeFrame?.id &&
            containerRef.current
                ?.querySelector(`#${activeFrame.id}`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [activeFrame]);

    useEffect(() => {
        if (isPlaying) {
            const id = setInterval(handleAutoFrameChange, playerOptions.speed);
            setIntervalId(id);
        } else {
            clearInterval(intervalId as NodeJS.Timeout);
        }

        return () => {
            clearInterval(intervalId as NodeJS.Timeout);
        };
    }, [isPlaying, playerOptions.speed]);

    const handlePause = () => {
        if (!isPlaying) return;
        setIsPlaying(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    const handlePlay = () => {
        if (isPlaying) return;
        setIsPlaying(true);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setIndex(0);
        if (intervalId) {
            clearInterval(intervalId);
        }
    };

    const handlePrevFrame = () => {
        if (index === 0) return;
        setIndex(index - 1);
    };

    const handleNextFrame = () => {
        if (index === frames.length - 1) return;
        setIndex(index + 1);
    };

    const handleTogglePlayerOptions = () => {
        setShowPlayerOptions(!showPlayerOptions);
    };

    const handleToggleShowPlaylist = () => {
        setShowPlaylist(!showPlaylist);
    };

    const handleChangeIndex = (i: number) => {
        setIndex(i);
        setActiveFrame(playerRef.current.getFrames()[i]);
    };

    const handleClickFrame = (frame: Frame) => {
        const index = frames.findIndex((f) => f.id === frame.id);
        setIndex(index);
        setActiveFrame(frame);
    };

    const handleAutoFrameChange = () => {
        if (index === frames.length - 1) {
            handleStop();
            return;
        }

        setIndex((prevIndex: number) => {
            const newIndex = prevIndex + 1;
            setActiveFrame(frames[newIndex]);
            console.log('index', newIndex);
            console.log('active frame', activeFrame?.text);
            return newIndex;
        });
    };

    const handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
        const speed = Number(event.target.value) as PlayerSpeed;
        setPlayerOptions((prev: PlayerOptions) => ({
            ...prev,
            speed: speed,
        }));
    };

    return (
        <article className={styles['ReedPlayer']}>
            <ReedPlayerHeader
                name={activeStory?.name || ''}
                source={activeStory?.source}
            />
            <div className={styles['ReedPlayer__Screen']} ref={containerRef}>
                <ReedPlayerContent
                    frames={frames}
                    activeFrame={activeFrame}
                    onClickFrame={(frame: Frame) => handleClickFrame(frame)}
                />
            </div>
            <footer className={styles['ReedPlayer__Footer']}>
                <ReedPlayerSlider
                    min={0}
                    max={frames.length - 1}
                    value={index}
                    onChange={(i: number) => handleChangeIndex(i)}
                />

                <ReedPlayerControls
                    onPrevFrame={handlePrevFrame}
                    onNextFrame={handleNextFrame}
                    onPause={handlePause}
                    onPlay={handlePlay}
                    onStop={handleStop}
                />

                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={handleTogglePlayerOptions}
                >
                    <SettingsIcon />
                </button>

                {showPlayerOptions && (
                    <ReedPlayerOptions
                        onChangeMode={() => console.log('mode changed')}
                        onChangeSpeed={() => console.log('speed changed')}
                        onChangeTheme={() => console.log('theme changed')}
                    />
                )}

                <button
                    className={styles['ReedPlayer__Control']}
                    type="button"
                    onClick={handleToggleShowPlaylist}
                >
                    {showPlaylist ? (
                        <PlaylistRemoveIcon />
                    ) : (
                        <PlaylistPlayIcon />
                    )}
                </button>

                {showPlaylist && (
                    <ol className={styles['ReedPlayer__Playlist']}>
                        {ourStories.map((story: Story) => (
                            <li
                                className={styles['ReedPlayer__PlaylistItem']}
                                key={story.id}
                            >
                                <button
                                    className="button"
                                    type="button"
                                    onClick={() => setActiveStory(story)}
                                >
                                    {story.name}
                                </button>
                            </li>
                        ))}
                    </ol>
                )}
            </footer>
        </article>
    );
};

export default ReedPlayerComponent;
