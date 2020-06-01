import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:'',
        key:'',
        complete: true
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.completeItem = this.completeItem.bind(this);

  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [newItem,...this.state.items];
      
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:'',
        complete: false
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  completeItem(key){
    //var items = [...this.state.items];
    var items = []
    var object = {}
    console.log("items.length = " , this.state.items.length)
    // const filteredItem = items.find(item => item.key==key);
    // const filteredItems = items.filter(item =>
    //     item.key!== key);
    // console.log("filteredItem = " , filteredItem)

   for (let i = 0 ; i < this.state.items.length ; i++){
      if(this.state.items[i].key == key){
        object = this.state.items[i]
        object.complete = true
      }
      else{
        items.push(this.state.items[i])
      }
   }
   items.push(object)
    // filteredItem.complete = true;
   
    this.setState({
      items:[
        ...items,
      ],
      ...this.state.currentItem,
      
    })
    
    // const filteredItems= this.state.items.filter(item =>
    //   item.key!==key);
    //   const filteredItems1= this.state.items.filter(item =>
    //     item.key==key);

    //     console.log("filteredItems = " , filteredItems)
    //     console.log("filteredItems1 = " , filteredItems1[0])
    //     filteredItems1[0].complete = true
    //     filteredItems.push(filteredItems1[0])
    //     console.log("After filteredItems = " , filteredItems)
    //     this.setState({
    //       items: filteredItems
    //     })
  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }
  render(){
  return (
    <div className="App">
    <header>
    <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
    </form>
    
  </header>
  <ListItems items={this.state.items} 
             deleteItem={this.deleteItem} 
             setUpdate={this.setUpdate}
             completeItem = {this.completeItem}
  > </ListItems>
  </div>
  );
  }
}

export default App;
