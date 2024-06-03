import { useForm } from "react-hook-form";
import { ToDoListFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import styles from "./AddTaskForm.module.scss";
interface AddTaskFormProps {
  onSubmit: (data: ToDoListFormData) => unknown;
  taskToEdit?: ToDoListFormData;
}

const AddTaskForm = ({ onSubmit, taskToEdit }: AddTaskFormProps) => {
  const { handleSubmit, register, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: taskToEdit || { title: "", description: "" },
  });
  useEffect(() => {
    if (taskToEdit) {
      reset(taskToEdit);
    } else {
      reset({ title: "", description: "" });
    }
  }, [taskToEdit, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__title}>
        <label htmlFor="titleInput">Title:</label>
        <input id="titleInput" type="text" {...register("title")} required />
      </div>
      <div className={styles.form__description}>
        <label htmlFor="descriptionInput">Description:</label>
        <textarea
          className={styles.form__description__field}
          id="descriptionInput"
          {...register("description")}
          required
        ></textarea>
      </div>
      <button className={styles.form__button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
