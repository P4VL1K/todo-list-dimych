import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {RequestStatusType} from "../app/app-reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, addTodolistAC({
        title: newTodolistTitle,
        id: v1(),
        order: 0,
        addedDate: ''
    }))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be set to the state', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status of todolist shoul be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ]

    let newStatus: RequestStatusType = 'loading'

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action)

    expect(endState[1].entityStatus).toBe('loading')
})



