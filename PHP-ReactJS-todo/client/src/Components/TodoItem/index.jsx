import React, { useState } from 'react';


const TodoItem = ({ itemUuid, children, onChangeActiveTodo }) => {
    const [UUID] = useState(itemUuid);

    const onOpenPopover = event => {
        onChangeActiveTodo(UUID, true);
        event.stopPropagation();
    };

    return (
        <div key = {UUID} onClick = {onOpenPopover} className = 'todo-item'>
           {children}
        </div>
    );
};

export default TodoItem;