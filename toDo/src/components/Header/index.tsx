import styles from './Header.module.css';
import toDoLogo from '../../assets/rocket.svg';

export function Header() {

  return (
    <header className={styles.header}>
      <div>
        <img src={toDoLogo} alt="LogoTipo do toDo" />
        <strong><span>to</span>do</strong>
      </div>
    </header>
  )
}