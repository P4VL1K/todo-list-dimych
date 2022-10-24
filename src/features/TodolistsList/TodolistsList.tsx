import {AppRootState, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType, removeTodolistTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, changeTaskTitleAC, removeTaskTC, updateTask} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/TodoList";
import {TasksStateType} from "../../app/App";

export const TodolistsList = () => {

    const dispatch = useAppDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask(todolistId, id, {status}))
    }, [])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistTC(id)
        dispatch(action)
    }, [])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }, [])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    }, [])

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {

                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

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
    </>
}