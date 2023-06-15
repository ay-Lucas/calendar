// const calendar = document.createElement("calendar");
const NUM_OF_BOXES = 42;
const calendar = document.getElementById("calendar");
const nextMonthButton = document.getElementById("next");
const previousMonthButton = document.getElementById("previous");
const deleteIcon = document.createElement("span");
deleteIcon.setAttribute("id", "delete-icon");
deleteIcon.setAttribute("class", "material-icons-outlined");
deleteIcon.innerHTML = "delete";
// const menu = document.getElementById("task-menu");
// const grid = document.querySelector(".grid");
// const container = document.querySelector(".container");
// const span = document.getElementById("exit");

// const input = document.getElementById("task-input");
// const menu = document.getElementById("task-menu");
let month = 0;
let date = new Date();
loadCalendar(date);

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
    // editTask(event);
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
        taskMenu(event, day, task);
    }
});

function taskMenu(event, day, task) {
    let menu = document.createElement("div");
    let input = document.createElement("input");
    let span = document.createElement("span");
    let button = document.createElement("button");

    button.setAttribute("id", "menu-button");
    menu.setAttribute("id", "task-menu");
    span.setAttribute("id", "exit");
    span.innerHTML = "\u00d7";
    menu.appendChild(span);

    input.setAttribute("id", "task-input");
    input.setAttribute("type", "text");
    input.setAttribute("onkeyup", "getInput()");

    button.append(deleteIcon);
    day.append(menu);
    menu.append(input);
    menu.append(button);
    if (event.target.className === "task") {
        let currentTask = document.getElementById(event.target.id);
        console.log(currentTask.textContent);
        input.value = currentTask.textContent;
    }
    span.addEventListener("click", function (event) {
        menu.remove();
        if (task.textContent === "") {
            task.remove();
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
            task.remove();
        } catch (exc) {
            console.log("dumb bug");
        }
        menu.remove();
    });
}

function getInput() {
    const input = document.getElementById("task-input");
    input.addEventListener("keyup", function (event) {
        if (event.code === "Enter" && input.value !== "") {
            const taskCount =
        event.target.parentElement.parentElement.children.length - 1;
            // console.log(event.target.parentElement.previousElementSibling.id);
            console.log(taskCount);
            let task = document.getElementById(
                event.target.parentElement.previousElementSibling.id
            );
            console.log(
                event.target.parentElement.previousElementSibling.id + " " + taskCount
            );
            const menu = document.getElementById("task-menu");
            const p = document.createElement("p");
            p.innerHTML = input.value;
            task.appendChild(p);
            task.innerHTML = input.value;
            console.log(p);
            console.log(event.target);
            input.value = "";
            document.getElementById("task-menu").remove();
            // if()
        }
    });
}

//TODO --> BUG : message editing and deletion selects the last created task
//TODO --> BUG : calendar div task y-axis overflow