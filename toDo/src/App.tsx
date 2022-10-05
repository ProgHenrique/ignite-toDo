import { Header } from "./components/Header";

import styles from './App.module.css';
import './global.css'

import { PlusCircle } from "phosphor-react";
import { Todo } from "./components/Todo";
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { WithoutTodo } from "./components/WithoutTodo";
import axios from "axios";

interface IToDos {
  id: string;
  content: string;
  isConcluded: boolean;
}

export function App() {
  const [toDos, setToDos] = useState<IToDos[]>([])
  const [newToDoText, setNewToDoText] = useState('')

  useEffect(() => {
    axios('http://localhost:3333/todos').then(response => {
      setToDos(response.data)
    })
  }, [handleCreateToDo])

  function handleCreateToDo(event: FormEvent) {
    event.preventDefault()

    axios.post('http://localhost:3333/todos', {
      content: newToDoText
    })

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

    axios.patch(`http://localhost:3333/todos/concluded/${id}`, {
      isConcluded: isConcluded,
    })

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
    axios.delete(`http://localhost:3333/todos/${toDoToDelete}`)

    setToDos(state => { return state.filter(todo => todo.id !== toDoToDelete) })
  }

  const isNewTodoEmpty = newToDoText.length === 0

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form
          onSubmit={handleCreateToDo}
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
          />
          <button type="submit" disabled={isNewTodoEmpty} >Criar <PlusCircle size={16} weight="bold" /></button>
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
