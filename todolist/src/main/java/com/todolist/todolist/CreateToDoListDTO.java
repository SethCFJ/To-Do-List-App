package com.todolist.todolist;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateToDoListDTO {
  @NotBlank
  private String title;
  @NotBlank
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
    return "CreateToDoListDTO [title=" + title + ", description=" + description + ", completed=" + completed + "]";
  }
}
