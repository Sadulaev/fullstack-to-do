import styles from "./styles.module.css";
import Table, { Header } from "@/components/Table/Table";
import { useEffect, useMemo } from "react";
import { useAppData } from "@/context/AppContext";
import getTodos from "@/requests/todos/getTodos";
import ActionButtons from "./_components/ActionButtons/ActionButtons";
import PaginationLine from "./_components/PaginationLine/PaginationLine";
import SearchLine from "./_components/SearchLine/SearchLine";

const TodoList = () => {
  const { auth, todos, todosDispatch } = useAppData();

  useEffect(() => {
    const getTodosByParamsUpdate = async (
      page: number,
      sort?: "ASC" | "DESC",
    ) => {
      todosDispatch({
        type: "update",
        payload: {
          data: { ...todos.data, list: [] },
          getTodosStatus: "pending",
        },
      });

      try {
        const res = await getTodos(page, sort);

        todosDispatch({
          type: "update",
          payload: {
            data: res,
            getTodosStatus: "resolved",
          },
        });
      } catch (err) {
        todosDispatch({
          type: "update",
          payload: { getTodosStatus: "rejected" },
        });
      }
    };

    getTodosByParamsUpdate(todos.searchData.page, todos.searchData.sort);
  }, [todos.searchData.page, todos.searchData.sort, todosDispatch]);

  const tableHeads: Header[] = useMemo(() => {
    if (!!auth.data) {
      return [
        { title: "Имя", property: "name" },
        { title: "Почта", property: "email" },
        { title: "Описание", property: "description" },
        { title: "Статус", property: "completed" },
        { title: "Действия", property: "actions", type: "component" },
      ];
    }
    return [
      { title: "Имя", property: "name" },
      { title: "Почта", property: "email" },
      { title: "Описание", property: "description" },
    ];
  }, [!!auth.data]);

  const tableRows = useMemo(() => {
    if (auth.data) {
      return todos.data.list.map((todo) => ({
        ...todo,
        completed: todo.completed ? "Завершена" : "Не завершена",
        actions: <ActionButtons id={todo.id} todo={todo} />,
      }));
    }
    return todos.data.list;
  }, [!!auth.data, !!todos.data.list.length, todos.getTodosStatus, todos.updateTodoStatus]);

  return (
    <div className={styles.container}>
      <SearchLine />
      <Table
        headers={tableHeads}
        rows={tableRows}
        isLoading={todos.getTodosStatus === "pending"}
      />
      <PaginationLine />
    </div>
  );
};

export default TodoList;
