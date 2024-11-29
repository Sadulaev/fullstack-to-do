import { AppProvider } from "./context/AppContext";
import Routes from "./routes/routes";
import { ModalProvider } from "./context/ModalContext";
import AuthLayout from "./layouts/AuthLayout";
import AxiosInterceptor from "./axios/AxiosInterceptor";

function App() {
  return (
    <AppProvider>
      <ModalProvider>
        <AxiosInterceptor>
          <AuthLayout>
            <Routes />
          </AuthLayout>
        </AxiosInterceptor>
      </ModalProvider>
    </AppProvider>
  );
}

export default App;
