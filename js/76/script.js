(function(){
    'use strict'
    let images;
    const audio = document.querySelector('audio')
    let movement;
    let offset;
    let rotation = 0
    
    document.querySelector('#music').addEventListener("click",e => {
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
    document.querySelector("#set").addEventListener("click",e =>{
        deleteImgs()
        switch(e.target.innerText){
            case('Set 2'):
                e.target.innerText = "Set 1"
                load(28,'1',true)
                break;
            case('Set 1'):
                e.target.innerText = "Set 2"
                load(21,'0',true)
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




    
    function deleteImgs(){
        const keys = Object.keys(images)
        keys.forEach(key => {
            try{
                images[key].image.remove()
            }
            catch{
                console.log(images[key],images[key].image,key)
            }
        })
    }
    function load(n,set,clear=false){
        if (!clear)
            images =  JSON.parse(localStorage.getItem(`Set ${set+1}`)) || {};
        else
            images = {};

        let posLeft = 100;
        let posTop = 0;

        for (let i = 0; i < n;i++){
            
            const img = document.createElement('img')
            document.body.appendChild(img)
            img.style.maskImage = `url(images/${set}/${i}.png)`
            img.index = i
            img.src = `images/${set}/${i}.png`
            img.style.position = 'absolute'
            img.style.left = images[i]?.posLeft || `${posLeft}px`
            img.style.top = images[i]?.posTop || `${posTop}px`
            images[i] = images[i] || {"posLeft": `${posLeft}px`,"posTop": `${posTop}px`}
            images[i]['image'] = img
            posLeft += 190
            if (i%6 === 0 && i !== 0){
                posLeft = 50
                posTop += 250
            }
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
    }
    function save(set){
        try{
        images[movement.index].posLeft = movement.style.left
        images[movement.index].posTop = movement.style.top
        }
        catch{
            console.log('save error',movement)
        }
        console.log(images)
        localStorage.setItem(set,JSON.stringify(images))
    }
    load(21,'0')
    document.addEventListener("mousemove",e => {
        if(movement){
            movement.style.left = `${e.pageX - offset.x}px`;
            movement.style.top = `${e.pageY - offset.y}px`;
        }
    })
    document.addEventListener("mouseup",e =>{
        save(document.querySelector("#set").innerText)
        movement = null
    })
    

    
}())