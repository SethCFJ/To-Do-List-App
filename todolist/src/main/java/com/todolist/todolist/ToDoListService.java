package com.todolist.todolist;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;



@Service
@Transactional
public class ToDoListService {
  @Autowired
  private ToDoListRepository repo;

  public ToDoItem createItem(CreateToDoListDTO data) {
    ToDoItem newItem = new ToDoItem(); 
    newItem.setTitle(data.getTitle().trim());
    newItem.setDescription(data.getDescription().trim());
    newItem.setCompleted(data.getCompleted());
    return this.repo.save(newItem);
  }

  public List<ToDoItem> findAllItems() {
    return this.repo.findAll();
  }

  public Optional<ToDoItem> findById(Long id) {
    return this.repo.findById(id);
  }

  public boolean deleteById(Long id) {
    Optional<ToDoItem> maybeItem = this.findById(id);
    if(maybeItem.isEmpty()) {
      return false;
    }
    this.repo.delete(maybeItem.get());
    return true;
  }

  public Optional<ToDoItem> updateById(Long id, UpdateToDoListDTO data) {
    Optional<ToDoItem> maybeItem = this.findById(id);
    if(maybeItem.isEmpty()) {
      return maybeItem;
    }
    ToDoItem foundItem = maybeItem.get();
    String newTitle = data.getTitle();
    if(newTitle != null) {
      foundItem.setTitle(newTitle.trim());
    }
    String newDescription = data.getDescription();
    if(newDescription != null) {
      foundItem.setDescription(newDescription.trim());
    }
    Boolean newCompleted = data.getCompleted();
    if(newCompleted != null) {
      foundItem.setCompleted(newCompleted);
    }
    ToDoItem updatedItem = this.repo.save(foundItem);
    return Optional.of(updatedItem);
  }

}
