package com.todolist.todolist;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ToDoList")
public class ToDoItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column
  private String title;
  @Column
  private String description;
  @Column
  private Boolean completed;
  ToDoItem() {}
 
  public void setTitle(String title) {
    this.title = title;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCompleted(Boolean completed) {
    this.completed = completed;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public Boolean getCompleted() {
    return completed;
  }

  @Override
  public String toString() {
    return "ToDoItem [id=" + id + ", title=" + title + ", description=" + description + ", completed=" + completed
        + "]";
  }

  
}
