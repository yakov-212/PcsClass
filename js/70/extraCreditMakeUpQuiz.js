(function (){
    /*use strict*/
    let getRandom = (len) => Math.floor((Math.random()*len))
    let id = 0
    let maleName = ["bob","Jeff","steven","kyle","jafar"]
    let womenName = ["sarah","samantha","jennifer","viki","jules"]
    let lastName = ["smith","goldstein","silver","green","jackson"]
    let people = []
    function createPerson(){

        return {
            firstName: id%2 ? maleName[getRandom(maleName.length)] : womenName[getRandom(womenName.length)],
            lastName: lastName[getRandom(lastName.length)],
            gender: id%2 ? "M" : "F",
            id: id++,
            
        }
    
    }
    for(let i = 0; i<20;i++){
        people.push(createPerson())
    }
    function match(x){
        nOrP = x.id%2 ? -1 : 1
        x.spouse = `${people[x.id + nOrP].firstName} ${people[x.id + nOrP].lastName} - ${people[x.id + nOrP].id}`
    }
    
    people.forEach(match)
    console.log(people)

}())