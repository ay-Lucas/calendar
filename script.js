const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
const nextMonthButton = document.getElementById("next");
const previousMonthButton = document.getElementById("previous");
const deleteIcon = document.createElement("span");
let currentTask = document.getElementsByClassName("task");
deleteIcon.setAttribute("id", "delete-icon");
deleteIcon.setAttribute("class", "material-icons-outlined");
deleteIcon.innerHTML = "delete";
const input = document.createElement("input");
input.setAttribute("id", "task-input");
input.setAttribute("type", "text");
let month = 0;
let date = new Date();
loadCalendar(date);
let isDragging = false;
let startPosX = 0;
let startPosY = 0;
let newDay;

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
        paddedSquare.setAttribute("class", "last-month");
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
            paddedSquare.setAttribute("class", "next-month");
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

function startDrag(event) {
    startPosX = event.clientX;
    startPosY = event.clientY;
    calendar.addEventListener("mousemove", moveTask);
    calendar.addEventListener("mouseover", getNewDay);
    isDragging = true;
}

function moveTask(event) {
    if (!isDragging) {
        return;
    }
    const distanceX = event.clientX - startPosX;
    const distanceY = event.clientY - startPosY;
    currentTask.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    console.log(event.target.parentElement.id);
}

function endDrag(event) {
    if (!isDragging) {
        return;
    }
    calendar.removeEventListener("mousemove", moveTask);
    setTimeout(() => {
        if (typeof newDay !== "undefined" && currentTask.parentElement !== newDay) {
            document.getElementById(newDay).append(currentTask);
        }
        calendar.removeEventListener("mouseover", getNewDay);
    }, 5);
    // calendar.removeEventListener("mousemove", moveTask);
    currentTask.style.transform = "translate(0px, 0px)";
    console.log(event.target.id);
    // calendar.removeEventListener()
}

function getNewDay(event) {
    try {
        newDay = event.target.id.toString();
    } catch (e) {
        console.log(e);
    }
}

//clicks on other days are ignored when the task menu is opened
const handleMouseDown = (event) => {
    const menu = document.getElementById("task-menu");
    const day = document.getElementById(event.target.id);
    const taskLength = event.target.children.length;
    if (menu !== null || event.target.id === "exit") {
        return;
    } else if (event.target.className === "task") {
    (document.getElementById(event.target.id));
        let day = document.getElementById(event.target.parentElement.id);
        // currentTask = task;
        console.log(currentTask.style.transform.toString());
        console.log(event, day, event.target.id);
        taskMenu(event, day, event.target.id);
        return;
    } else if (
        event.target.className === "this-month" ||
    event.target.className === "last-month" ||
    event.target.className === "next-month"
    ) {
        console.log("event target is a month");
        // if(event.target.className === "this-month")
        //creates task
        let task = document.createElement("div");
        task.setAttribute("class", "task");
        task.setAttribute("id", event.target.id + "-task-" + (taskLength + 1));
        day.appendChild(task);
        currentTask = task;
        currentTask.addEventListener("mousedown", startDrag);
        currentTask.addEventListener("mouseup", endDrag);
        console.log(currentTask.style.transform.toString());
        // console.log(getComputedStyle(currentTask, "transform"));
        if (currentTask.style) {
            taskMenu(event, day);
        }
    }
    console.log("mouseup fired");
};
calendar.addEventListener("mousedown", handleMouseDown);

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