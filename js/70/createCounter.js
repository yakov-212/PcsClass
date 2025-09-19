export function myCreatorApp(){
    let many = 0
    function createCounter(){
        let count = 0
        many++
        function increment(){
            count++
            return this
        }
        function reset(){
            count = 0
        }
        function getCount(){
            return count
        }
        function howMany(){
            return many
        }
        return {
            increment,
            reset,
            getCount,
            howMany,
        }
    }
    
    return {createCounter}
    
}