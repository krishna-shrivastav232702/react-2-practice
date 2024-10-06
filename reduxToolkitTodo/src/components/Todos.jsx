import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from "../features/Todo/todoSlice"

function Todos() {
    // useSelector(()=>) or
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    return (
        <>
        <div className='mt-2  text-xl font-bold text-gray-700'>Todos</div>
        {
            todos.map((todo)=>(
                <li key={todo.id}>
                    {todo.text}
                    <button  className="px-6 py-2 bg-red-600 rounded m-4 text-white "  onClick={()=> dispatch(removeTodo(todo.id))}>remove</button>
                </li>
            ))
        }
        </>
    )
}

export default Todos