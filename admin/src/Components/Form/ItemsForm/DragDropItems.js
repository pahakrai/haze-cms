import React, { PureComponent } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class DragDropItems extends PureComponent {
  render() {
    const { children: data, onDragEnd, isDropDisabled } = this.props;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" isDropDisabled={isDropDisabled}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {data &&
                data.length &&
                data.map((item, index) => (
                  <Draggable
                    key={`item-${index}`}
                    draggableId={`${index}`}
                    index={index}
                    isDragDisabled={isDropDisabled}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          backgroundColor: snapshot.isDragging ? '#eee' : '',
                          ...provided.draggableProps.style
                        }}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragDropItems;
