window.myWrapper = function(myArray){
    function myMap(callback){
        for (let i = 0; i < myArray.length; i++) {
            myArray[i] = callback(myArray[i]);
        }
    }
    
    return {
        getArray(){return myArray},
        myMap,
    }
}