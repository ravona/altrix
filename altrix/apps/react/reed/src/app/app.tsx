import ReedPlayerComponent from '../components/ReedPlayer/ReedPlayer';
import { ReedPlayerProvider } from '../components/ReedPlayer/ReedPlayerContext';
import stories from '../data/stories.json';

export function App() {
    return (
        <main className="app">
            <ReedPlayerProvider>
                <ReedPlayerComponent stories={stories} />
            </ReedPlayerProvider>
        </main>
    );
}

export default App;
