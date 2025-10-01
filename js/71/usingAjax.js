/* global $ */
(function (){
    /* use strict */
    colors = ['#EF4444','#F97316','#FBBF24','#10B981','#3B82F6','#8B5CF6'];
    loadings = ["Loading .","Loading ..","Loading ..."];
    n = 0;
    load = $("#loading");
    wheel = $('#color-wheel');
    wheel.css('color','red');
    loadButton = $("#load-button")
    fileName = $("#file-name")
    

    function changeLoading(n){
        load.text(loadings[n])
    }
    function changeGradient(){
        last = colors.pop();
        colors.unshift(last);
        gradient = `conic-gradient(${colors[0]} 0deg, ${colors[0]} 60deg,
                ${colors[1]} 60deg, ${colors[1]} 120deg,
                ${colors[2]} 120deg, ${colors[2]} 180deg,
                ${colors[3]} 180deg, ${colors[3]} 240deg,
                ${colors[4]} 240deg, ${colors[4]} 300deg,
                ${colors[5]} 300deg, ${colors[5]} 360deg)`
        wheel.css('background-image',gradient);      
    }
    function clear(){
        
    }
     
    loadButton.click(async () => {
        try{
            const request = await fetch(fileName.val())
            if (!request.ok){
                throw new Error(`${request.status} - ${request.statusText}`)
            }

            wheel.css("display","block");
            load.css("display","inline");
            wheelInterval = setInterval(changeGradient,125);
            loadingInterval = setInterval(() =>{changeLoading(n)
                n++;
                if (n === 3){
                    n = 0
            }},250 )

            setTimeout(async() =>{
                clearInterval(wheelInterval);
                clearInterval(loadingInterval);
                wheel.hide()
                load.hide()
                console.log(await request.text())
            },5000)
        }
        catch(e){
            console.log(e,e.message)
        }
        

    })
    
    
}())