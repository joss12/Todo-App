import React, {useState, useEffect} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import Todo from './Todo';

import {db} from './firebase'
import {query, 
  collection, 
  doc, 
  onSnapshot, 
  updateDoc,  
  addDoc,
  deleteDoc,} 
  from 'firebase/firestore';

  import {showToast} from './tool';
  import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


const style = {
  bg: `h-screen w-screen p-80 bg-gradient-to-r from-[#eb2632]
  to-[#f0ab8d]`,
  container: `bg-purple-100 max-w-[500px] w-full 
  m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-blue-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-green-500 text-blue-100`,
  count: `text-center p-2`
}

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      showToast('SUCCESS', 'Your to do has been successfully created')
    return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  //Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update todo in firebase

  const checkCompleted = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    if(deleteDoc === true){
      showToast('SUCCESS', 'Your to do has been successfully created')
      return;
    }
  };


  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>EGS' Todo App</h3>

        <form onSubmit={createTodo} className={style.form}>
        <input
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Add todo"
         />
         <button className={style.button}>
         <AiOutlinePlusCircle size={30} />
         </button>
        </form>
        <ul>
        {todos.map((todo, index)=>(
        <Todo key={index} todo={todo}
          checkCompleted={checkCompleted}
          deleteTodo={deleteTodo}
        />
        ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
    <ToastContainer />
      </div>
    </div>
  );
}

export default App;
