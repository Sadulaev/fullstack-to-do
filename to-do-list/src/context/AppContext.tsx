import { User } from "@/types/auth";
import { Todo } from "@/types/todo";
import React, { createContext, useContext, ReactNode, useReducer } from "react";

type Status = "idle" | "pending" | "resolved" | "rejected";

type SearchData = { page: number; sort?: "ASC" | "DESC" };

interface AuthState {
  data: User | null;
  loginStatus: Status;
  checkStatus: Status;
}
interface TodosState {
  data: {
    list: Todo[];
    lastPage: number | null;
  };
  searchData: SearchData;
  getTodosStatus: Status;
  updateTodoStatus: Status;
}

type AuthAction = { type: "update" | "logout"; payload?: Partial<AuthState> };

type TodosAction = { type: "update"; payload: Partial<TodosState> };

interface AppData {
  auth: AuthState;
  authDispatch: (action: AuthAction) => void;
  todos: TodosState;
  todosDispatch: (action: TodosAction) => void;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case "update":
      return { ...state, ...payload };
    case "logout":
      return { ...state, data: null, checkStatus: "idle", loginStatus: "idle" };
    default:
      return state;
  }
};

const todosReducer = (state: TodosState, action: TodosAction) => {
  const { type, payload } = action;
  switch (type) {
    case "update":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const AppDataContext = createContext<AppData | undefined>(undefined);

const authInitialState: AuthState = {
  data: null,
  loginStatus: "idle",
  checkStatus: "idle",
};

const todosInitialState: TodosState = {
  data: {
    list: [],
    lastPage: null,
  },
  getTodosStatus: "idle",
  updateTodoStatus: "idle",
  searchData: {
    page: 1,
    sort: undefined,
  },
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, authInitialState);
  const [todos, todosDispatch] = useReducer(todosReducer, todosInitialState);

  return (
    <AppDataContext.Provider
      value={{ auth, authDispatch, todos, todosDispatch }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppData => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};
