(async function (){
    const usersElem = document.querySelector('#users');
    const postsElem = document.querySelector('#posts')
    const commentsElem = document.querySelector('#comments')
    const header = document.querySelector("#headerText")
    const button = document.querySelector('#button-comments')
    const homeButton = document.querySelector('#backHome')
    const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json();
    console.log(users);
    
    
    users.forEach(addLi)
    
    homeButton.addEventListener('click',backHome)
    function backHome(){
        if(header.innerText === 'Blogs')
            return
        postsElem.style.display = 'none'
        commentsElem.style.display = 'none'
        usersElem.style.display = 'inline'
        header.innerText = 'Blogs'
        button.innerText = 'Show Comments'
        button.style.display = 'none'
        postsElem.replaceChildren()
        commentsElem.replaceChildren()
    }
    
    function addLi(user){
        const liElem = document.createElement('li')
        const userInfo = {name: user.name,website: user.website,company: user.company}
        Object.entries(userInfo).forEach((entry,index) =>{
            const [key,value] = entry
            liElem.innerHTML += index !== 2? `<b>${key}:</b> ${value} ` : `<b>${key}:</b> ${value.name}, ${value.bs}`
        })
        liElem.addEventListener('click',liClicked)
        liElem.id = user.id
        liElem.name = user.name
        usersElem.appendChild(liElem)
        usersElem.appendChild(document.createElement('br'))
        console.log('user',user)
    }

    async function liClicked(e){
        console.log(e.target);
        const posts = await (await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e.target.id}`)).json()
        console.log(posts)
        const comments = await (await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${e.target.id}`)).json()
        console.log('comments',comments)
        usersElem.style.display = 'none'
        postsElem.style.display = 'inline'
        button.style.display = 'inline'
        button.show = false
        addPosts(posts)
        addComments(comments)
        button.addEventListener('click',buttonListener)
        header.innerText = `Posts by ${e.target.name}`

    }
    function addComments(comments){
        comments.forEach(comment =>{
            const liElem = document.createElement('li')
            liElem.innerHTML = `<b>${comment.name}</b><br>${comment.body}`
            commentsElem.appendChild(liElem)
            commentsElem.appendChild(document.createElement('br'))
        })
    }
    function addPosts(posts){
        posts.forEach(post =>{
            const liElem = document.createElement('li')
            liElem.innerHTML = `<b>${post.title}</b><br>${post.body}`
            postsElem.appendChild(liElem)
            postsElem.appendChild(document.createElement('br'))
        })
    }
    function buttonListener(e){
        e.target.show = !e.target.show
        if(e.target.show){
            commentsElem.style.display = 'inline'
            e.target.innerText = 'Hide Comments'
        }
        else{
            commentsElem.style.display = 'none'
            e.target.innerText = 'Show Comments'
        }
            
    }
}())
