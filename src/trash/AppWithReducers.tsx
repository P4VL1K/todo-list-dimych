import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers () {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all",  entityStatus: 'idle', order: 0, addedDate: ''}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: todolistId2, startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC({
            todoListId: todolistId,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exist'
        }))
    }
    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasksReducer(updateTaskAC(id, {status}, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }
    function removeTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, title))
    }
    function addTodolist(title: string) {
        const action = addTodolistAC({
            id: v1(),
            title: title,
            addedDate: '',
            order: 0
        })
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;