import React, { useEffect, useRef } from "react";
import styles from "./AddTaskModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {
  createToDoListItem,
  updateToDoListItem,
} from "../../services/todolist-services";
import { ToDoListFormData } from "../AddTaskForm/schema";
interface AddTaskModalProps {
  openModal: boolean;
  closeModal: () => void;
  setModal: (modal: boolean) => void;
  editMode?: boolean;
  taskToEdit?: ToDoListFormData & { id: number };
}
const AddTaskModal: React.FC<AddTaskModalProps> = ({
  openModal,
  closeModal,
  setModal,
  editMode = false,
  taskToEdit,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const onSubmit = (data: ToDoListFormData) => {
    if (editMode && taskToEdit) {
      updateToDoListItem(taskToEdit.id, data)
        .then((data) => {
          console.log("Task updated", data);
          setModal(false);
        })
        .catch((e) => console.warn(e));
    } else {
      createToDoListItem(data)
        .then((data) => {
          console.log("Task created", data);
          setModal(false);
        })
        .catch((e) => console.warn(e));
    }
  };
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, []);
  return (
    <dialog className={styles.modal} ref={ref} onCancel={closeModal}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            openModal = false;
            console.log("close button pressed");
            console.log(openModal);
            setModal(false);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <AddTaskForm onSubmit={onSubmit} taskToEdit={taskToEdit} />
    </dialog>
  );
};

export default AddTaskModal;
