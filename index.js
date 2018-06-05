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
        return state.filter.concat([action.todo])
    }
}