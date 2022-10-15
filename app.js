
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBll2fSj_nyxIy5V4lfq4JwopdekNhLifo",
  authDomain: "web-nd-mobile-82734.firebaseapp.com",
  projectId: "web-nd-mobile-82734",
  storageBucket: "web-nd-mobile-82734.appspot.com",
  messagingSenderId: "487981162383",
  appId: "1:487981162383:web:f13b268996e0fcd51975fa",
  measurementId: "G-7R1MMWNJV7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// console.log(db);

// let sub;
  let arr1 = []
let arr = []
let add = document.getElementById('add_btn')
// console.log(add);
let todo_value = document.getElementById('todo-get')
let todoList = document.getElementById('list')

add.addEventListener("click", async () => {

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

  // 
  // let q = query(docRef, orderBy("timestamp", "asc"));
  // console.log(q);
  let getRef = collection(db, "todo app")
  const querySnapshot =await getDocs(getRef)
  querySnapshot.forEach((doc) => {
    arr.push(doc.id)
    console.log(doc.id, " => ", doc.data());

    let loader = document.getElementById('load')
    loader.style.display = 'none'

    todoList.innerHTML +=
      `<li id="li">${doc.data().todo_value}  <button onclick="delete_todo('${doc.id}')">Delete</button>  <button onclick="edit_todo('${doc.id}')" >Edit</button></li>
      `;
  
  });
  
})


let window_load =async()=>{
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
    <button id="del_btn" onclick="delete_todo('${doc.id}')">Delete</button>  <button id="edit_btn" onclick="edit_todo('${doc.id}')" >Edit</button></li> `;

}

)}
window.window_load = window_load



let delete_todo=(id)=>{
  // console.log("Ahmed nikal");
  deleteDoc(doc(db, "todo app", id));
  console.log(id);
  // let li = document.getElementById('del_li')
  // li.innerHTML = ""
event.target.parentNode.remove()
}
window.delete_todo = delete_todo


let edit_todo= async(id,oldValue)=>{
  let prmp = prompt("enter", oldValue)
  let edit = event.target.parentNode
  edit.innerHTML = `<li id="del_li">${prmp}
  <button id="del_btn" onclick="delete_todo('${doc.id}')">Delete</button>  <button id="edit_btn" onclick="edit_todo('${doc.id}')" >Edit</button></li> `;
  
// console.log( event.target.parentNode);
// console.log(prmp);
  const washingtonRef = doc(db, "todo app", id);
await updateDoc(washingtonRef, {
  todo_value:prmp
});


}
window.edit_todo = edit_todo



let delall = document.getElementById('del_all')
delall.addEventListener("click" ,() => {
  // console.log("dddddd");
  // console.log(arr.length);
  todoList.innerHTML = ""
for(var i=0; i < arr.length; i++){
  console.log(arr.length);
   deleteDoc(doc(db, "todo app", arr[i]));
   console.log(deleteDoc(doc(db, "todo app", arr[i])));
}
// console.log(arr.length);
// let forValue =arr.forEach(function (data,index) {
//   console.log(data,index);

// })
// console.log(data,index);

})
