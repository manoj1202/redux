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

    return{
        getState,
        subScribe
    }
}