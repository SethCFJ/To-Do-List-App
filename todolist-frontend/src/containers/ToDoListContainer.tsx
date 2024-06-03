import { useEffect, useState } from "react";
import { TodoItemResponse } from "../services/api-responses.interface";
import {
  getAllToDoListItems,
  updateToDoListItem,
} from "../services/todolist-services";
import ToDoListCard from "../components/ToDoListCard/ToDoListCard";
import styles from "./ToDoListContainer.module.scss";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
const ToDoListContainer = () => {
  const [toDoList, setToDoList] = useState<TodoItemResponse[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<TodoItemResponse | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);

  useEffect(() => {
    getAllToDoListItems()
      .then((data) => setToDoList(data))
      .catch((e) => console.warn(e));
  }, [modal, deleteTrigger]);

  const handleEdit = (task: TodoItemResponse) => {
    setTaskToEdit(task);
    setModal(true);
  };

  const handleDelete = () => {
    setDeleteTrigger((prev) => !prev);
  };

  const toggleCompletion = (id: number, completed: boolean) => {
    const updatedTask = {
      ...toDoList.find((task) => task.id === id)!,
      completed: !completed,
    };
    updateToDoListItem(id, updatedTask)
      .then(() => {
        setToDoList((prevList) =>
          prevList.map((task) =>
            task.id === id ? { ...task, completed: !completed } : task
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling completion:", error);
      });
  };

  const openAddTaskModal = () => {
    setTaskToEdit(null);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setTaskToEdit(null);
  };
  return (
    <div className={styles.page}>
      <h1 className={styles.header}>To Do List</h1>

      <div className={styles.container}>
        <button onClick={openAddTaskModal} className={styles.create}>
          Add Task
        </button>
        {toDoList.map((item) => (
          <ToDoListCard
            key={item.id}
            toDoItem={item}
            onDelete={() => handleDelete()}
            onEdit={handleEdit}
            toggleCompletion={toggleCompletion}
          />
        ))}
      </div>
      {modal && (
        <AddTaskModal
          openModal={modal}
          closeModal={closeModal}
          setModal={setModal}
          editMode={!!taskToEdit}
          taskToEdit={taskToEdit || undefined}
        />
      )}
    </div>
  );
};

export default ToDoListContainer;
