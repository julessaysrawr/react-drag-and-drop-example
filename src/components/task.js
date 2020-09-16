import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Draggable } from 'react-beautiful-dnd'


// couldn't figure out how to do the conditional with css prop, so using styled div
const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDragging ? '#80c4b6' : 'white')};
`

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // innerRef={provided.innerRef}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <p>{this.props.task.content}</p>
          </Container>
        )}
      </Draggable>
    )
  }
}

// example snapshots
//Draggable
// const draggableSnapshot = {
//   isDragging: true,
//   draggingOver: 'column-1'
// }

//Drobbale
// const droppableSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1'
// }
