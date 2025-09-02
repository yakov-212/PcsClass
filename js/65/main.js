/*use strict*/

function makeBankAccount(){
    let balance = 0;
    
    return {
        perfomeTransaction(amount){
            this.balance += amount;
        },
        balance
    }
};
const bank_account = makeBankAccount()
const bank_account2 = makeBankAccount()
function transaction(amount){
    this.balance += amount;
}
transaction.call(bank_account,10)
transaction.call(bank_account2,10)
const deposit50InAccount = bank_account.perfomeTransaction.bind(bank_account,50)
const deposit50InAccount2 = bank_account.perfomeTransaction.bind(bank_account2,50)