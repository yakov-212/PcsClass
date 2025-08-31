/*use strict*/


function dayUtil() {

    const days = ["easterEgg","Sunday", "Monday","Tuesday"];
    
    return{
        getDayName(num){
            return days[num];
        },
        getDayNumber(day){
            return days.findIndex(d => d === day);
        },
    };
};
let du = dayUtil();

function calRate(){
    let rate = 0;
    let years = 0;
    return{

        setRate(n){
            rate = n
            console.log("Rate has been changed to %i",rate);
        },
        setYears(n){
            years = n
            console.log("years has been changed to %i",years);
        },
        calculateRate(principle){
          const intrest = (rate * years * principle)/100;
          console.log(intrest,rate,years)
          return principle + intrest;
        }
    };
};
let cr = calRate();

