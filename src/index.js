// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const taskForm = document.querySelector(".form-task"),
  taskInput = taskForm.querySelector(".input-task"),
  taskList = document.querySelector(".task-list"),
  finishedList = document.querySelector(".finished-list");
const Tasks = "MyTask";
const finishedTasks = "FinishedTask";
const IdCounts = "Count";
let tasks_arr = [];
let finishedTasks_arr=[];
// let id_count = 0;
function saveTasks(task_status,task_list){
  localStorage.setItem(task_status,JSON.stringify(task_list));
}
// function saveCount(){
//   localStorage.setItem(IdCounts,id_count);
// }
function deleteTask(task_status,event){
  const btn = event.target;
  const li__column = btn.parentNode;
  const li = li__column.parentNode;
  if(task_status === Tasks){
    
      taskList.removeChild(li);
      cleanTasks_arr = tasks_arr.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    })
      tasks_arr = cleanTasks_arr;
      saveTasks(task_status,tasks_arr);
  }else if(task_status === finishedTasks){
      
      finishedList.removeChild(li);
      cleanTasks_arr = finishedTasks_arr.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    })
      
      finishedTasks_arr = cleanTasks_arr;
      saveTasks(task_status,finishedTasks_arr);
  }
  
}

function switchBetweenBoard(task_status,event){
  const btn = event.target;
  const li__column = btn.parentNode;
  const li = li__column.parentNode;
  
  if(task_status === Tasks){
    taskList.removeChild(li);
    console.log(li.id)
    doneTask_arr =  tasks_arr.filter(function(toDo){
    return toDo.id === parseInt(li.id);
    })
    console.log(doneTask_arr);
    const doneTask_text = doneTask_arr[0].text;
    const doneTask_id = doneTask_arr[0].id;
    const taskObj = {
      text : doneTask_text,
      id : doneTask_id
    }
    finishedTasks_arr.push(taskObj);
    saveTasks(finishedTasks,finishedTasks_arr);
    
    cleanTasks_arr = tasks_arr.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    })
    tasks_arr = cleanTasks_arr;
    saveTasks(Tasks,tasks_arr);
    showTask(doneTask_text,doneTask_id,finishedTasks);
  }else if(task_status === finishedTasks){
    finishedList.removeChild(li);
    
    backTasks_arr =  finishedTasks_arr.filter(function(toDo){
      
      return toDo.id === parseInt(li.id);
    })
    const backTask_text = backTasks_arr[0].text;
    const backTask_id = backTasks_arr[0].id;
    const taskObj = {
      text : backTask_text,
      id : backTask_id
    }
    tasks_arr.push(taskObj);
    saveTasks(Tasks,tasks_arr);
    
    cleanTasks_arr = finishedTasks_arr.filter(function(toDo){
      return toDo.id !== parseInt(li.id);
    })
    finishedTasks_arr = cleanTasks_arr;
    saveTasks(finishedTasks,finishedTasks_arr);
    showTask(backTask_text,backTask_id,Tasks);
  }
  
  
}

function showTask(task,task_id,task_status) {
  if(task_status === Tasks){
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,Tasks));
    
    const doneBtn = document.createElement("button");
    doneBtn.addEventListener("click",switchBetweenBoard.bind(null,Tasks));
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    doneBtn.innerHTML = `<i class="fas fa-check "></i>`;
    const span = document.createElement("span");
    span.innerText = task;
    
    div__span.appendChild(span);
    div__btn.appendChild(doneBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    taskList.appendChild(li);
    li.id = task_id;
    
  }else if(task_status === finishedTasks){
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,finishedTasks));
    const backBtn = document.createElement("button");
    backBtn.addEventListener("click",switchBetweenBoard.bind(null,finishedTasks));
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    backBtn.innerHTML = `<i class="fas fa-backward"></i>`;
    const span = document.createElement("span");
    span.innerText = task;
    
    div__span.appendChild(span);
    div__btn.appendChild(backBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    finishedList.appendChild(li);
    li.id = task_id;
 

  }
}
  function addTask(task){
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,Tasks));
    
    const doneBtn = document.createElement("button");
    doneBtn.addEventListener("click",switchBetweenBoard.bind(null,Tasks));
    delBtn.innerHTML = `<i class="fas fa-trash "></i>`;
    doneBtn.innerHTML = `<i class="fas fa-check "></i>`;
    const span = document.createElement("span");
    span.innerText = task;
    let local_idCount = localStorage.getItem(IdCounts);
    if(local_idCount !== null){
      local_idCount = parseInt(local_idCount);
      
      local_idCount+=1;
      
      localStorage.setItem(IdCounts,local_idCount);
    }else{
      localStorage.setItem(IdCounts,1);
    }
    // id_count += 1;
    const newId = localStorage.getItem(IdCounts);
    div__span.appendChild(span);
    div__btn.appendChild(doneBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    taskList.appendChild(li);
    li.id = newId;
    const taskObj = {
      text : task,
      id : parseInt(newId)
    };
    tasks_arr.push(taskObj);
    saveTasks(Tasks,tasks_arr);
    
  }



function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  addTask(currentValue);
  taskInput.value = "";
}
function loadTasks() {
  const loadedTasks = localStorage.getItem(Tasks);
  
  if (loadedTasks !== null) {
      const parsedTasks = JSON.parse(loadedTasks);
      parsedTasks.forEach(function(toDo){
        const taskObj = {
        text: toDo.text,
        id: toDo.id
      };
      tasks_arr.push(taskObj);
      showTask(toDo.text,toDo.id,Tasks);
    }
    );
      
  }
}
function loadFinishedTasks(){
  const loadedFinishedTasks = localStorage.getItem(finishedTasks);
 
  if (loadedFinishedTasks !== null) {
      const parsedFinishedTasks = JSON.parse(loadedFinishedTasks);
      parsedFinishedTasks.forEach(function(toDo){
        const taskObj = {
        text: toDo.text,
        id: toDo.id
      };
      finishedTasks_arr.push(taskObj);
      showTask(toDo.text,toDo.id,finishedTasks);
    }
    );
  }
}
function init() {
  loadTasks();
  loadFinishedTasks();
  taskForm.addEventListener("submit", handleSubmit);
}
init();
