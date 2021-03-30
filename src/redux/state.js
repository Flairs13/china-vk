// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";


export const store = {

    _state: {
        profilePage: {

            posts: [
                {id: '1', message: 'Hi', likeCounter: 11},
                {id: '2', message: 'How are you?', likeCounter: 5},
                {id: '3', message: 'Good luck', likeCounter: 6},
                {id: '4', message: 'bye', likeCounter: 1},
                {id: '5', message: 'i learn react', likeCounter: 12},
                {id: '6', message: 'Sochnaya', likeCounter: 31},
            ],

            newPostText: 'saf'



        },
        dialogsPage: {

            dialogs: [
                {id: '1', name: 'Andrew',},
                {id: '2', name: 'Aik',},
                {id: '3', name: 'Stasyan',},
                {id: '4', name: 'Dimas',},
                {id: '5', name: 'Musa',},
                {id: '6', name: 'Colbasa',},
            ],


            messages: [
                {id: '1', message: 'Hi',},
                {id: '2', message: 'How are you?',},
                {id: '3', message: 'Good luck',},
                {id: '4', message: 'bye',},
                {id: '5', message: 'i learn react',},
                {id: '6', message: 'Sochnaya',},

            ],

            newMessageText: 'ss'
        },
    },

    getState () {
        return this._state
    },


    subscribe (observer) {
        this.renderEntireTree = observer
    },


    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this.renderEntireTree(this._state)
    }
}








