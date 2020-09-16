import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'


import Task from './task'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1; // fill the available space
  min-height: 100px; // if all lists are empty, you can still drop something onto it (height will be greater than zero)
`

export default class Column extends React.Component {
  render() {
    return (
      <div
        css={css`
          margin: 8px;
          border: 1px solid lightgrey;
          border-radius: 2px;
          min-width: 300px;

          display: flex; // this adds height to tasklist in other columns, do allow for droppable area
          flex-direction: column;
        `}
      >
        <h3
          css={css`
            padding: 8px;
          `}
        >
          {this.props.column.title}
        </h3>
        {/* <Droppable droppableId={this.props.column.id}> direction="horizontal"*/}

        <Droppable droppableId={this.props.column.id}>
          {/* Render props pattern expected by react-beautiful-dnd */}
          {(provided, snapshot) => (
            <TaskList
              // innerRef={provided.innerRef}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </div>
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
