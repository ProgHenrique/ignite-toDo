import { Header } from "./components/Header";

import styles from './App.module.css';
import './global.css'

import { PlusCircle } from "phosphor-react";
import { Todo } from "./components/Todo";
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { WithoutTodo } from "./components/WithoutTodo";

interface IToDos {
  id: string;
  content: string;
  isConcluded: boolean;
}

export function App() {
  const [toDos, setToDos] = useState<IToDos[]>(() => {
    const storedStateJSON = localStorage.getItem('@ignite-todo:todos-1.0.0',)

    if (storedStateJSON) {
      return JSON.parse(storedStateJSON)
    }

    return []

  })
  const [newToDoText, setNewToDoText] = useState('')

  useEffect(() => {
    const stateJSON = JSON.stringify(toDos)
    localStorage.setItem('@ignite-todo:todos-1.0.0', stateJSON)
  }, [toDos])

  function handleCreateToDo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setToDos(state => [...state, {
      id: String(new Date().getTime()),
      content: newToDoText,
      isConcluded: false,
    }])

    setNewToDoText('')
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewToDoText(event.target.value)
  }

  function handleNewToDoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse Campo é Obrigatório!')
  }

  function toDoToBeConcluded(isConcluded: boolean, id: string) {

    setToDos((state) =>
      state.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isConcluded: isConcluded }
        } else {
          return todo
        }
      })
    )
  }

  function deleteToDo(toDoToDelete: string) {
    setToDos(state => { return state.filter(todo => todo.id !== toDoToDelete) })
  }

  const isNewTodoEmpty = newToDoText.length === 0

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form
          onSubmit={(e) => handleCreateToDo(e)}
          className={styles.contentForm}
        >
          <input
            name="toDo"
            value={newToDoText}
            onChange={handleNewTodoChange}
            placeholder="Adicione uma nova tarefa"
            type="text"
            onInvalid={handleNewToDoInvalid}
            required
            maxLength={160}
          />
          <button type="submit" disabled={isNewTodoEmpty} >Criar<PlusCircle size={16} weight="bold" /></button>
        </form>

        <div>
          <div className={styles.toDoContainer} >
            <div className={styles.toDoCreated}>
              <p>Tarefas criadas</p>
              <span>{toDos.length}</span>
            </div>
            <div className={styles.toDoConcluded}>
              <p>Concluídas</p>
              <span>{(toDos.filter(toDo => { return toDo.isConcluded !== false }).length)} de {toDos.length}</span>
            </div>
          </div>

          {toDos.length < 1 ? <WithoutTodo /> :
            <div className={styles.toDoContent}>
              {
                toDos.map(toDo => {
                  return (
                    <Todo
                      key={toDo.id}
                      content={toDo.content}
                      id={toDo.id}
                      isConcluded={toDo.isConcluded}
                      onDeleteToDo={deleteToDo}
                      onConcludedToDo={toDoToBeConcluded}
                    />
                  )
                })
              }
            </div>
          }

        </div>
      </div>
    </div >
  )
}
