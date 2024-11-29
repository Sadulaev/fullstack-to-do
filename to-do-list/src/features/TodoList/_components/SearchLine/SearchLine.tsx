import Select from "@/components/Select/Select";
import styles from "./styles.module.css";
import { useCallback } from "react";
import { useAppData } from "@/context/AppContext";

const SearchLine = () => {
  const { todos, todosDispatch } = useAppData();

  const onChangeSorting = useCallback(
    (sortValue: string) => {
      todosDispatch({
        type: "update",
        payload: {
          searchData: {
            page: todos.searchData.page,
            sort: sortValue as "ASC" | "DESC",
          },
        },
      });
    },
    [todosDispatch, todos.searchData.page],
  );

  const selectOptions = [
    { text: "Без сортировки", value: "", selected: true },
    { text: "По имени ⬇", value: "ASC" },
    { text: "По имени ⬆", value: "DESC" },
  ];

  return (
    <div className={styles.searchLine}>
      {/* <Input placeholder="Начните вводить для поиска" /> */}
      <Select options={selectOptions} onChange={onChangeSorting} />
    </div>
  );
};

export default SearchLine;
