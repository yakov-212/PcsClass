import {myApp} from './counter.js'
import {myCreatorApp} from './createCounter.js'
const app = myApp()
const creatorApp = myCreatorApp()
const aCounter = creatorApp.createCounter()
const aCounter2 = creatorApp.createCounter()
for (let index = 0; index < 10; index++) {
    app.counter.increment();
    aCounter.increment()
}
for (let index = 0; index < 5; index++) {
    aCounter.increment()
    aCounter2.increment()
}
console.log("app count: ",app.counter.getCount())
console.log(`aCounter count: ${aCounter.getCount()} there are ${aCounter.howMany()} counters`)
console.log(`aCounter2 count: ${aCounter2.getCount()} there are ${aCounter2.howMany()} counters`)