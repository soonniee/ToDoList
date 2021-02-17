// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const taskForm = document.querySelector(".form-task"),
  taskInput = taskForm.querySelector(".input-task"),
  pendingList = document.querySelector(".pending-list"),
  finishedList = document.querySelector(".finished-list");
const Pending = "Pending";
const Finished = "Finished";

let pendingTasks_arr = [];
let finishedTasks_arr=[];

function saveTasks(){
  localStorage.setItem(Pending,JSON.stringify(pendingTasks_arr));
  localStorage.setItem(Finished,JSON.stringify(finishedTasks_arr));
}

function deleteTask(task_status,event){
  if(!confirm('Do you really want to delete?')){
    event.preventDefault();
  }
  else{
    const btn = event.target;
    const li__column = btn.parentNode;
    const li = li__column.parentNode;
    if(task_status === Pending){
      
        pendingList.removeChild(li);
        cleanTasks_arr = pendingTasks_arr.filter(function(task){
        return task.id !== li.id;
      })
        pendingTasks_arr = cleanTasks_arr;
        saveTasks();
    }else if(task_status === Finished){
        
        finishedList.removeChild(li);
        cleanTasks_arr = finishedTasks_arr.filter(function(task){
        return task.id !== li.id;
      })
        
        finishedTasks_arr = cleanTasks_arr;
        saveTasks();
    }
  }
  
  
}

function switchBetweenBoard(task_status,event){
  const btn = event.target;
  const li__column = btn.parentNode;
  const li = li__column.parentNode;
  
  if(task_status === Pending){
    pendingList.removeChild(li);
    
    doneTask_arr =  pendingTasks_arr.find(function(task){
    return task.id === li.id;
    })
    
   
    finishedTasks_arr.push(doneTask_arr);
    saveTasks();
    
    cleanTasks_arr = pendingTasks_arr.filter(function(task){
      return task.id !== li.id;
    })
    pendingTasks_arr = cleanTasks_arr;
    saveTasks();
    showTask(doneTask_arr,Finished);
  }else if(task_status === Finished){
    finishedList.removeChild(li);
    
    backTasks_arr =  finishedTasks_arr.find(function(task){
      
      return task.id === li.id;
    })
    
    pendingTasks_arr.push(backTasks_arr);
    saveTasks();
    
    cleanTasks_arr = finishedTasks_arr.filter(function(task){
      return task.id !== li.id;
    })
    finishedTasks_arr = cleanTasks_arr;
    saveTasks();
    showTask(backTasks_arr,Pending);
  }
  
  
}

function showTask(task,task_status) {
  if(task_status === Pending){
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,Pending));
    
    const doneBtn = document.createElement("button");
    doneBtn.addEventListener("click",switchBetweenBoard.bind(null,Pending));
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    doneBtn.innerHTML = `<i class="fas fa-check "></i>`;
    const span = document.createElement("span");
    span.innerText = task.text;
    
    div__span.appendChild(span);
    div__btn.appendChild(doneBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    pendingList.appendChild(li);
    li.id = task.id;
    
  }else if(task_status === Finished){
    
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,Finished));
    const backBtn = document.createElement("button");
    backBtn.addEventListener("click",switchBetweenBoard.bind(null,Finished));
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    backBtn.innerHTML = `<i class="fas fa-backward"></i>`;
    const span = document.createElement("span");
    span.innerText = task.text;
    
    div__span.appendChild(span);
    div__btn.appendChild(backBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    finishedList.appendChild(li);
    li.id = task.id;
 

  }
}
  function addTask(task){
    const li = document.createElement("li");
    const div__span = document.createElement("div");
    div__span.classList.add("li__column");
    const div__btn = document.createElement("div");
    div__btn.classList.add("li__column");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click",deleteTask.bind(null,Pending));
    
    const doneBtn = document.createElement("button");
    doneBtn.addEventListener("click",switchBetweenBoard.bind(null,Pending));
    delBtn.innerHTML = `<i class="fas fa-trash "></i>`;
    doneBtn.innerHTML = `<i class="fas fa-check "></i>`;
    const span = document.createElement("span");
    span.innerText = task;
    
    div__span.appendChild(span);
    div__btn.appendChild(doneBtn);
    div__btn.appendChild(delBtn);
    
    li.appendChild(div__span);
    li.appendChild(div__btn);
    pendingList.appendChild(li);
    const newId = String(Date.now());
    li.id = newId;
    const taskObj = {
      text : task,
      id : newId
    };
    pendingTasks_arr.push(taskObj);
    saveTasks();
    
  }



function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  addTask(currentValue);
  taskInput.value = "";
}
function loadTasks() {
  const loadedTasks = localStorage.getItem(Pending);
  
  if (loadedTasks !== null) {
      const parsedTasks = JSON.parse(loadedTasks);
      parsedTasks.forEach(function(task){
      
      pendingTasks_arr.push(task);
      showTask(task,Pending);
    }
    );
      
  }
}
function loadFinishedTasks(){
  const loadedFinishedTasks = localStorage.getItem(Finished);
 
  if (loadedFinishedTasks !== null) {
      const parsedFinishedTasks = JSON.parse(loadedFinishedTasks);
      parsedFinishedTasks.forEach(function(task){
      
      finishedTasks_arr.push(task);
      showTask(task,Finished);
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
