(function(){
    /* use strict */
    
    function createButton(index){
        const newButton = document.createElement("button")
        document.body.children.item(0).appendChild(newButton)
        newButton.textContent = index + 1
        newButton.addEventListener("click",clickListner)
        newButton.style.padding=`${2*index/10}px 20px`
        newButton.style.marginLeft="10px"
        newButton.style.marginBottom="10px"

        newButton.style.borderRadius=`${index}%`
    }
    function clickListner(){
        createButton(parseInt(this.textContent))
        this.removeEventListener("click",clickListner)
    }
    const button = document.querySelector("#button1")
    button.addEventListener('click',clickListner)
}())