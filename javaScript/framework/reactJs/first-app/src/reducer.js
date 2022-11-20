const ADD = 'ADD'

function reducer(state, action){
    switch (action.type){
        case ADD:
            return [...state, {id: 'lol', time: 2}]
        default:
            return state
    }
}

const test = reducer([{id: 5, r: 'jofruifnuirnfur'}], action={type:'ADD'})