import Button from "@/components/Button/Button";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./styles.module.css";
import { useAppData } from "@/context/AppContext";
import addTodo from "@/requests/todos/addTodo";
import { useCallback } from "react";
import { CreateTodoDto } from "@/types/todo";
import getTodos from "@/requests/todos/getTodos";
import { useModal } from "@/context/ModalContext";
import AddOTodoModal from "../AddOrUpdateModal/AddTodoModal ";

const PaginationLine = () => {
  const { todos, todosDispatch } = useAppData();
  const modal = useModal();

  const createTodo = useCallback(
    async (todo: CreateTodoDto) => {
      todosDispatch({
        type: "update",
        payload: { updateTodoStatus: "pending" },
      });

      try {
        await addTodo(todo);
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
          content: <h3>Запись была успешно добавлена</h3>,
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

  const onChangePage = useCallback(
    (page: number) => {
      todosDispatch({
        type: "update",
        payload: { searchData: { sort: todos.searchData.sort, page } },
      });
    },
    [todosDispatch, todos.searchData.sort],
  );

  const openModal = useCallback(() => {
    modal({ content: <AddOTodoModal onSubmit={createTodo} />, timeout: null });
  }, [modal]);

  return (
    <div className={styles.paginationLine}>
      <Pagination
        currentPage={todos.searchData.page}
        lastPage={todos.data.lastPage}
        onChangePage={onChangePage}
      />
      <Button onClick={openModal}>Добавить запись</Button>
    </div>
  );
};

export default PaginationLine;
