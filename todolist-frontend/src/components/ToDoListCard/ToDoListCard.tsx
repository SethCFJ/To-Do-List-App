import { TodoItemResponse } from "../../services/api-responses.interface";
import styles from "./ToDoListCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import {
  deleteToDoListItem,
  updateToDoListItem,
} from "../../services/todolist-services";
import { useState } from "react";
interface ToDoListCard {
  toDoItem: TodoItemResponse;
  onDelete: (id: number) => void;
  onEdit: (task: TodoItemResponse) => void;
  toggleCompletion: (id: number, completed: boolean) => void;
}

const ToDoListCard = ({ toDoItem, onDelete, onEdit }: ToDoListCard) => {
  const [isCompleted, setIsCompleted] = useState(toDoItem.completed);

  const toggleCompletion = async () => {
    try {
      const updatedTask = { ...toDoItem, completed: !isCompleted };
      await updateToDoListItem(toDoItem.id, updatedTask);
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const handleDelete = async () => {
    deleteToDoListItem(toDoItem.id)
      .then((data) => {
        console.log("Task deleted", data);
        onDelete(toDoItem.id);
      })
      .catch((e) => console.warn(e));
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__completed} onClick={toggleCompletion}>
        {isCompleted ? (
          <FontAwesomeIcon
            className={styles.iconsContainer__icon}
            icon={faSquareCheck}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.iconsContainer__icon}
            icon={faSquare}
            style={{ color: "#050505" }}
          />
        )}
        <div className={styles.container__text}>
          <h2
            className={
              isCompleted
                ? styles.container__text__title__completed
                : styles.container__text__title
            }
          >
            {toDoItem.title}
          </h2>
          <p className={styles.container__text__description}>
            {toDoItem.description}
          </p>
        </div>
      </div>
      <div className={styles.iconsContainer}>
        <button onClick={() => onEdit(toDoItem)}>
          <FontAwesomeIcon
            className={styles.iconsContainer__icon}
            icon={faPenToSquare}
          />
        </button>

        <button onClick={handleDelete}>
          <FontAwesomeIcon
            className={styles.iconsContainer__icon}
            icon={faTrash}
            style={{ color: "#000000" }}
          />
        </button>
      </div>
    </div>
  );
};

export default ToDoListCard;
