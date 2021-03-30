

function User(name, age) {
  this.name = name;
  this.age = age;
}

const test = new function () {
   return {
     name: 'asas'
   }
}

console.log (test.this)
