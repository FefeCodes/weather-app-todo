let form = document.getElementById("form")
let todoInput = document.getElementById("todo-input")
let todoItemContainer = document.getElementById("todo-item-container")

//array collecting all to do item object literal

let todoItemsArray = []
let editingSignal = -1

//colecting to do from todo input field
form.addEventListener("submit", collectToDo)
function collectToDo(event){
    event.preventDefault()
    let todoInputValue = todoInput.value

    if(todoInputValue.length === 0){
        alert("Enter an item")
    }else if(editingSignal >= 0){
        todoItemsArray = todoItemsArray.map( function(todoObject, index){
            if(editingSignal === index){
                return{
                        todoItemEntered : todoInputValue,
                        completed : todoObject.completed
                }
            }else{
                return{
                        todoItemEntered : todoObject.todoItemEntered,
                        completed : false
                }
            }
        })
    }else{
        const todoObjectLiteral = {
            todoItemEntered : todoInputValue,
            completed : false
        }
        todoItemsArray.push(todoObjectLiteral)
    }

    localStorage.setItem("todos", JSON.stringify(todoItemsArray))
    form.reset()
    showTodoOnUI()
}

function fetchTodoItems(){
    if(localStorage.getItem("todos")){
        todoItemsArray = JSON.parse(localStorage.getItem("todos"))
    }
    showTodoOnUI()
}
fetchTodoItems()

function showTodoOnUI(){
    todoItemContainer.innerHTML = []
    todoItemsArray.forEach(function(todoitem, index){
        let todoPrinted = todoitem.todoItemEntered
        

       let todoItemDiv = document.createElement("div")
       todoItemDiv.classList.add("todo-item")
       todoItemDiv.setAttribute("id", `${index}`)

       let leftSideDiv = document.createElement("div")
       leftSideDiv.classList.add("left-side")

       let uncheckedIcon = document.createElement("i")
       uncheckedIcon.classList.add("fa-regular", "fa-circle")
       uncheckedIcon.setAttribute("data-action", "check")

       let checkedIcon = document.createElement("i")
       uncheckedIcon.classList.add("fa-regular", "fa-circle-dot")
       checkedIcon.setAttribute("data-action", "check")

       let todoText = document.createElement("p")
       todoText.textContent = todoPrinted
       todoText.setAttribute("data-action", "check")

       let rightSideDiv = document.createElement("div")
       rightSideDiv.classList.add("right-side")

       let editIcon = document.createElement("i")
       editIcon.classList.add("fa-solid", "fa-pen-to-square")
       editIcon.setAttribute("data-action", "edit")

       let deleteIcon = document.createElement("i")
       deleteIcon.classList.add("fa-solid", "fa-trash")
       deleteIcon.setAttribute("data-action", "delete")

       if(!todoitem.completed){
          leftSideDiv.append(uncheckedIcon, todoText)
          rightSideDiv.append(editIcon, deleteIcon)
          todoItemDiv.append(leftSideDiv, rightSideDiv)
          todoItemContainer.append(todoItemDiv)
       }else{
        leftSideDiv.append(checkedIcon, todoText)
        rightSideDiv.append(editIcon, deleteIcon)
        todoItemDiv.append(leftSideDiv, rightSideDiv)
        todoItemContainer.append(todoItemDiv)
        todoText.style.textDecoration = "line-through"
       } 
    })
}

todoItemContainer.addEventListener("click", targetTodoItem)
function targetTodoItem(event){
    let targetOfUser = event.target
    let grandParentElement = targetOfUser.parentElement.parentElement
    if(!grandParentElement.classList.contains("todo-item")) return

   let todoID = Number(grandParentElement.id)
   let clickedAction = targetOfUser.dataset.action

   if(clickedAction === "check"){
    checkATodoItem(todoID)
   }else if(clickedAction === "edit"){
    editATodoItem(todoID)
   }else if(clickedAction === "delete"){
    deleteATodoItem(todoID)
   }
}

function checkATodoItem(ID){
    todoItemsArray = todoItemsArray.map(function(todoObject, index, fullArray){
        if(index === ID){
            return{
                todoItemEntered : todoObject.todoItemEntered,
                completed : !todoObject.completed
            }
        }else{
            return{
                todoItemEntered : todoObject.todoItemEntered,
            completed : todoObject.completed
            }
        }
    })
    
    showTodoOnUI()
}

function editATodoItem(ID){
    todoInput.value = todoItemsArray[ID].todoItemEntered
    editingSignal = ID
}


function deleteATodoItem(ID){
    todoItemsArray = todoItemsArray.filter(function(item, index){
        return index !== ID
    })
    showTodoOnUI()
}