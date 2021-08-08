let toDo = [];
let index = 0;
const getNewToDoElement = (context) => {
    let root = document.createElement('div');
    root.classList.add('box');
    let columns = document.createElement('div');
    columns.classList.add('columns');
    let textDiv = document.createElement('div');
    textDiv.classList.add('column');
    textDiv.classList.add('is-four-fifths');
    if (context.complete) {
        textDiv.classList.add('complete');
    }
    let inputText = document.createTextNode(context.name);
    let iconDiv = document.createElement('div');
    iconDiv.classList.add('column')
    let iconSpan = document.createElement('span');
    iconSpan.classList.add('icon');
    let iconColumns = document.createElement('columns');
    iconColumns.classList.add('columns');
    let checkboxColumn = document.createElement('div');
    checkboxColumn.classList.add('column');
    let checkboxLabel = document.createElement('label');
    checkboxLabel.classList.add('checkbox');
    let checkboxInput = document.createElement('input');
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.dataset.index = context.index;
    checkboxInput.checked = context.complete;

    /** Handle Complete Event */
    checkboxInput.addEventListener('click', function (e) {
        let curr = checkboxInput.dataset.index;
        if (this.checked) {
            textDiv.classList.add('complete');
        } else {
            textDiv.classList.remove('complete');
        }
        toDo = toDo.map(toDoElement => {
            if (toDoElement.index == curr) {
                toDoElement.complete = this.checked;
            }
            return toDoElement;
        })
        localStorage.setItem('toDo', JSON.stringify(toDo));
    })
    let iconColumnDiv = document.createElement('div');
    iconColumnDiv.classList.add('column');
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-trash');
    icon.dataset.index = context.index;

    /** Handle Delete Event */
    icon.addEventListener('click', function (e) {
        let curr = icon.dataset.index;

        toDo = toDo.filter(toDoElement => {
            console.log(toDoElement);
            return toDoElement.index != curr;
        });

        localStorage.setItem('toDo', JSON.stringify(toDo));
        root.parentNode.removeChild(root);
    }, false);

    textDiv.appendChild(inputText);
    root.appendChild(columns);
    columns.appendChild(textDiv);
    columns.appendChild(iconDiv);
    iconDiv.appendChild(iconSpan);
    iconSpan.appendChild(checkboxColumn);
    checkboxColumn.appendChild(checkboxLabel);
    checkboxLabel.appendChild(checkboxInput);
    iconSpan.appendChild(iconColumnDiv);
    iconColumnDiv.appendChild(icon);
    return root;
}

const addToDo = () => {
    let input = document.querySelector('input').value;
    if (input) {
        let context = { name: input, complete: false, index: index++ }
        let toDoElement = getNewToDoElement(context);
        let list = document.querySelector('.list');
        list.prepend(toDoElement);
        toDo.push(context);
        localStorage.setItem('toDo', JSON.stringify(toDo));
        localStorage.setItem('lastIndex', toDo.length);
        document.querySelector('input').value = '';
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.add').addEventListener("click", addToDo);
    let input = document.querySelector('input');
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            addToDo();
        }
    });
    // localstorage logic
    let toDoLocal = localStorage.getItem('toDo');
    if (toDoLocal) {
        toDo = JSON.parse(toDoLocal);
    } else {
        localStorage.removeItem('lastIndex');
    }
    if (toDo.length > 0) {
        toDo.forEach(toDoElement => {
            let createdToDoElement = getNewToDoElement(toDoElement);
            let list = document.querySelector('.list');
            list.prepend(createdToDoElement);
        });
    } else {
        localStorage.removeItem('lastIndex');
        localStorage.removeItem('toDo');
    }

    index = localStorage.getItem('lastIndex', 0)
})

