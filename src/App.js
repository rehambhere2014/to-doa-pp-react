import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import List from './List';
const getLocalStorage =()=>{
  let list = JSON.parse(localStorage.getItem('list'));
  console.log(list)
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }  
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ 
    show: false,
     msg: '',
      type: ''
     })
  const handleSubmit = (e) => {
    e.preventDefault();
    //add item
    //check if value is empty see alert else add item
    if(!name){
      //display alert

      showAlert(true,'please Enter Value','danger')
    }else if(name && isEditing){
      //deal with edit
      setList(list.map((item)=>{
        if(item.id === editID){
          return{...item, title:name}
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false)
      showAlert(true,'edit item','success');


    }else{
      // show alert 
      showAlert(true,'add item','success')

      //add new item

      const newItem= {
        id:new Date().getTime().toString(),
         title:name}
         setList([...list, newItem]);
         setName('');


    }

    console.log('hello')
  }

  const showAlert=(show=false,msg='', type='')=>{

setAlert({show:show,type:type,msg:msg})
  }
  const clearItem=()=>{
    showAlert(true, 'empty list','danger');

    setList([])
  }
  const removeItem=(id)=>{
    showAlert(true,  'item removed','danger');
const filterItem = list.filter(item=>item.id !==id)
    setList(filterItem)
  }

  const editItem=(id)=>{
    const spicialItem= list.find((item)=>item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(spicialItem.title)
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/*alert */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Tod App</h3>
        <div className="form-control">
          <input type="text"
            className='grocery'
            placeholder='e.g. eggs' 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />


          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>


      </form>
   {list.length > 0 &&(
        <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        <button className="clear-btn" onClick={clearItem}>clear items</button>
      </div>
   )}

    </section>
  );
}

export default App;
