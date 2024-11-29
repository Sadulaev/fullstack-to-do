import * as yup from "yup";
import { UpdateTodoDto } from "@/types/todo";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useAppData } from "@/context/AppContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import Select from "@/components/Select/Select";

// Схема валидации с Yup
const updateTodoValidatioSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите корректный адрес почтового ящика")
    .required("Поле обязательно для заполнения"),
  description: yup.string().required("Поле обязательно для заполнения"),
  completed: yup.boolean().required(),
});

type Props = {
  todoId: number;
  defaultValues: UpdateTodoDto;
  onSubmit: (todo: UpdateTodoDto) => void;
};

const UpdateTodoModal = (props: Props) => {
  const { onSubmit, defaultValues } = props;

  const { todos } = useAppData();

  const {
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
    reset,
  } = useForm<UpdateTodoDto>({
    resolver: yupResolver(updateTodoValidatioSchema),
    defaultValues: defaultValues,
  });

  // Сделано для обновления значений формы
  useEffect(() => {
    reset();
  }, [!!defaultValues]);

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as keyof UpdateTodoDto;

    setError(field, { message: "" });
    setValue(field, e.target.value);
  };

  const onChageSelect = (value: string) => {
    if (value === "completed") {
      setValue("completed", true);
    } else {
      setValue("completed", false);
    }
  };

  const selectOptions = useMemo(
    () => [
      {
        text: "Завершена",
        value: "completed",
        selected: defaultValues.completed,
      },
      {
        text: "Не завершена",
        value: "incompleted",
        selected: !defaultValues.completed,
      },
    ],
    [defaultValues.completed],
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          placeholder="Имя"
          onChange={onChangeField}
          value={getValues("name")}
        />
        {errors.name && !!errors.name.message?.length && (
          <p>{errors.name.message}</p>
        )}
        <Input
          id="email"
          placeholder="Почта"
          onChange={onChangeField}
          value={getValues("email")}
        />
        {errors.email && !!errors.email.message?.length && (
          <p>{errors.email.message}</p>
        )}
        <Input
          id="description"
          placeholder="Описание"
          onChange={onChangeField}
          value={getValues("description")}
        />
        {errors.description && !!errors.description.message?.length && (
          <p>{errors.description.message}</p>
        )}
        <Select
          placeholder="Статус"
          onChange={onChageSelect}
          options={selectOptions}
        />
        <Button
          type="submit"
          disabled={todos.updateTodoStatus === "pending"}
          isLoading={todos.updateTodoStatus === "pending"}
        >
          Редактировать запись
        </Button>
      </form>
    </div>
  );
};

export default UpdateTodoModal;
