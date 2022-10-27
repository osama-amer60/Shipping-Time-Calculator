//............................................................................
// add events on input fields to change color of placeholder when change 
const inputFields = document.querySelectorAll(".input-field")
for (const inputField of inputFields) {
    inputField.addEventListener("change",()=>{
        if (!inputField.value) {
            return;
        }
        inputField.style.color="black"
    })    
}

//..............................................................
// colse pop up msg
const colsePopUp = document.querySelector("#colse")
colsePopUp.addEventListener("click",()=>{
    popUp.classList.add("d-none")
})

//............................................................
// quantity Alert msg
const quantityAlert = document.querySelector("#quantityAlert")
const quantityAlertMsg = document.querySelector("#quantityAlertMsg")
quantityAlert.addEventListener("mousemove",()=>{
    quantityAlertMsg.style.display = "block"
    quantityAlert.style.color = "red"
})
quantityAlert.addEventListener('mouseout', ()=>{
    quantityAlertMsg.style.display = "none"
    quantityAlert.style.color = "#8D9092"

})


//................................................................
//calculate btn 
const calculate = document.querySelector("#calculate")
const popUp = document.querySelector(".popUp")

calculate.addEventListener("click", ()=>{
    const datepicker = document.querySelector("#datepicker")
    const productstyle = document.querySelector("#productstyle")
    const productnumber = document.querySelector("#productnumber")

    if (!datepicker.value || !productstyle.value || !productnumber.value) {
        popUp.classList.remove("d-none")
    }
    else if(compareDate(datepicker.value) > 0){
        showWarningMsg("dateWarningMsg")
    }
    else if(productstyle.value === "null"){
        showWarningMsg("typeWarningMsg")
    }
    else if(productnumber.value >100 ||productnumber.value < 1){        
        showWarningMsg("QuantityWarningMsg")
    }
    else{
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        let userDay = new Date(datepicker.value).getDay()
        let dayChoosed = days[userDay]

        console.log(dayChoosed)


        let result = addDays(datepicker.value,2)

        let day = result.getDate()
        let monthDisplay = month[result.getMonth()];
        let year = result.getFullYear()

        const order = document.querySelector("#order")
        order.innerHTML = `<span> Your Estimated Shipping Date is  </span/> ${day} ${monthDisplay} ${year}`
        console.log(datepicker.value)
        console.log(productstyle.value)
        console.log(productnumber.value)
    }
})


//compare the date function
function compareDate(date){
    let today = new Date().toISOString().slice(0, 10)
    const todayDate   = today;
    const diffInMs   = new Date(todayDate) - new Date(date)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays ;
}

// show warning msg 
function showWarningMsg(msg){
    const msgStyle = document.querySelector(`#${msg}`)
    msgStyle.classList.remove("d-none")
    setTimeout(() => {
        msgStyle.classList.add("d-none")
    }, 3000);
}


//increse date by 2 busines days
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }




