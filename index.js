function createStore(){
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