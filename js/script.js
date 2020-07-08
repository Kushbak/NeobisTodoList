let taskList = document.querySelector('.list');
let input = document.querySelector('.input'); 
 

// Done all tasks

let doneAllBtn = document.querySelector('#doneAll'); 

doneAllBtn.addEventListener('click', () => {
	let items = document.querySelectorAll('.item');   



})



// Done one task

let doneItem = (item) => {
	item.classList.toggle('checked')
} 



// Edit one tasks

let editItem = (item, err) => {
	item.disabled = false
	item.focus(); 
	item.addEventListener('blur', () => {
		if(item.value){
			item.disabled = true
			err.style.display = 'none'
		} else{
			err.style.display = 'block'
			item.focus();
		} 
	})
}



// Remove all tasks

let removeAllBtn = document.querySelector('#removeAll');

removeAllBtn.addEventListener('click', () => {
	let childs = taskList.children;
	for (let child of childs) {
		child.remove();
	} 
})



// Remove one task 

let removeItem = (item) => {
	taskList.removeChild(item)
}




// Add task

let addTaskBtn = document.querySelector('#addTask'); 
 
addTaskBtn.addEventListener('click', () => {
	let errorMsg = document.querySelector('.error');
	errorMsg.style.display = 'none'  

	if(input.value){

		let item = document.createElement('div'); 			
		item.className = 'item';  
		
		let itemName = document.createElement('input');			
		itemName.className = 'item__name';
		itemName.value = input.value
		itemName.type = 'text'
		itemName.disabled = true
		localStorage.setItem('name', itemName.value)


		let btnBlock = document.createElement('div');		
		btnBlock.className = 'buttons'; 

		let remove = document.createElement('button');		 	
		remove.className = 'button item__btn';
		remove.innerHTML = 'Remove'; 
		remove.setAttribute("id", "remove");
		remove.addEventListener('click', () => removeItem(item))

		let done = document.createElement('button'); 			
		done.className = 'button item__btn'; 
		done.innerHTML = 'Done'; 
		done.setAttribute("id", "done");
		done.addEventListener('click', () => doneItem(item))

		let err = document.createElement('span')		
		err.className = 'item__err'; 
		err.innerHTML = 'Field should be not empty' 

		let edit = document.createElement('button'); 			
		edit.className = 'button item__btn'; 
		edit.innerHTML = 'Edit'
		edit.setAttribute("id", "edit");
		edit.addEventListener('click', () => editItem(itemName, err))
		 

		taskList.appendChild(item); 
		item.appendChild(itemName); 
		item.appendChild(err); 
		item.appendChild(btnBlock); 
		btnBlock.appendChild(edit);
		btnBlock.appendChild(remove); 
		btnBlock.appendChild(done);
	} else{
		errorMsg.style.display = 'block'
	}
 	
 	input.value = ''

})
