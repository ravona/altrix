import { Story } from '../types/types';

import styles from './Player.module.scss';

const Player: React.FC<Story> = (props) => {
  return (
    <div key={props.id} className={styles['Player']}>
      <header className={styles['Player__Header']}>
        <h3>{props.name}</h3>
        <h4>{props.source}</h4>
      </header>
      <article className={styles['Player__Screen']}>{props.content}</article>
      <footer className={styles['Player__Footer']}>Footer</footer>
    </div>
  );
};

export default Player;
