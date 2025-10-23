/* global $ */
(function(){
    'use strict';
    $.get("MeTubeJson/MeTube.json",(obj, status) => {
            if (!status === "success"){
                throw new Error(status);
            } 

            for (let index = 0; index < 6; index++) {
                $("#main-div").append(`
                    <div class="video-wrapper">
                    <video src='${obj[index%obj.length].video}' controls poster="videos/MeTube.png" width="640" height="360"></video>
                    <h2>${obj[index%obj.length].title}</h2>
                    </div>`);
            }
            $(".video-wrapper").css("display","flex")
            $(".video-wrapper").css("flex-direction","column")
            $(".video-wrapper").css("margin","0 25px")


        });
    
    

    
}())