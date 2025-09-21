export const app = (function (){
    let many = 0

    function createCounter(){
        let count = 0
        many++
        return {
            increment: function(){count++},
            reset: function(){count = 0},
            getCount: function(){return count},
            howMany: function(){return many},
        }
    }
    
    return {createCounter}
}())