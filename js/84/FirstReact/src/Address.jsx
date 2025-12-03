import './Address.css'
function Address({street,number,city,state,zip}){
    console.log(street,number,city,state,zip)
    return (
        <>
        <div> {number} {street} {city} {state} {zip}</div>
        </>
    )
}
export default Address