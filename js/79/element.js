class Element{
    #children = {}
    static i = 0
    constructor(text){
        this.elName= `element ${++Element.i}`
        this.innerText = text
    }
    addChild(child){
        if(child.elName)
            this.#children[child.elName] = child
        else
            console.log("child must have a name to be added")
    }
    removeChild(child){
        delete this.#children[child.elName]
    }
    getChildren(){
        return this.#children
    }
    setInnerText(text){
        this.innerText = text
    }
    render(){
        Object.keys(this.#children).forEach(key => {this.#children[key].render()})
    }
}
class Div extends Element{
    render(){
        console.log("I am a div")
        console.log(this.innerText)
        super.render()
    }
}
class H1 extends Element{
    render(){
        console.log("I am a H1")
        console.log(this.innerText)
        super.render()
    }
}

const div1 = new Div('a')
const h11 = new H1('b')
const h12 = new H1('c')

console.log(div1)
div1.addChild(h11)
div1.addChild(h12)
div1.render()
div1.removeChild(h11)
div1.setInnerText("I know this works but...")
h12.setInnerText('does this work?')
div1.render()
