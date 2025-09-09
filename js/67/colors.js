(function () {
    'use strict';


    const color = document.querySelector('#color');
    const bgcolor = document.querySelector('#bgcolor');

    const format = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }

    const getColorDates = [];
    const getBackgroundDates = [];
    class colorObj {
        constructor(dateTime, colorVal ){
            this.dateTime = dateTime;
            this.colorVal = colorVal;
        }
    };

    const colorTable = document.querySelector('#color-table tbody');

    function checkTable(self){
        let insert;
        let number;
        let other;
        let text;
        if (self === getColorDates){
            other = getBackgroundDates;
            number = 0;
            insert = -1;
            text = "No Background Color Inputed Yet"
        }
        else{
            other = getColorDates;
            number = 1;
            insert = 0;
            text = "No Color Inputed Yet";
        }
        if (!self.length){
            colorTable.rows[0].deleteCell(number);
        }
        else if ( self.length >= other.length){
            colorTable.insertRow();
            const backgroundCell =  colorTable.rows[self.length].insertCell(insert);
            backgroundCell.innerText = text
            backgroundCell.style.textAlign = 'center'
            
        }    
        else{
            if (number){
                number = -number
            }
            colorTable.rows[self.length].deleteCell(number)
        }
    };

    color.addEventListener('input', () => {
        document.body.style.color = color.value;
    });

    color.addEventListener('change',() =>{
        // if (!getColorDates.length){
        //     colorTable.rows[0].deleteCell(0);
        // }
        // else if ( getColorDates.length >= getBackgroundDates.length){
        //     colorTable.insertRow();
        //     const backgroundCell =  colorTable.rows[getColorDates.length].insertCell(-1);
        //     backgroundCell.innerText = "No Background Color Inputed Yet"
        //     backgroundCell.style.textAlign = 'center'
            
        // }    
        // else{
        //     colorTable.rows[getColorDates.length].deleteCell(0)
           
        // }
        checkTable(getColorDates)
        const newColorObject = new colorObj(new Date().toLocaleString('en-US',format),color.value)
        getColorDates.push(newColorObject);
        const cell =  colorTable.rows[getColorDates.length -1].insertCell(0);
        cell.innerText = getColorDates[getColorDates.length -1].dateTime;
        cell.style.textAlign = 'center';
        cell.style.color = newColorObject.colorVal
        cell.addEventListener('click', () => {
            document.body.style.color = newColorObject.colorVal;
        });
        //for testing purposes
        //cell.innerText = "Color"

    });


    bgcolor.addEventListener('input', () => {
        document.body.style.backgroundColor = bgcolor.value;
    });

    bgcolor.addEventListener('change',() => {
        // if (!getBackgroundDates.length){
        //     colorTable.rows[0].deleteCell(1);
        // }
        // else if (getBackgroundDates.length >= getColorDates.length){
        //     colorTable.insertRow();
        //     const colorCell =  colorTable.rows[getBackgroundDates.length].insertCell(0);
        //     colorCell.innerText = "No Color Inputed Yet"
        //     colorCell.style.textAlign = 'center'
        // }
        // else{
        //     colorTable.rows[getBackgroundDates.length].deleteCell(1)
        // }
        checkTable(getBackgroundDates)
        const newColorObject = new colorObj(new Date().toLocaleString('en-US',format),bgcolor.value)
        getBackgroundDates.push(newColorObject);
        const cell =  colorTable.rows[getBackgroundDates.length-1].insertCell(-1);
        cell.innerText = newColorObject.dateTime;
        cell.style.textAlign = 'center';
        cell.style.backgroundColor = newColorObject.colorVal
        cell.addEventListener('click', () => {
            document.body.style.backgroundColor = newColorObject.colorVal;
        });
        // for testing purposes
        // cell.innerText = "Background"
    });



}());
