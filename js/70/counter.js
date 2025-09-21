export const app = (function(){

    let counter = (function (){
        let count = 0
        return {
            increment: function(){count++},
            reset: function(){count = 0},
            getCount: function(){return count}
        }
    }())    

    return {counter}   
}())