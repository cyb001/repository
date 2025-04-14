import IconFont from '../../../components/IconFont';
import styles from './style.module.scss';

const CopilotAvatar = () => {
  return <IconFont type="icon-copilot-fill" className={styles.leftAvatar} style={{color: '#282C34'}} />;
  // return <IconFont type="icon-zhinengsuanfa" className={styles.leftAvatar} />;
};

export default CopilotAvatar;
