let taskInput = document.querySelector(".input-todo input");
let addBtn = document.querySelector(".input-todo button");
let todoList = document.querySelector(".todo-list-ul");
let deleteBtn = document.querySelector(".info-list button");

taskInput.onkeyup = () => {
	let userEnteredValue = taskInput.value;

	if (userEnteredValue.trim() != 0) {
		addBtn.classList.add("active");
	} else {
		addBtn.classList.remove("active");
	}
};

addBtn.addEventListener("click", function () {
	let userEnteredValue = taskInput.value;
	

	const getLocalStorageItem = JSON.parse(localStorage.getItem("todo")) || [];

	getLocalStorageItem.push({ text: userEnteredValue, state: false });

	localStorage.setItem("todo", JSON.stringify(getLocalStorageItem));

	addBtn.classList.remove("active");

	showTasks();
});

function showTasks() {
	const listArray = JSON.parse(localStorage.getItem("todo")) || [];

	let pedningTaskNumber = document.querySelector(".pendingTask");
	pedningTaskNumber.textContent = listArray.length;

	if (listArray.length > 0) {
		deleteBtn.classList.add("active");
	} else {
		deleteBtn.classList.remove("active");
	}

	let newTag = "";
	listArray.forEach((element, index) => {
		newTag += `<li style="border-color: ${element.state === true && "#00ff00"}">${element.text}<span class="icon"><i class="fas fa-check" style="display: ${element.state === true && "none" || "block"}" onClick="doneTask(${index})"></i><i class="fas fa-trash-alt" onclick="deleteTask(${index})"></i></span></li>`;
	});
	todoList.innerHTML = newTag;
	taskInput.value = "";
}

showTasks();

deleteBtn.addEventListener("click", function () {
	localStorage.removeItem("todo");
	showTasks();
});

function deleteTask(index) {
	const getLocalStorageData = JSON.parse(localStorage.getItem("todo")) || [];
	const updateTask = getLocalStorageData.filter((_, i) => i !== index);
	localStorage.setItem("todo", JSON.stringify(updateTask));
	showTasks();
}

deleteTask();

function doneTask(index) {
	let getLocalStorageData = JSON.parse(localStorage.getItem("todo")) || [];
	getLocalStorageData[index] = { ...getLocalStorageData[index], state: true };
	localStorage.setItem("todo", JSON.stringify(getLocalStorageData));
	showTasks();
}

