import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoItem = ({ itemUuid, children, onChangeActiveTodo, color = "", index }) => {
    const [UUID] = useState(itemUuid);

    const onOpenPopover = event => {
        onChangeActiveTodo(UUID, true);
        event.stopPropagation();
    };

    return (
        <Draggable key={UUID} draggableId={UUID} index={index}>
        {(provided, snapshot) => (
        <div 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key = {UUID} 
            onClick = {onOpenPopover} 
            className = {classnames('todo-item', color)}
        >
            <React.Fragment>
                {children}
                {provided.placeholder}
           </React.Fragment>
        </div>
        )}
        </Draggable>
    );
};

export default TodoItem;