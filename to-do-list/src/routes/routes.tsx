import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../features/Auth/Auth";
import TodoList from "../features/TodoList/TodoList";
import Header from "@/components/Header/Header";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
