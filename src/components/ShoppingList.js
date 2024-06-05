import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //fetch request as component renders
  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((response) => response.json())
    .then((items) => setItems(items)); //update state with fetched items from server
  }, []);//empty dependency array ensures that effect only runs once

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item)=>{
      if (item.id === updatedItem.id){
        return updatedItem;
      } else{
        return item;
      }
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>// dont forget to add onDeleteItem prop
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
