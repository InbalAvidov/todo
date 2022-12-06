const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos
    var todosToShow = []
    if (gFilterBy === 'txt') todosToShow = gTodos.sort((a, b) => a.txt.localeCompare(b.txt))
    if (gFilterBy === 'created') todosToShow = gTodos.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    if (gFilterBy === 'importance')  todosToShow = gTodos.sort((a, b) => a.importance-b.importance)
    if (gFilterBy === 'done' || gFilterBy === 'active') {
        todosToShow = gTodos.filter(todo =>
            todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active')
    }
    return todosToShow
}

function addTodo(txt, num) {
    const todo = _createTodo(txt, num)
    gTodos.push(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function getStatusTodos(){
    if (gTodos.length===0) return 'No Todos left'
    if (gTodos.filter(todo => !todo.isDone).length === gTodos.length) return 'No Done Todos'
    if (gTodos.filter(todo => !todo.isDone).length === 0) return 'No Active Todos'
    else return 'Keep working'
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}
function _createTodo(txt, num = 3) {
    const now = new Date(Date.now());
    const currentTime = now.getHours() + ':' + _addLeadingZeros(now.getMinutes(), 2);
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: currentTime,
        importance: num
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}