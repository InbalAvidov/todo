
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         <span class="info">(${todo.importance})</span> ${todo.txt} 
        <button onclick="onRemoveTodo(event,'${todo.id}')" >x</button> 
        <span class="info"> created at: ${todo.createdAt} </span>
    </li>` )

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos').innerText = getTotalTodos()
    document.querySelector('.active-todos').innerText = getActiveTodos()
    document.querySelector('.status-todos').innerText = getStatusTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="todo-txt"]').value
    const elImportance = document.querySelector('input[name="todo-importance"]').value

    if (!elTxt) {
        elImportance = ''
        return
    } else {
        elTxt= ''
        elImportance = ''
        addTodo(elTxt, elImportance)
        renderTodos()
    }

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    var deleteTodo = confirm('Are you sure you want to delete this Todo?')
    if (!deleteTodo) return
    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}


