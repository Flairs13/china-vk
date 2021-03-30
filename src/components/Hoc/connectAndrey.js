
class Observer {
    constructor (observable) {
        this.arr = [];
        this.observable = observable
    }

    subscribe = (fn) => {
        this.arr.push (fn)
        return this
    }

    dispatch = (fn) => {
        this.observable =  fn(this.observable)
        this.arr.forEach (fn => fn(this.observable))

    }
}

const obj = new Observer ({
                              name: 'Vasya',
                              age: 18,
                              secondName: 'huj'
                          });


obj.subscribe ((o) => {
    console.log (o.name)
})

obj.subscribe ((o) => {
    console.log (o.age)
})


// console.log (obj)
obj.dispatch((o) => ({...o, age: 19}))