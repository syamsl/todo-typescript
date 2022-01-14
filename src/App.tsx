import React,{ FC,ChangeEvent, useState } from 'react';
import './App.css';
import {ITask} from './interfaces';
import TodoTask from './Components/TodoTask';

const App:FC = () =>{

  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.name==='task') setTask(event.target.value);
    else if(event.target.name==='deadline') setDeadline(Number(event.target.value));
  }

  const addTask = (): void => {
    const newTask = {taskName:task, deadline:deadline};
    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
    console.log(todo)
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName != taskNameToDelete;
    }))
  }

  return (
    <div className="App">
      <h1>TODO</h1>
      <div className='header'>
        <div className='inputContainer'>

          <input 
          type='text' 
          placeholder='What needs to be done?' 
          name="task" 
          value={task}
          onChange={handleChange}/>

          <input 
          type='number' 
          placeholder='Days?'
          name="deadline" 
          value={deadline}
          onChange={handleChange}/>

        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todo.map((task:ITask, key:number)=>{
          return <TodoTask key={key} task={task} completeTask={completeTask}/>
        })}
      </div>

    </div>
  );
}

export default App;
