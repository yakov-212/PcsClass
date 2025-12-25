import './Calculator.css'
import React,{ Component} from 'react'

export default class Calculator extends Component{
    state = {
        results:'',
        nums:[],
        num:0,
        positive:true
    }
    resultsRef = React.createRef();
    clicked = e =>{   
        if(typeof(this.state.num) === 'number')   
            this.state.num *= 10

        this.setState({
            results: this.state.results += e.target.innerText,
            num: this.state.num += Number(e.target.innerText)*(this.state.positive ? 1:-1),
            
        })
        if (this.resultsRef.current) {
          this.resultsRef.current.scrollLeft = this.resultsRef.current.scrollWidth;
        }
    }
    
    add =(e) =>{
        
        const op = e.target.innerText
        const positive = op === '-' ? false : true
        this.state.positive = positive
        if (op === '*' || op === '/'){
            const o = op === '*' ? '/' : '*';
            if (String(this.state.num).includes(o)){
                this.state.nums.push(this.state.num)
                this.state.num = op
            }
            else
                this.state.num = `${this.state.num}${op}`
        }
        else{
            this.state.nums.push(this.state.num)
            this.state.num = 0
        }
        this.setState({
            results: this.state.results += ` ${op} `
        })
        if (this.resultsRef.current) {
          this.resultsRef.current.scrollLeft = this.resultsRef.current.scrollWidth;        }
    }

    calc=()=>{
        this.state.nums.push(this.state.num)
        let orderAcc = 0;
        let result = this.state.nums.reduce((acc, num) => {
            if(String(num).includes('*')){
                const mult = num.split('*')
                if(mult[0] === ''){
                    mult[0] = acc || 1
                    acc = 0
                }
                return acc+ mult.reduce((ac,num)=>ac*num,1)
            }
            else if(String(num).includes('/')){
                const div = num.split('/')
                if(div[0] === ''){
                    div[0] = acc || 1
                    acc = 0
                }
                return acc + div.reduce((ac,num)=>ac/num,div[0]*div[0])
            }
            orderAcc += acc +num
            return 0 
        }, 0)
        result += orderAcc
        
        this.setState({
            results:result,
            num:result,
            nums:[],
            positive:true
        })
    }
    createButton(text,clicked,classN = null){
        return <button onClick={clicked} className={classN} key={text}>{text}</button>
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
                <div className='results' ref={this.resultsRef}> {this.state.results}</div>
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