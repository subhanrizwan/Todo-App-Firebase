
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_I8nBVkxWjiNoQqjmDoNZOnqQwsyHNlo",
    authDomain: "todoapp-js-f1aed.firebaseapp.com",
    projectId: "todoapp-js-f1aed",
    storageBucket: "todoapp-js-f1aed.appspot.com",
    messagingSenderId: "44785612273",
    appId: "1:44785612273:web:4d20fd901e9c53500f4050",
    measurementId: "G-QDNH6PX6W9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();


let arr1 = []
let arr = []
let add = document.getElementById('add_btn')
let todo_value = document.getElementById('todo-get')
let todoList = document.getElementById('list')


add.addEventListener("click", async () => {
  if(todo_value.value){
    // swal("Good job!", "You clicked the button!", "error")
    let loader = document.getElementById('load')
    loader.style.display = 'block'
    todoList.innerHTML = ""
    arr = [];
    let docref = collection(db, "todo app")
    const docRef = await addDoc(docref, {
      todo_value: todo_value.value,
      timeStamp: new Date()
    });
    console.log("Document written with ID:", docRef.id)
  
  
    let getRef = collection(db, "todo app" )
    const querySnapshot =await getDocs(getRef)
    querySnapshot.forEach((doc) => {
      arr.push(doc.id)
      console.log(doc.id, " => ", doc.data());
  
      let loader = document.getElementById('load')
      loader.style.display = 'none'
      
    // todo_value.value = ""

      todoList.innerHTML +=
      `<li id="li">${doc.data().todo_value} 
      <button onclick="delete_todo('${doc.id}')">✖</button>
      <button onclick="edit_todo('${doc.id}',)" >✍</button></li>
      `;
      
    });

  }else{
    swal("Error!", "please fill", "error")
  }
  
})


 window.onload = async()=>{

let bodyloader = document.getElementById('body_loader')
bodyloader.style.display = "none"
let maindiv = document.getElementById('main_div')
maindiv.style.display = "block"

  let getRef = collection(db, "todo app")
  // console.log(getRef);
  const querySnapshot = await getDocs(getRef)
  // console.log(querySnapshot);
  arr1 = []
  querySnapshot.forEach((doc) => {
    arr1.push(doc.id)
    console.log(doc.id, " => ", doc.data());
    todoList.innerHTML +=
    `<li id="del_li">${doc.data().todo_value}
    <button id="del_btn" onclick="delete_todo('${doc.id}')">✖</button> 
     <button id="edit_btn" onclick="edit_todo('${doc.id}')">✍</button></li> 
     `;

  
}

)}
// window.window_load = window_load



let delete_todo=(id)=>{
  deleteDoc(doc(db, "todo app", id));
  console.log(id);
event.target.parentNode.remove()
}
window.delete_todo = delete_todo


let edit_todo= async(id,oldValue)=>{
  let prmp = prompt('enter', oldValue)
  let edit = event.target.parentNode
  edit.innerHTML = `<li id="del_li">${prmp}
  <button id="del_btn" onclick="delete_todo('${doc.id}')">✖</button> 
   <button id="edit_btn" onclick="edit_todo('${doc.id}')" >✍</button></li> `;
  
  const washingtonRef = doc(db, "todo app", id);
await updateDoc(washingtonRef, {
  todo_value:prmp
});


}
window.edit_todo = edit_todo



let delall = document.getElementById('del_all')
delall.addEventListener("click" ,() => {
  todoList.innerHTML = ""
for(var i=0; i < arr.length; i++){
  console.log(arr.length);
   deleteDoc(doc(db, "todo app", arr[i]));
   console.log(deleteDoc(doc(db, "todo app", arr[i])));
}

})
