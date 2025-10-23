/* global $ */
(function(){
    'use strict';
    const input = $("input")[0];
    const video = $("video")[0];
    const h2 = $("h2")[0];
       
    $("form").submit(e => {
            e.preventDefault();
            Search(input.value);
        });

    function Search(title){ 
        $.get("MeTubeJson/MeTube.json",(obj, status) => {
            if (!status === "success"){
                throw new Error(status);
            } 
            obj.forEach(data => {ValidateSearch(data,title)})
        });
    };
    function ValidateSearch(data, title){
        if(data.title.toLowerCase() === title || data.title === title){
            video.src = data.video
            h2.innerText = data.title
            
        };
        console.log(data.title,title)
    };
    
    console.log();
}())