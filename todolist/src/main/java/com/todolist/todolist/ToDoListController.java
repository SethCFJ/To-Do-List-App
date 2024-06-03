package com.todolist.todolist;

import com.todolist.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.message.StructuredDataMessage;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/todolist")
public class ToDoListController {
  @Autowired
  private ToDoListService toDoListService;

   private static final Logger logger = LogManager.getLogger();

  @PostMapping()
  public ResponseEntity<ToDoItem> createItem(@Valid @RequestBody CreateToDoListDTO data) {
    ToDoItem createdItem = this.toDoListService.createItem(data);
    logger.info("Created new task: " + createdItem.getTitle());
    return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    
  }

  @GetMapping()
  public ResponseEntity<List<ToDoItem>> findAllItems() {
    List<ToDoItem> allToDoItems = this.toDoListService.findAllItems();
    logger.info("Retrieved " + allToDoItems.size() + " task/s");
    return new ResponseEntity<>(allToDoItems, HttpStatus.OK);
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<ToDoItem> findItemById(@PathVariable Long id) throws NotFoundException{
    Optional<ToDoItem> maybeItem = this.toDoListService.findById(id);
    logger.throwing(new NotFoundException(ToDoItem.class, id));
    ToDoItem foundItem = maybeItem.orElseThrow(() -> new NotFoundException(ToDoItem.class, id));
    logger.info("Retrieved task with id of " + foundItem.getId());
    return new ResponseEntity<>(foundItem, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ToDoItem> updateItemById(@PathVariable Long id, @Valid @RequestBody UpdateToDoListDTO data) throws NotFoundException {
    
    Optional<ToDoItem> maybeItem = this.toDoListService.updateById(id, data);
    logger.throwing(new NotFoundException(ToDoItem.class, id));
    ToDoItem updatedItem = maybeItem.orElseThrow(() -> new NotFoundException(ToDoItem.class, id));
    logger.info("Updated item with id of " + updatedItem.getId());
    return new ResponseEntity<>(updatedItem, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteItemById(@PathVariable Long id) throws NotFoundException {
    boolean isDeleted = this.toDoListService.deleteById(id);
    if(!isDeleted) {
      // throw new NotFoundException(ToDoItem.class, id);
      logger.throwing(new NotFoundException(ToDoItem.class, id));
      throw new NotFoundException(ToDoItem.class, id);
    }
    logger.info("Deleting task with id of " + id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  

}
  
  

