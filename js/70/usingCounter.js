import {app} from './counter.js' 
import {app as app2} from './createCounter.js'

const aCounter = app2.createCounter()
const aCounter2 = app2.createCounter()
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