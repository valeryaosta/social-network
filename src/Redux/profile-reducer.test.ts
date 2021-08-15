import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";


test('new post should be added', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra')
    let state: any = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 17},
            {id: 2, message: "It's my first post!", likesCount: 28},
            {id: 3, message: "Finally here I am!", likesCount: 11},
            {id: 4, message: "Yo Yo man", likesCount: 3}
        ]
    }
    // 2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(5)

})

test('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra')
    let state: any = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 17},
            {id: 2, message: "It's my first post!", likesCount: 28},
            {id: 3, message: "Finally here I am!", likesCount: 11},
            {id: 4, message: "Yo Yo man", likesCount: 3}
        ]
    }
    // 2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts[4].message).toBe('it-kamasutra')

})

test('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra')
    let state: any = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 17},
            {id: 2, message: "It's my first post!", likesCount: 28},
            {id: 3, message: "Finally here I am!", likesCount: 11},
            {id: 4, message: "Yo Yo man", likesCount: 3}
        ]
    }
    // 2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts[4].message).toBe('it-kamasutra')

})

test('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)
    let state: any = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 17},
            {id: 2, message: "It's my first post!", likesCount: 28},
            {id: 3, message: "Finally here I am!", likesCount: 11},
            {id: 4, message: "Yo Yo man", likesCount: 3}
        ]
    }
    // 2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(3)

})

test('after deleting length of messages should not be decrement if id is not correct', () => {
    // 1. test data
    let action = deletePost(1000)
    let state: any = {
        posts: [
            {id: 1, message: "Hi, how are you?", likesCount: 17},
            {id: 2, message: "It's my first post!", likesCount: 28},
            {id: 3, message: "Finally here I am!", likesCount: 11},
            {id: 4, message: "Yo Yo man", likesCount: 3}
        ]
    }
    // 2. action
    let newState = profileReducer(state, action)
    //3. expectation
    expect(newState.posts.length).toBe(3)

})
