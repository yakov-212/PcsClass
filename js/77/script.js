(function(){
    'use strict'
    let allParts = [];
    const audio = document.querySelector('audio')
    const side = document.querySelector('#sidebar')
    const main = document.querySelector("#main")
    const trash = document.querySelector('#trash')
    const imagesList = document.querySelectorAll(".img-cont")
    
    // const background = document.querySelector('#background')
    // const music = document.querySelector('#music')
    // const controls = document.querySelector('#controls')
    // const menu = document.querySelector('#menu-screen')
    // const menuList = document.querySelectorAll('.menu-section')
    // document.querySelector('#start').addEventListener('click',() =>{
    //     imagesList.forEach(img=>{img.style.display = 'flex'})
    //     menu.style.display = 'none'
    //     //audio.play()
    // })
    // document.querySelector('#menu').addEventListener('click',() => {
    //     menu.style.display = 'flex'
    // })
    // controls.addEventListener('click',() =>{
    //     hideMenuButtons()
    // })
    // music.addEventListener('click',() =>{
    //     hideMenuButtons()
    // })
    // background.addEventListener('click',() =>{
    //     hideMenuButtons()
    // })
    // function hideMenuButtons(){
    //     menuList.forEach(menu=>{ menu.style.display = 'none'})
    // }
    let garbage;
    let movement;
    let offset;
    let rotation = 0
    let id = 0;
    let parts = {'potato': {"total":0,"current":0,},'arm':{"total":1,"current":0,},'ear':{"total":3,"current":0,},
    'eye': {"total":5,"current":0},'feet': {"total":2,"current":0},"glasses": {"total":4,"current":0},
    "hat": {"total":3,"current":0},'mouth':{"total":7,"current":0},'mustache':{"total":1,"current":0},'nose':{"total":4,"current":0}}
    let r = 200;
    let g = 40;
    let b = 100;
    
    
    load()
    
    imagesList.forEach(img => {
        img.style.backgroundColor = `rgb(${r},${g},${b}`
        g += 20
        const child = img.children[0]
        child.src = `media/images/${child.className}${parts[child.className]['current']}.png`
        
        img.addEventListener("contextmenu",e =>{
            e.preventDefault()
            if(parts[child.className]['current'] === parts[child.className]["total"])
                parts[child.className]['current'] = 0
            else
                parts[child.className]['current'] += 1
            child.src = `media/images/${child.className}${parts[child.className]['current']}.png`
            child.id = parts[child.className]['current']
            localStorage.setItem('parts',JSON.stringify(parts))         
            
        })
    })
    document.querySelector('#music').addEventListener("click",e => {
        switch(e.target.innerText){
            case('Play'):
                e.target.innerText = "Pause"
                audio.play()
                break;
            case('Pause'):
                e.target.innerText = "Play"
                audio.pause()
                break;
        }
        
    })
    trash.addEventListener("click",() =>{
        allParts.forEach(part => {
            if(part === 'deleted')
                return
            part.remove()
        })
       localStorage.setItem('allPartsData','[]')

    })
    
    trash.addEventListener('mouseenter',() => {if(movement){garbage = movement}})
    trash.addEventListener('mouseup',e =>{
        if(garbage){
            allParts[garbage.style.id] = 'deleted';
            garbage.remove()
        }})

    document.querySelector('#sidebar').addEventListener("mousedown", e => {
        if(e.button === 2){return}
        e.preventDefault()
        let target
        const img = document.createElement('img');
        main.appendChild(img);
        allParts.push(img);
        if (e.target.className === 'img-cont')
            target = e.target.children[0]
        else
            target = e.target
        
        img.src = `media/images/${target.className}${parts[target.className]['current']}.png`
        img.style.className = target.className
        img.style.id = id++
        img.style.position = 'absolute'
        img.style.cursor = 'grab'
        img.style.zIndex = img.style.className === "potato" ? '0' : '1';
        img.style.left = `${e.clientX -e.offsetX}px`
        img.style.top = `${e.clientY -e.offsetY}px`
        img.style.current = parts[target.className]['current']
        movement = img
        addEvents(img)
        
    })
    function addEvents(img){
        img.addEventListener("mousedown",e =>{
            e.preventDefault()
            movement = img
            movement.style.cursor = 'grabbing'
            offset = { x: e.offsetX, y: e.offsetY };
        })
        img.addEventListener('wheel',e => {
                e.preventDefault()
                if(e.wheelDelta > 0){
                    img.style.transform = `rotate(${rotation+=45}deg)`;
                }  
                else
                    img.style.transform = `rotate(${rotation-=45}deg)`;
                save()
            })

    }
    function save(set){
        try{
        allParts[movement.index].posLeft = movement.style.left
        allParts[movement.index].posTop = movement.style.top
        }
        catch{
            console.log('save error',movement)
        }
        localStorage.setItem(set,JSON.stringify(allParts))
    }
    document.addEventListener("mousemove",e => {
        
        if(movement){
            movement.style.left = `${e.pageX - offset.x}px`;
            movement.style.top = `${e.pageY - offset.y}px`;
        }
    })
    document.addEventListener("mouseup",e =>{
        try{
            movement.style.cursor = 'grab'
        }
        catch{

        }
        movement = null
        garbage = null
        save()
    })
    function save(){
        const allPartsData = allParts.map(part => {
            if (part === 'deleted'){
                return 'deleted'
            }
            return{
                src: part.style.src,
                top: part.style.top,
                left: part.style.left,
                className: part.style.className,
                id: part.style.id,
                current: part.style.current,
                rotation: part.style.transform,
            }
        })
        localStorage.setItem('allPartsData',JSON.stringify(allPartsData))
        
    }
    function load(){
        if (localStorage.length){
            const allParsData = JSON.parse(localStorage.getItem('allPartsData')) 
            allParsData.forEach(part => {
                if (part === 'deleted'){allParts.push('deleted');id++;return}
            
            const img = document.createElement('img');
            main.appendChild(img);
            allParts.push(img);
            img.src = `media/images/${part.className}${part.current}.png`
            img.style.className = part.className
            img.style.id = id++
            img.style.position = 'absolute'
            img.style.cursor = 'grab'
            img.style.zIndex = img.style.className === "potato" ? '0' : '1';
            img.style.left = part.left
            img.style.top = part.top
            img.style.current = part.current
            img.style.transform = part.rotation
            addEvents(img)
            })
            parts = JSON.parse(localStorage.getItem('parts')) || parts
        }
    }
    
    
}())