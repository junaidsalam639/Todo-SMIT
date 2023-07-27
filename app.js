import { db } from './firebase.mjs'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


document.getElementById('add').addEventListener('click', async () => {
    let input = document.getElementById('input');
    try {
        const docRef = await addDoc(collection(db, "TodoList"), {
            input: input.value
        });
        location.reload()
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});


const querySnapshot = await getDocs(collection(db, "TodoList"));
querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    let list = document.getElementById('list').innerHTML +=
        `<li>
        <span>${doc.data().input}</span>
        <button onclick="edit('${doc.id}')">Edit</button>
        <button onclick="dele('${doc.id}')">Delete</button>
     </li>`
});


// Edit code
async function edit(e) {
    console.log(e);
    let pro = prompt('Update your Text');
    const washingtonRef = doc(db, "TodoList", e);
    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
        input: pro,
    });
    location.reload()
}

// Delete code
async function dele(e) {
    console.log(e);
    await deleteDoc(doc(db, "TodoList", e));
    location.reload()
}



window.edit = edit
window.dele = dele