(function(){
    'use strict'
    const images =  JSON.parse(localStorage.getItem('images')) || {}
    console.log(images)
    const audio = document.querySelector('audio')
    
    document.querySelector('button').addEventListener("click",e => {
        switch(e.target.innerText){
            case('Music'):
                e.target.innerText = "Mute"
                audio.currentTime = 0;
                audio.play()
                break;
            case('Mute'):
                e.target.innerText = "Music"
                audio.pause()
                break;
        }
        
    })
    // const div = document.createElement("div")
    // document.body.appendChild(div)
    // div.style.display = 'flex'
    // div.style.flexWrap = 'wrap'
    // div.style.width = '100px'
    // div.style.maxWidth = '100vw'
    // div.style.gridRow = "2"



    let movement;
    let offset;
    let rotation = 0
    let n = 0
    let posLeft = 50
    let posTop = 400
    

    for (let i = 0; i < 17;i++){
        const img = document.createElement('img')
        document.body.appendChild(img)
        img.index = i
        img.src = `images/${i}.png`
        img.style.position = 'absolute'
        img.style.left = images[i]?.posLeft || `${posLeft}px`
        img.style.top = images[i]?.posTop || `${posTop}px`
        console.log(images[i]?.posLeft)
        images[i] = images[i] || {"posLeft": `${posLeft}px`,"posTop": `${posTop}px`}
        console.log(images[i])
        images[i]['image'] = img
        console.log(images[i])
        posLeft += 190
        if (i%7 === 0 && i !== 0){
            posLeft = 50
            posTop += 250
        }
        n+= i%2
        // images.push(img)
        // div.appendChild(img)
        img.addEventListener("mousedown",e =>{
            e.preventDefault()
            movement = e.target
            offset = {x: e.offsetX, y: e.offsetY}
        })
        img.addEventListener('wheel',e => {
            e.preventDefault()
            if(e.wheelDelta > 0){
                img.style.transform = `rotate(${rotation+=45}deg)`;
            }  
            else
                img.style.transform = `rotate(${rotation-=45}deg)`;
        })
        


    }
    

    
    document.addEventListener("mousemove",e => {
        if(movement){
            movement.style.left = `${e.pageX - offset.x}px`;
            movement.style.top = `${e.pageY - offset.y}px`;
        }
    })
    document.addEventListener("mouseup",e =>{
        images[movement.index].posLeft = movement.style.left
        images[movement.index].posTop = movement.style.top
        
        localStorage.setItem("images",JSON.stringify(images))

        movement = null
    })


    
}())