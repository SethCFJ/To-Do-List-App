package com.todolist.todolist;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class UpdateToDoListDTO {
  @Pattern(regexp = ".*\\S.*", message = "Title cannot be empty")
  private String title;
  @Pattern(regexp = ".*\\S.*", message = "Description cannot be empty")
  private String description;
  
  
  private Boolean completed;

  

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
    return "UpdateToDoListDTO [title=" + title + ", description=" + description + ", completed=" + completed + "]";
  }
  
}
