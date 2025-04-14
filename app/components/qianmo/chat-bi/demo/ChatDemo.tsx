import Chat from '../Chat';
import styles from './style.module.scss';

type Props = {};

const ChatDemo: React.FC<Props> = () => {
  return (
    <div className={styles.chatDemo}>
      <Chat isDeveloper />
    </div>
  );
};

export default ChatDemo;
