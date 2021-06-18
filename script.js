var todos=[{id:Math.random()*10000,text:"Buy fruits",completed:false},{id:Math.random()*10000,text:"Clean kitchen",completed:true},{id:Math.random()*10000,text:"go to school",completed:false}]
var filters={searchText:"",hideCompleted:false}
var listStyle=""
function renderTodos(todos,filters){
    var filteredTodos=todos.filter((todo,index)=>{
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    var inCompleteTodos=filteredTodos.filter((todo)=>{
        return !todo.completed
    })

if(filters.hideCompleted)
{
    filteredTodos=filteredTodos.filter((todo)=>{
        return !todo.completed
    })
}
    var list=document.getElementById("list")
    var summary=document.getElementById("summary")
    summary.innerHTML=`You have ${inCompleteTodos.length} todos left`
    list.innerHTML=""
    var html=""
    filteredTodos.forEach((todo,index)=>{
        if(todo.completed){
            listStyle="line-through"
        }
        else{
            listStyle="none"
        }
        html+=`<li style='text-decoration:${listStyle}' id=${todo.id}><span>${todo.text}</span><div><button class="done_btn" onclick='done(${todo.id})'>Done</button><button class="edit_btn" onclick='editTodo(${todo.id})'>Edit</button><button class="delete_btn" onclick='deleteTodo(${todo.id})'>Delete</button></div></li>`
        
    })
    list.innerHTML=html
}

renderTodos(todos,filters)


function done(id){
  var done=todos.findIndex((todo)=>{
      return todo.id===id
  })
  var list=document.getElementById("list")
  list.querySelectorAll("li")[done].style.textDecoration="line-through"
  todos[done].completed=true 
  renderTodos(todos,filters)
  //   document.getElementById(`${done.id}`).style.textDecoration="line-through"
}

function deleteTodo(id){
var deleted=todos.findIndex((todo)=>{
    return todo.id===id
})
todos.splice(deleted,1)
renderTodos(todos,filters)
}

function editTodo(id){
    var edited=todos.findIndex((todo)=>{
        return todo.id===id
    })

    var updated=prompt("Edit your todo:",todos[edited].text)
    todos[edited].text=updated
    todos[edited].completed=false
    renderTodos(todos,filters)
}

function add(){
    var text=document.getElementById("text")
    if(text.value===""){
        alert("Please write something..")
        return
    }
    todos.push({
        id:Math.random()*10000,
        text:text.value,
        completed:false
    })
    text.value=""
    renderTodos(todos,filters)
}

var search=document.getElementById("filters")

search.addEventListener("input",function(e){
    filters.searchText=e.target.value
    renderTodos(todos,filters)
})

var hide=document.getElementById("hidecompleted")
hide.addEventListener("change",function(e){
    filters.hideCompleted=e.target.checked
    renderTodos(todos,filters)
})