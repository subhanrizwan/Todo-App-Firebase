import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
let addBtn = document.getElementById("add-btn");
let todoRef = collection(db, "todo-list");
let todoList = document.getElementById("list");
// let allIDs = [];
// let unsub;
addBtn.addEventListener("click", async () => {
  try {
    let todoValue = document.getElementById("todo-value");
    await addDoc(todoRef, {
      value: todoValue.value,
      timestamp: new Date(),
    });
  } catch (err) {
    console.log(err);
  }
});

let getTodos = () => {
  unsub = onSnapshot(
    query(todoRef, orderBy("timestamp", "asc")),
    (querySnapshot) => {
      todoList.innerHTML = "";
      allIDs = [];
      console.log("chalra hai", querySnapshot);
      querySnapshot.forEach((doc) => {
        allIDs.push(doc.id);
        todoList.innerHTML += `<li id='${doc.id}'>${
          doc.data().value
        } <button onclick="deleteTodo('${doc.id}')">Delete</button>
        <button onclick="editTodo('${doc.id}','${
          doc.data().value
        }')">Edit</button>
        </li>`;
      });
    }
  );
};

getTodos();

const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todo-list", id));
};

const editTodo = async (id, oldValue) => {
  let editValue = prompt("Enter updated value", oldValue);
  const updateRef = doc(db, "todo-list", id);
  await updateDoc(updateRef, {
    value: editValue,
  });
};

window.deleteTodo = deleteTodo;
window.editTodo = editTodo;

let delBtn = document.getElementById("del-btn");

delBtn.addEventListener("click", async () => {
  unsub();
  for (var i = 0; i < allIDs.length; i++) {
    let todo = document.getElementById(allIDs[i]);
    await deleteDoc(doc(db, "todo-list", allIDs[i]));
    todo.remove();
  }
  getTodos();
});

var quill = new Quill("#editor", {
  theme: "snow",
});

const getText = () => {
  var delta = quill.root.innerHTML;
  console.log(delta);
};

window.getText = getText;