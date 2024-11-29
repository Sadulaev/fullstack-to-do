import Button from "@/components/Button/Button";
import { Todo, UpdateTodoDto } from "@/types/todo";
import styles from "./styles.module.css";
import { useAppData } from "@/context/AppContext";
import { useCallback } from "react";
import updateTodo from "@/requests/todos/updateTodo";
import getTodos from "@/requests/todos/getTodos";
import { useModal } from "@/context/ModalContext";
import UpdateTodoModal from "../AddOrUpdateModal/UpdateTodoModal";

type Props = {
  id: number;
  todo: Todo;
};

const ActionButtons = (props: Props) => {
  const { id, todo } = props;
  const { todos, todosDispatch } = useAppData();
  const modal = useModal();

  const updateTodoRecord = useCallback(
    async (todo: UpdateTodoDto) => {
      todosDispatch({
        type: "update",
        payload: {
          data: { ...todos.data, list: [] },
          updateTodoStatus: "pending",
        },
      });

      try {
        await updateTodo(todo);
        const res = await getTodos(
          todos.searchData.page,
          todos.searchData.sort,
        );

        todosDispatch({
          type: "update",
          payload: {
            data: res,
            updateTodoStatus: "resolved",
          },
        });

        modal({
          content: <h3>Запись была успешно обвновлена</h3>,
          timeout: 3000,
        });
      } catch (err) {
        todosDispatch({
          type: "update",
          payload: { updateTodoStatus: "rejected" },
        });
      }
    },
    [todos.searchData.page, todos.searchData.sort, todosDispatch, modal],
  );

  const openEditModal = useCallback(() => {
    modal({
      content: (
        <UpdateTodoModal
          onSubmit={updateTodoRecord}
          todoId={id}
          defaultValues={todo}
        />
      ),
      timeout: null,
    });
  }, [modal]);

  return (
    <div className={styles.container}>
      <Button onClick={openEditModal}>📝</Button>
      <Button>✖</Button>
    </div>
  );
};

export default ActionButtons;
