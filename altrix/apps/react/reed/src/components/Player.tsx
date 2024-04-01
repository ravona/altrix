import { Story } from '../types/types';

import styles from './Player.module.scss';

const Player: React.FC<Story> = (props) => {
  return (
    <div className={styles['Player']}>
      <div key={props.id}>
        <h3>{props.name}</h3>
        <h4>{props.source}</h4>
        <article>{props.content}</article>
      </div>
    </div>
  );
};

export default Player;
