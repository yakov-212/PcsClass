import './Calculator.css'
import React,{ Component} from 'react'

export default class Calculator extends Component{
    state = {
        results:'',
        nums:[],
        num:0,
        positive:true
    }
    clicked = e =>{   
        if(typeof(this.state.num) === 'number')   
            this.state.num *= 10

        this.setState({
            results: this.state.results += e.target.innerText,
            num: this.state.num += Number(e.target.innerText)*(this.state.positive ? 1:-1),
            
        })
        console.log(this.state.num)
    }
    
    add =(e) =>{
        
        const op = e.target.innerText
        const positive = op === '-' ? false : true
        this.state.positive = positive
        if (op === '*' || op === '/'){
            this.state.num = `${this.state.num}${op}`
        }
        else{
            this.state.nums.push(this.state.num)
            this.state.num = 0
        }
        this.setState({
            results: this.state.results += ` ${op} `
        })
        console.log(this.state.num)
    }

    calc=()=>{
        this.state.nums.push(this.state.num)
        const result = this.state.nums.reduce((acc, num) => {
            if(String(num).includes('*')){
                console.log('mult')
                const mult = num.split('*')
                return acc+ mult.reduce((acc,num)=>acc*num,1)
            }
            else if(String(num).includes('/')){
                const div = num.split('/')
                console.log(div,num)
                return acc + div.reduce((acc,num)=>acc/num,div[0]*10)
            }
            console.log(acc,num)
            return acc + num
        }, 0)
        this.setState({
            results:result,
            num:result,
            nums:[],
            positive:true
        })
    }
    createButton(text,clicked,classN = null){
        return <button onClick={clicked} className={classN}>{text}</button>
    }
    createButtons(){
        const buttons = []
        for(let i = 1;i<=9;i++){
            buttons.push(this.createButton(i,this.clicked))
        }
        return buttons
    }
    

    render(){
        return (
            <>
            <div className='calculator'>
                <div className='results'> {this.state.results}</div>
                <div className='nums'>
                    {this.createButtons()}
                    {this.createButton('clr',() =>  this.setState({results:'',num:0,nums:[],positive:true}))}
                    {this.createButton("0",this.clicked)}
                    {this.createButton('=',this.calc,'equals')}
                </div>
                <div className='operators'>
                    {this.createButton("*",this.add)}
                    {this.createButton("/",this.add)}
                    {this.createButton("-",this.add)}
                    {this.createButton("+",this.add)}
                    
                </div>
                
            </div>
            </>
        )
    }
}