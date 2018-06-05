function createStore(reducer){
    let state;
    let listeners = [];
    
    const getState = () => state;
    const subScribe = (listener) => {
        listeners.push(listener);
        return  () => {
            listeners = listeners.filter((l) => l !== listeners )
        }
    }
    const dispatch = (action) =>{
        state= reducer(state,action);
        listeners.forEach((listener) => listener())
    }

    return{
        getState,
        subScribe,
        dispatch
    }
}

//App Code
function todo(state =[], action){
    switch(action.type){
        case "ADD_TODO":
        return state.concat([action.todo])
        case "REMOVE_TODO":
        return state.filter((todo) => todo.id !== action.id)
        case "TOGGLE_TODO":
        return state.map((todo) => todo.id !== action.id ? todo :
            Object.assign({},todo,{complete: !todo.complete})
        )
        default :
        return state
    }
}

function goals(state=[], action){
    switch(action.type){
        case "ADD_GOAL":
        return state.concat([action.goal])
        case "REMOVE_TODO":
        return state.filter((goal) => goal.id !== action.id)
        default:
        return state
    }
}

function app(state={} , action){
    return{
        todos:todos(state.todos, acton),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app);

store.subScribe(() => {
    console.log("The New State is:" ,store.getState())
})

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 0,
        name: "LearnRedux",
        complete: false
    }
})

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 1,
        name: "Read a Book",
        complete: true

    }
})

store.dispatch({
    type: "ADD_TODO",
    todo: {
        id: 2,
        name: "Take DOg out",
        complete: false
    }
})
store.dispatch({
    type: "REMOVE_TODO",
    id: 0
})
store.dispatch({
    type: "ADD_GOAL",
    goal: {
        id: 0,
        name: "Reduce weight",
    }
})

store.dispatch({
    type: "TOGGLE_TODO",
    id: 2
})

store.dispatch({
    type: "ADD_GOAL",
    goal: {
        id: 1,
        name: "Play Cricket",
    }
})
store.dispatch({
    type: "REMOVE_GOAL",
    id: 0
})
