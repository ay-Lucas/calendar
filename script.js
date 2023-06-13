// const calendar = document.createElement("calendar");
const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
loadCalendar();

function loadCalendar() {
  let date = getMonth();
  let firstDay = new Date(date.getFullYear(), date.getMonth()).getDay();
  let thisMonthDayCount = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  let lastMonthDayCount = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  for (let i = firstDay; i > 0; i--) {
    let paddedSquare = document.createElement("div");
    paddedSquare.setAttribute("id", "padded-square");
    paddedSquare.innerHTML = lastMonthDayCount - i + 1;
    calendar.appendChild(paddedSquare);
  }
  for (let i = 0; i < thisMonthDayCount; i++) {
    let day = document.createElement("div");
    day.innerHTML = i + 1;
    calendar.appendChild(day);
  }

  if (firstDay + 1 + thisMonthDayCount < NUM_OF_BOXES) {
    for (let i = 0; i < NUM_OF_BOXES - (firstDay + thisMonthDayCount); i++) {
      let paddedSquare = document.createElement("div");
      paddedSquare.setAttribute("id", "padded-square");
      paddedSquare.innerHTML = i + 1;
      calendar.appendChild(paddedSquare);
    }
  }
  let month = date.toLocaleString("default", { month: "long" });
  let year = date.getFullYear();
  let h1 = document.getElementById("month");

  h1.innerHTML = month +" "+ year;
  console.log(firstDay);
  console.log(thisMonthDayCount);
}

function getMonth() {
  return new Date();
}