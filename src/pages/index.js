import React from "react"
import initialData from "../components/initial-data"
import Column from "../components/column"
import { DragDropContext } from "react-beautiful-dnd"
import { Global, css } from "@emotion/core"

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//   </Layout>
// )

// export default IndexPage

class IndexPage extends React.Component {
  state = initialData

  // onDragStart
  // onDragupdate

  // example result object
  // const result = {
  //   draggableID: 'task-1',
  //   type: 'TYPE',
  //   reason: "DROP",
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0
  //   },
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1
  //   }
  // }
  onDragEnd = result => {
    console.log("result: ", result)

    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    // user dropped item back into the position it started in and we don't need to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // console.log('this.state.columns: ', this.state.columns)

    // const column = this.state.columns[source.droppableId]
    const startColumn = this.state.columns[source.droppableId]
    const finishColumn = this.state.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(finishColumn.taskIds)

      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...finishColumn,
        taskIds: newTaskIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      }

      this.setState(newState)
    }

    // moving from one list to another

    const startTaskIds = Array.from(startColumn.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finishColumn.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }

    this.setState(newState)
    return
  }

  render() {
    // console.log('state: ', this.state.columns)

    return (
      <div>
        <Global
          styles={css`
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Helvetica, Arial, sans-serif, "Apple Color Emoji",
                "Segoe UI Emoji", "Segoe UI Symbol";
            }
          `}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div
            css={css`
              display: flex;
            `}
          >
            {this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(
                taskId => this.state.tasks[taskId]
              )

              
              return <Column key={column.id} column={column} tasks={tasks} />
            })}
          </div>
        </DragDropContext>
      </div>
    )
  }
}


export default IndexPage
