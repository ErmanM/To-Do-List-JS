var btn = document.getElementById("addBtn");
var ul = document.getElementById('ul');

display();


function generateId(){
    var randomId = Math.floor(Math.random() * 100);
    return randomId;
}

function save(){
    var myArr = getAll();

    if(myArr === null) {
        myArr = [];
    }

    
    
    var userInput = document.getElementById("tittle").value;
    var description = document.getElementById("description").value;
    var category = document.getElementById("category").value;
    var id = document.getElementById('id').value;

    var objectId = generateId();

   if (id != ""){
        objectId = id;
   }

    let toDo = {
        id: +objectId,
        tittle: userInput,
        description: description,
        category: category,
    }
    

   var exist = myArr.find(x => x.id == toDo.id)

   if(exist != null){
    var index = myArr.indexOf(exist);
    myArr[index] = toDo;
   }else{
    myArr.push(toDo);
   }

   if(userInput === ""){
    var warning = document.getElementById("required");
    warning.style.display = "flex";
    return
} else{
    var warning = document.getElementById("required");
    warning.style.display = "none";
   

 
}
 
localStorage.setItem('todos', JSON.stringify(myArr));  
document.getElementById("tittle").value = "";
document.getElementById("description").value = "";
document.getElementById("category").value = "";
document.getElementById('id').value = "";
display();



}




function getAll(){
    var todos = localStorage.getItem('todos');
    return JSON.parse(todos);
}

function getById(id){
   var allTodos = getAll();

   var todo = allTodos.find(x => x.id == id);

   if(todo == null || todo == undefined){
    console.log("todo with given id does not exist!!")
    return;
   }
    return todo;
}

function deleteById(id){

    var AllTodos = getAll();
    
    var todo = AllTodos.find(z => z.id == id);

    var list = document.getElementById('list'+todo.id)

    list.remove();

    var toDoIndex = AllTodos.indexOf(todo);

    AllTodos.splice(toDoIndex, 1);

    localStorage.setItem('todos', JSON.stringify(AllTodos)); 
   

}


function display(){
   
   var allItems = getAll();
   if(allItems == null || allItems.length === 0) {
    return
   }

   for (var i = 0; i < allItems.length; i++){ 
        var exist = document.getElementById('list' + allItems[i].id)

        if(exist === null){
            var list = document.createElement("list");
            list.setAttribute("id", "list" + allItems[i].id);
            list.appendChild(document.createTextNode(allItems[i].tittle));
            ul.appendChild(list);
            list.innerText = allItems[i].tittle;

            var deleteBtn = document.createElement('button');
            deleteBtn.setAttribute("id", "delete");
            deleteBtn.innerText = 'Delete';
            deleteBtn.setAttribute('onclick',  'deleteById(' + allItems[i].id + ')')
            list.appendChild(deleteBtn);
            
            var editBtn = document.createElement('button');
            editBtn.setAttribute('id', "edit");
            editBtn.innerText = "Edit";
            editBtn.setAttribute('onclick','fillForm('+ allItems[i].id + ')')
            list.appendChild(editBtn);
        }else{
            var list = document.getElementById("list" + allItems[i].id);
            list.innerText = allItems[i].tittle;
      
            

            var deleteBtn = document.createElement('button');
            deleteBtn.setAttribute("id", "delete");
            deleteBtn.innerText = 'Delete';
            deleteBtn.setAttribute('onclick',  'deleteById(' + allItems[i].id + ')')
            list.appendChild(deleteBtn);
            
            var editBtn = document.createElement('button');
            editBtn.setAttribute('id', "edit");
            editBtn.innerText = "Edit";
            editBtn.setAttribute('onclick','fillForm('+ allItems[i].id + ')')
            list.appendChild(editBtn);

        }
    }

}


function fillForm(id){
  var todo = getById(id);
  document.getElementById('tittle').value = todo.tittle;
  document.getElementById('description').value = todo.description;
  document.getElementById('category').value = todo.category;
  document.getElementById('id').value = todo.id;

  

}

getAll();

