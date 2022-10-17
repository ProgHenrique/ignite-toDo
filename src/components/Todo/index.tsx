import * as Checkbox from '@radix-ui/react-checkbox';
import { Check, Trash } from 'phosphor-react';
import { useEffect, useState } from "react"

import styles from './Todo.module.css'

interface TodoProps {
  content: string;
  id: string
  isConcluded: boolean;
  onDeleteToDo: (toDo: string) => void;
  onConcludedToDo: (isConcluded: boolean, id: string) => void;
}

export function Todo({ content, onDeleteToDo, onConcludedToDo, id, isConcluded }: TodoProps) {

  function handleDeleteToDo() {
    onDeleteToDo(id)
  }

  return (
    <div className={styles.toDo} >
      <Checkbox.Root
        checked={isConcluded}
        onCheckedChange={(checked) => {
          if (checked === true) {
            onConcludedToDo(true, id)
          } else {
            onConcludedToDo(false, id)
          }
        }}
        className={styles.checkbox}
      >
        <Checkbox.Indicator>
          <Check className={styles.checkIcon} weight='bold' />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <div className={!isConcluded ? styles.textToDo : styles.textToDoConcluded}>
        <p>
          {content}
        </p>
      </div>


      <button title='Deletar tarefa' onClick={handleDeleteToDo} className={styles.toDoTrashButton}><Trash size={18} /></button>

    </div>
  )
}