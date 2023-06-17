// const calendar = document.createElement("calendar");
const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
const nextMonthButton = document.getElementById("next");
const previousMonthButton = document.getElementById("previous");
const deleteIcon = document.createElement("span");
// const input = document.getElementById("task-input");
let currentTask = "";
deleteIcon.setAttribute("id", "delete-icon");
deleteIcon.setAttribute("class", "material-icons-outlined");
deleteIcon.innerHTML = "delete";
const input = document.createElement("input");
input.setAttribute("id", "task-input");
input.setAttribute("type", "text");
let month = 0;
let date = new Date();
loadCalendar(date);

// move();

function loadCalendar(date) {
    let month = date.toLocaleString("default", { month: "long" });
    let year = date.getFullYear();
    let h1 = document.getElementById("month");
    h1.innerHTML = month + " " + year;
    if (calendar.innerHTML !== null) {
        calendar.innerHTML = "";
    }
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
    let paddedSquareCount = 0;
    for (let i = firstDay; i > 0; i--) {
        let paddedSquare = document.createElement("div");
        paddedSquareCount++;
        paddedSquare.setAttribute("class", "padded-square-previous");
        paddedSquare.setAttribute("id", "pad" + paddedSquareCount.toString());

        paddedSquare.innerHTML = lastMonthDayCount - i + 1;
        calendar.appendChild(paddedSquare);
    }
    for (let i = 0; i < thisMonthDayCount; i++) {
        let day = document.createElement("div");
        day.innerHTML = i + 1;
        day.setAttribute("class", "this-month");
        day.setAttribute("id", month + "-" + (i + 1).toString());
        calendar.appendChild(day);
    }
    if (firstDay + 1 + thisMonthDayCount < NUM_OF_BOXES) {
        for (let i = 0; i < NUM_OF_BOXES - (firstDay + thisMonthDayCount); i++) {
            paddedSquareCount++;
            let paddedSquare = document.createElement("div");
            paddedSquare.setAttribute("class", "padded-square-next");
            paddedSquare.setAttribute("id", "pad" + paddedSquareCount.toString());
            paddedSquare.innerHTML = i + 1;
            calendar.appendChild(paddedSquare);
        }
    }
}

nextMonthButton.addEventListener("click", function (event) {
    month += 1;
    let date = new Date();
    let nextMonth = new Date(date.getFullYear(), date.getMonth() + month);
    loadCalendar(nextMonth);
});
previousMonthButton.addEventListener("click", function (event) {
    month -= 1;
    let date = new Date();
    let previousMonth = new Date(date.getFullYear(), date.getMonth() + month);
    loadCalendar(previousMonth);
});

//clicks on other days are ignored when the task menu is opened
calendar.addEventListener("click", function (event) {
    const menu = document.getElementById("task-menu");
    const day = document.getElementById(event.target.id);
    if (menu !== null || event.target.id === "exit") {
        return;
    } else if (event.target.className === "task") {
    // move(document.getElementById(event.target.id));
        let day = document.getElementById(event.target.parentElement.id);
        console.log(event, day, event.target.id);
        taskMenu(event, day, event.target.id);
        return;
    } else if (
        event.target.className === "this-month" ||
    event.target.className === "padded-square-previous" ||
    event.target.className === "padded-square-next"
    ) {
    // if(event.target.className === "this-month")
    //creates task
        const taskLength = event.target.children.length;
        let task = document.createElement("div");
        task.setAttribute("class", "task");
        task.setAttribute("id", event.target.id + "-task-" + (taskLength + 1));
        day.appendChild(task);
        currentTask = task;
        taskMenu(event, day);
    }
});
let offsetX, offsetY;
const move = (e) => {
    currentTask.style.left = `${e.clientX - offsetX}px`;
    currentTask.style.top = `${e.clientY - offsetY}px`;
    // currentTask.style.top = `${e.cl}`

    offsetX = e.clientX - currentTask.offsetLeft;
    offsetY = e.clientY - currentTask.offsetTop;

    document.addEventListener("mousemove", move);
    currentTask.addEventListener("mousedown", (e) => {});

    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
    });
};

function taskMenu(event, day) {
    input.value = "";
    let menu = document.createElement("div");
    // let input = document.createElement("input");
    let span = document.createElement("span");
    let button = document.createElement("button");
    button.setAttribute("id", "menu-button");
    menu.setAttribute("id", "task-menu");
    span.setAttribute("id", "exit");
    span.innerHTML = "\u00d7";
    menu.appendChild(span);

    // input.setAttribute("onkeyup", "getInput()");

    button.append(deleteIcon);
    day.append(menu);
    menu.append(input);
    menu.append(button);
    if (event.target.className === "task") {
        currentTask = document.getElementById(event.target.id);
        console.log(currentTask.textContent);
        input.value = currentTask.textContent;
    }

    // getInput(task);
    span.addEventListener("click", function (event) {
        menu.remove();
        if (currentTask.textContent === "") {
            currentTask.remove();
        }
    });
    button.addEventListener("click", function (e) {
        if (event.target.className === "task") {
            let currentTask = document.getElementById(event.target.id);
            console.log(currentTask.textContent);
            currentTask.remove();
        }
        console.log(e.target.parentElement.parentElement.parentElement.id);
        try {
            currentTask.remove();
        } catch (exc) {
            console.log("dumb bug");
        }
        menu.remove();
    });
}

input.addEventListener("keyup", function (event) {
    if (event.code === "Enter" && input.value !== "") {
    // console.log(event.target.parentElement.previousElementSibling.id);
        console.log(currentTask);
        currentTask.innerHTML = input.value;
        // currentTask.value = "";
        input.value = "";
        // if (document.getElementById("task-menu") !== null) {
        document.getElementById("task-menu").remove();
    // return input.value;
    }
});

//TODO --> BUG : calendar div task y-axis overflow