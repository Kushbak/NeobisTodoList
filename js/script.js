let input = document.querySelector('.input'); 

















// Done all tasks

let doneAllBtn = document.querySelector('#doneAll'); 

doneAllBtn.addEventListener('click', () => {
	let items = document.querySelectorAll('.item');   
	let checkedQuantity = []

	// возможно это не лучшее решение
	for (let i = 0; i < items.length; i++) {
		if(items[i].classList.contains('checked')) {
			checkedQuantity.push(1)
		}
	}
	for (let i = 0; i < items.length; i++) {
		if(checkedQuantity.length == items.length) {
			items[i].classList.remove('checked');
		} else if(checkedQuantity.length < items.length){
			items[i].classList.add('checked')
		}
	} 
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
	let taskList = document.querySelector('.list');
	taskList.remove();
	// пришлось удалять весь блок вместо каждого ребенка, и создавать новый блок  
	// также скопировал таскЛист рядом с каждым упоминанием, а то один раз вызванный для блока не сработает для новосозданного, постоит пока че-нить новое не придумаю
	let blockForHelp = document.querySelector('.add-task-block');		 
	let newList = document.createElement('div'); newList.className = 'list';
	blockForHelp.insertAdjacentElement('afterEnd', newList)
})



// Remove one task 

let removeItem = (item) => {
	let taskList = document.querySelector('.list');

	taskList.removeChild(item)
}




// Add task

let addTaskBtn = document.querySelector('#addTask'); 
 
addTaskBtn.addEventListener('click', () => {
	let errorMsg = document.querySelector('.error');
	errorMsg.style.display = 'none'  

	if(input.value){
		let taskList = document.querySelector('.list');

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
