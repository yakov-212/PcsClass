(function(){
    'use strict'
    let allParts = [];
    const audio = document.querySelector('audio');
    const side = document.querySelector('#sidebar');
    const main = document.querySelector("#main");
    const trash = document.querySelector('#trash');
    const imagesList = document.querySelectorAll(".img-cont");
    const background = document.querySelector('#background');
    const music = document.querySelector('#menu-music');
    const controls = document.querySelector('#controls');
    const menu = document.querySelector('#menu-screen');
    const menuSpan = document.querySelector('#menu-span');
    const controlSpan = document.querySelector('#controls-span');
    const musicOpt = document.querySelectorAll('.music-options');
    const gallary = document.querySelectorAll('.gallary');
    const back = document.querySelector('#back')
    const musicButon = document.querySelector('#music');
    let start = true
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
    let menuData = {"display": true,'music':{"src":'media/music/Sunshine Kid Playtime.mp3','time':0},"background": 'url(media/images/background.png)'}
    load()
    console.log(allParts)
    console.log(menuData.music.src)
    audio.src = menuData.music.src

    audio.currentTime = menuData.music.time
    console.log('l',menuData)
    main.style.backgroundImage = menuData.background        
    if(menuData.display){
        menu.style.display = 'flex'
        imagesList.forEach(img => {img.style.display = 'none';})
        trash.style.display = 'none'
        document.querySelector("#music").style.display = 'none'
        document.querySelector("#menu").style.display = 'none'
        start = false
    }
    back.addEventListener('click',() =>{
        controlSpan.style.display = 'none';
        gallary[0].style.display = 'none';
        gallary[1].style.display = 'none';
        menuSpan.style.display = 'flex'
        back.style.display = 'none'
    })
    document.querySelectorAll('.background-options img').forEach(opt => {opt.addEventListener("click",() => {
        console.log('f',opt.src,main.style.backgroundImage)
        main.style.backgroundImage = `url(${opt.src})`
        menuData.background = `url(${opt.src})`
        localStorage.setItem('menuData',JSON.stringify(menuData))
        
    })})
    
    document.querySelector('#start').addEventListener('click',() =>{
        start = true
        imagesList.forEach(img=>{img.style.display = 'flex';console.log('p',side.style)})
        menu.style.display = 'none'

        allParts.forEach(piece => {if(piece === "deleted"){return};piece.style.display = 'inline'})
        imagesList.forEach(img => {img.style.display = 'flex';})
        trash.style.display = 'inline'
        document.querySelector("#music").style.display = 'inline'
        document.querySelector("#menu").style.display = 'inline'
        console.log(music.backgroundColor)
        menuData.music.on = true
        menuData.display = false
        localStorage.setItem('menuData',JSON.stringify(menuData))
    });
    document.querySelector('#menu').addEventListener('click',() => {
        start = false
        menu.style.display = 'flex'
        allParts.forEach(piece => {if(piece === "deleted"){return};piece.style.display = 'none'})
        imagesList.forEach(img => {img.style.display = 'none';})
        trash.style.display = 'none'
        document.querySelector("#music").style.display = 'none'
        document.querySelector("#menu").style.display = 'none'
        audio.pause()
        musicButon.innerText = "Play"
        musicButon.style.backgroundColor = 'rgb(0,255,46)';
        menuData.display = true
        localStorage.setItem('menuData',JSON.stringify(menuData))
        save()
    });
    controls.addEventListener('click',() =>{
        menuSpan.style.display = 'none'
        controlSpan.style.display = 'block'
        back.style.display = 'inline'
    });
    background.addEventListener('click',() =>{
        menuSpan.style.display = 'none'
        console.log(gallary[0].children[0])
        gallary[0].style.display = 'grid'
        back.style.display = 'inline'
    });
    music.addEventListener('click',() =>{
        menuSpan.style.display = 'none'
        gallary[1].style.display = 'grid'
        back.style.display = 'inline'
    });
    
    
    
    
    
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
    musicOpt.forEach(m => {m.addEventListener('click',() => {
        const dot = m.innerText.trim() === 'Sunshine Kid Playtime' ? '.mp3' : '.mp4'
        audio.src = `media/music/${m.innerText}${dot}`
        menuData.music.src = `media/music/${m.innerText}${dot}`
        audio.currentTime = 0;
        menuData.music.time = 0
        localStorage.setItem('menuData',JSON.stringify(menuData))
    }
    )})
    musicButon.addEventListener("click",e => {
        switch(e.target.innerText){
            case('Play'):
                e.target.innerText = "Pause"
                e.target.style.backgroundColor = 'red'
                audio.play()
                audio.muted = false
                break;
            case('Pause'):
                e.target.innerText = "Play"
                e.target.style.backgroundColor = 'rgb(0,255,46)';
                audio.pause()
                break;
        }
        localStorage.setItem('menuData',JSON.stringify(menuData))
    })
    audio.addEventListener('timeupdate',()=>{
        menuData.music.time = audio.currentTime
        localStorage.setItem('menuData',JSON.stringify(menuData))
    })
    trash.addEventListener("click",() =>{
        allParts.forEach(part => {
            if(part === 'deleted')
                return
            part.remove()
        })
       localStorage.removeItem('allPartsData')

    })
    

    trash.addEventListener('mouseup',e =>{
        if(movement){
            allParts[movement.style.id] = 'deleted';
            movement.remove()
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
        offset = { x: e.offsetX, y: e.offsetY };
        
        img.src = `media/images/${target.className}${parts[target.className]['current']}.png`
        img.className = target.className
        img.style.id = id++
        img.style.position = 'absolute'
        img.style.cursor = 'grab'
        img.style.zIndex = img.className === "potato" ? '0' : '1';
        img.style.left = `${e.pageX -offset.x}px`
        img.style.top = `${e.pageY -offset.y}px`
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
        if(start)
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
                className: part.className,
                id: part.style.id,
                current: part.style.current,
                rotation: part.style.transform,
                display: part.style.display,
            }
        })
        localStorage.setItem('allPartsData',JSON.stringify(allPartsData))
        localStorage.setItem('parts',JSON.stringify(parts))
        
    }
    function load(){
        
            const allPartsData = JSON.parse(localStorage.getItem('allPartsData')) || []
            allPartsData.forEach(part => {
                if (part === 'deleted'){allParts.push('deleted');id++;return}
            
            const img = document.createElement('img');
            main.appendChild(img);
            allParts.push(img);
            img.src = `media/images/${part.className}${part.current}.png`
            img.className = part.className
            img.style.id = id++
            img.style.position = 'absolute'
            img.style.cursor = 'grab'
            img.style.zIndex = img.className === "potato" ? '0' : '1';
            img.style.left = part.left
            img.style.top = part.top
            img.style.current = part.current
            img.style.transform = part.rotation
            console.log(part.display)
            img.style.display = part.display
            addEvents(img)
            })
            parts = JSON.parse(localStorage.getItem('parts')) || parts
            menuData = JSON.parse(localStorage.getItem('menuData')) || menuData
        }    
    
}())