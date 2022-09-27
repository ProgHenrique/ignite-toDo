import styles from './WithoutTodo.module.css'
import Clipboard from '../../assets/Clipboard.svg'

export function WithoutTodo() {

  return (
    <div className={styles.toDoContent}>
      <div className={styles.withoutToDo} >
        <img src={Clipboard} alt="clipboard icon" />
        <div>
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      </div>
    </div>
  )
}