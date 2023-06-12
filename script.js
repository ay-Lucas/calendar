const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
// const calendar = document.createElement("calendar");
loadCalendar();

function loadCalendar() {
  const date = new Date();
  date.getMonth();
  date.getUTCDate();
  let daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  console.log(daysInMonth);
  let firstDay = new Date(date.getFullYear(), date.getMonth()).getDay();
  console.log(firstDay);
}