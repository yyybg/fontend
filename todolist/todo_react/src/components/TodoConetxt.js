import React from 'react'

const TodoContext = React.createContext({
    onDelete: () => {},
    onUpdate: () => {},
})

export default TodoContext
