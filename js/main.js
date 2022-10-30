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
        let showResult;
        if (productstyle.value =="Cotton" && productnumber.value < 50) {
             showResult = showFinalDate(datepicker.value,2)
        }
        else if(productstyle.value =="Cotton" && productnumber.value >= 50){
             showResult = showFinalDate(datepicker.value,3)
        }
        else if(productstyle.value =="Linen" && productnumber.value < 50){
             showResult = showFinalDate(datepicker.value,4)
        }
        else if(productstyle.value =="Linen" && productnumber.value >= 50){

             showResult = showFinalDate(datepicker.value,5)
        }
        const order = document.querySelector("#order")
        order.innerHTML = `<span> Your Estimated Shipping Date is  </span/> ${showResult}`

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

//display final date   
function showFinalDate(date, NumDays){
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const holidays = date.slice(5) 
 //get the name of the day
 let userDay = new Date(date).getDay()
 let dayChoosed = days[userDay]
 let fullDate;
 if (dayChoosed == "Friday") {
     fullDate = addDays(date,NumDays + 2)
 }else if(dayChoosed == "Saturday" ||holidays == "07-04" ||holidays =="12-25"){
     fullDate = addDays(date,NumDays + 1)
 }
 else{
     fullDate = addDays(date,NumDays)
 }
  const day = fullDate.getDate()
  const monthDisplay = month[fullDate.getMonth()];
  const year = fullDate.getFullYear()
  const showResult = day + " "+ monthDisplay+ " " + year
  return showResult
}  
