export const app = (function(){
    let counter = (function (){
        let count = 0
        function increment(){
            count++
        }
        function reset(){
            count = 0
        }
        function getCount(){
            return count
        }
        return {
            increment,
            reset,
            getCount
        }
    }())
    
    return {counter}
    
}())