(async function (){
    const ulElem = document.querySelector('ul');
    const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    console.log(users);
    const userInfo = []
    users.forEach(user => {
        userInfo.push({name: user.name,website: user.website,company: user.company})
    });
    userInfo.forEach(addLi)
    
    

    
    function addLi(user){
        const liElem = document.createElement('li')
        Object.entries(user).forEach((entry,index) =>{
            const [key,value] = entry
            liElem.innerHTML += index !== 2? `<b>${key}:</b> ${value} ` : `<b>${key}:</b> ${value.name}, ${value.bs}`
        })
        liElem.addEventListener('click',liClicked)
        ulElem.appendChild(liElem)
    }
    function liClicked(e){
        console.log(e.target.innerText);
    }
}())
