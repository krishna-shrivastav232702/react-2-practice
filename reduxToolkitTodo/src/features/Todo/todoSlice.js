import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{
        id: nanoid(),
        text: "Learn about redux toolkit",
    },]
}

function sayHello() {
    console.log("Hello");
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        //reducers are functionality , it is an object comes with property and function
        // addTodo:sayHello,
        // difference btw redux and context  is that here we declare the function definition in the reducers but in 
        //context we donot declare the function
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
    }
})

export const {addTodo,removeTodo}=todoSlice.actions

export default todoSlice.reducer