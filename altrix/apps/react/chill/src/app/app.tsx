import Meditation from '../components/Meditation/Meditation';
import styles from './app.module.scss';

export function App() {
    return (
        <div className={styles['wrapper']}>
            <Meditation
                steps={[
                    { message: 'Breath In', duration: 3 },
                    { message: 'Hold', duration: 2 },
                    { message: 'Breath out', duration: 3 },
                ]}
                variant="primary"
            />
        </div>
    );
}

export default App;
