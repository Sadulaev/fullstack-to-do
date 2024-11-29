import * as yup from "yup";
import { CreateTodoDto } from "@/types/todo";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useAppData } from "@/context/AppContext";
import { yupResolver } from "@hookform/resolvers/yup";

// Схема валидации с Yup
const loginValidationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите корректный адрес почтового ящика")
    .required("Поле обязательно для заполнения"),
  description: yup.string().required("Поле обязательно для заполнения"),
});

type Props = {
  onSubmit: (todo: CreateTodoDto) => void;
};

const AddOTodoModal = (props: Props) => {
  const { onSubmit } = props;

  const { todos } = useAppData();

  const {
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<CreateTodoDto>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id as keyof CreateTodoDto;

    setError(field, { message: "" });
    setValue(field, e.target.value);
  };

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
        <Button
          type="submit"
          disabled={todos.updateTodoStatus === "pending"}
          isLoading={todos.updateTodoStatus === "pending"}
        >
          Добавить запись
        </Button>
      </form>
    </div>
  );
};

export default AddOTodoModal;
