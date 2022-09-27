import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, Trash } from 'phosphor-react';
import { useEffect, useState } from "react"

import styles from './Todo.module.css'

interface TodoProps {
  content: string;
  id: string
  onDeleteToDo: (toDo: string) => void;
  onConcludedToDo: (isConcluded: boolean, id: string) => void;
}

export function Todo({ content, onDeleteToDo, onConcludedToDo, id }: TodoProps) {

  const [concludedToDo, setConcludedToDo] = useState<boolean>(false)

  function handleDeleteToDo() {
    onDeleteToDo(id)
  }

  return (
    <div className={styles.toDo} >
      <Checkbox.Root
        checked={concludedToDo}
        onCheckedChange={(checked) => {
          if (checked === true) {
            setConcludedToDo(true)
            onConcludedToDo(true, id)
          } else {
            setConcludedToDo(false)
            onConcludedToDo(false, id)
          }
        }}
        className={styles.checkbox}
      >
        <Checkbox.Indicator>
          <Check className={styles.checkIcon} weight='bold' />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className={!concludedToDo ? styles.textToDo : styles.textToDoConcluded}>
        <p>
          {content}
        </p>
      </div>


      <button title='Deletar tarefa' onClick={handleDeleteToDo} className={styles.toDoTrashButton}><Trash size={18} /></button>

    </div>
  )
}