let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let submitBtn = document.querySelector(".submit-btn");
let yearsResult = document.querySelector(".years-result");
let monthsResult = document.querySelector(".months-result");
let daysResult = document.querySelector(".days-result");
let resultSpan1 = document.querySelectorAll(".result-span-1");
let happy = document.getElementById('happy');
let bday = document.getElementById('birthday');


// to display error message
function error(input, message) {
  let inputWrapper = input.parentElement;
  let errMessage = inputWrapper.querySelector(".error-message");
  inputWrapper.classList.remove("success");
  inputWrapper.classList.add("error");
  errMessage.textContent = message;
  resultSpan1.forEach(element => {
    element.textContent = '--';
  });
}

//to display success message
function success(input) {
  let inputWrapper = input.parentElement;
  inputWrapper.classList.remove("error");
  inputWrapper.classList.add("success");
}

// To confirm that an accepted input for day is entered
function checkValidDay(inputArr) {
  let regEx = /^[0-9]{2}$/;
  let inputDayStr = inputArr[0].value.trim();
  let inputDay = Number(inputArr[0].value.trim());
  let inputMonth = Number(inputArr[1].value.trim());
  let inputYear = Number(inputArr[2].value.trim());
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  let currentDay = date.getDate();

  if (inputDayStr === "") {
    error(inputArr[0], "this field is required");
  } else if (
    inputYear === currentYear &&
    inputMonth === currentMonth &&
    inputDay > currentDay
  ) {
    error(inputArr[0], "Must be in the past");
  } else if (regEx.test(inputDayStr) && inputDayStr >= 1 && inputDayStr <= 31) {
    success(inputArr[0]);
  } else {
    error(inputArr[0], "must be a valid day");
  }
}

// To confirm that an accepted input for month is entered
function checkValidMonth(inputArr) {
  let regEx = /^[0-9]{2}$/;
  let inputMonthStr = inputArr[0].value.trim();
  let inputMonth = Number(inputArr[0].value.trim());
  let inputYear = Number(inputArr[1].value.trim());
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;

  if (inputMonthStr === "") {
    error(inputArr[0], "this field is required");
  } else if (inputYear === currentYear && inputMonth > currentMonth) {
    error(inputArr[0], "Must be in the past");
  } else if (regEx.test(inputMonthStr) && inputMonth >= 1 && inputMonth <= 12) {
    success(inputArr[0]);
  } else {
    error(inputArr[0], "must be a valid month");
  }
}

// To confirm that an accepted input for year is entered
function checkValidYear(input) {
  let regEx = /^[0-9]{4}$/;
  let inputYearStr = input.value.trim();
  let inputYear = Number(input.value.trim());
  let currentYear = new Date().getFullYear();
  if (inputYearStr === "") {
    error(input, "this field is required");
  } else if (inputYear > currentYear) {
    error(input, "Must be in the past");
  } else if (regEx.test(inputYearStr) && inputYear <= currentYear) {
    success(input);
  } else {
    error(input, "must be a valid year");
  }
}

// To check that day entered actually exit
function checkCorrectDay(inputArr) {
  let inputDay = Number(inputArr[0].value.trim());
  let inputMonth = Number(inputArr[1].value.trim());
  let inputYear = Number(inputArr[2].value.trim());
  let currentDay = new Date(inputYear, inputMonth - 1, inputDay).getDate();

  if (//check if other input error check has been done and passed
    inputArr[0].parentElement.classList.contains("success") &&
    inputArr[1].parentElement.classList.contains("success") &&
    inputArr[2].parentElement.classList.contains("success")
  ) {
    //check if day is !> Number of days in the month
    if (inputDay > 28 && currentDay < 28) {
      error(inputArr[0], "day does not exist");
    } else {
      return;
    }
  } else {
    return;
  }
}

// Output year and Happy Birthday
function outputYear(inputArr) {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth() + 1;
  let currentDay = date.getDate();
  let birthYear = Number(inputArr[2].value.trim());
  let birthMonth = Number(inputArr[1].value.trim());
  let birthDay = Number(inputArr[0].value.trim());

  if (currentMonth < birthMonth) {
    yearsResult.textContent = (currentYear - birthYear)-1;
  } else if (currentMonth > birthMonth) {
    yearsResult.textContent = currentYear - birthYear;
  } else if (currentMonth === birthMonth && currentDay < birthDay) {
    yearsResult.textContent = (currentYear - birthYear) - 1;
  } else if (currentMonth === birthMonth && currentDay > birthDay) {
    yearsResult.textContent = currentYear - birthYear;
  }else if(currentMonth === birthMonth && currentDay === birthDay){
    yearsResult.textContent = currentYear-birthYear;
    monthsResult.textContent = "HA"
    daysResult.textContent = "BIR";
    happy.textContent = "PPY";
    bday.textContent = "THDAY!";
    setTimeout(()=>{
      monthsResult.textContent = "--"
      daysResult.textContent = "--";
      happy.textContent = "months";
      bday.textContent = "days";
    }, 10000);

  } else {
    return;
  }
}

//output month and day
function outputMonthAndDay(inputArr){
  let date = new Date();
  let currentMonth = date.getMonth() + 1;
  let currentDay = date.getDate();
  let birthYear = Number(inputArr[2].value.trim());
  let birthMonth = Number(inputArr[1].value.trim());
  let birthDay = Number(inputArr[0].value.trim());
  let previousMonthLastDay = new Date(birthYear, birthMonth, 0).getDate();
  
  if(currentMonth < birthMonth && currentDay <= birthDay){
    monthsResult.textContent = 12 - birthMonth + currentMonth - 1;
    if(currentDay === birthDay){
      daysResult.textContent = 0;
    }else{
      daysResult.textContent = (previousMonthLastDay - birthDay) + currentDay;
    }
  }else if(currentMonth < birthMonth && currentDay > birthDay){
    monthsResult.textContent = 12 - birthMonth + currentMonth;
    daysResult.textContent = currentDay - birthDay;
  }else if(currentMonth > birthMonth && currentDay >= birthDay){
    monthsResult.textContent = currentMonth - birthMonth;
    daysResult.textContent = currentDay - birthDay;
  }else if(currentMonth > birthMonth && currentDay < birthDay){
    monthsResult.textContent = currentMonth - birthMonth - 1;
    daysResult.textContent = (previousMonthLastDay - birthDay) + currentDay;
  }else if(currentMonth === birthMonth && currentDay < birthDay){
    monthsResult.textContent = 11;
    daysResult.textContent = (previousMonthLastDay - birthDay) + currentDay;
  }else if(currentMonth === birthMonth && currentDay > birthDay){
    monthsResult.textContent = 0;
    daysResult.textContent = currentDay-birthDay;
  }else{
    return;
  }
}

// Monitor the submit btn for a click
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // rotate submit button and result span after each click
  submitBtn.classList.toggle('rotate');
  resultSpan1.forEach(element => {
    element.classList.toggle('rotate');
  });
  
  console.log("submitted");

  //call funtions to validate input
  checkValidDay([day, month, year]);
  checkValidMonth([month, year]);
  checkValidYear(year);
  checkCorrectDay([day, month, year]);
  if (//only call output functions if validate was succesful
    day.parentElement.classList.contains("success") &&
    month.parentElement.classList.contains("success") &&
    year.parentElement.classList.contains("success")
  ) {
    outputYear([day, month, year]);
    outputMonthAndDay([day, month, year]);    
  }
});
