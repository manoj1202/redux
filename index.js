function createStore(){
    let state;
    let listeners = [];
    
    const getState = () => state;
    const subScribe = (listener) => {
        listeners.push(listener);
    }

    return{
        getState
    }
}