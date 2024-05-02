import React, { useState, useEffect, useCallback } from 'react';
import styles from './Meditation.module.scss';

type Step = {
    message: string;
    duration: number;
};

type Props = {
    variant: 'primary' | 'secondary';
    steps: Step[];
};

const Meditation = ({ steps, variant = 'primary' }: Props) => {
    const [index, setIndex] = useState(0);

    const updateStep = useCallback(() => {
        const nextIndex = (index + 1) % steps.length;
        setIndex(nextIndex);
    }, [index, steps.length]);

    useEffect(() => {
        const timeoutId = setTimeout(updateStep, steps[index].duration * 1000);
        return () => clearTimeout(timeoutId);
    }, [updateStep, steps, index]);

    return (
        <div className={`${styles.Meditation} ${styles[variant]}`}>
            <p className={styles.Message}>{steps[index].message}</p>
        </div>
    );
};

export default Meditation;
