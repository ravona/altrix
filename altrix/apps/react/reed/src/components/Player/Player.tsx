import { Story } from '../../logic/types/types';

import styles from './Player.module.scss';

const Player: React.FC<Story> = (props) => {
  return (
    <article key={props.id} className={styles['Player']}>
      <header className={styles['Player__Header']}>
        <h2 className={styles['Player__Title']}>{props.name}</h2>
        <h3 className={styles['Player__Subtitle']}>{props.source}</h3>
      </header>
      <div className={styles['Player__Screen']}>
        <div className={styles['Player__Content']}>{props.content}</div>
      </div>
      <footer className={styles['Player__Footer']}>[Menu Goes Here]</footer>
    </article>
  );
};

export default Player;
