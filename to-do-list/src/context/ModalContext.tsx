import Modal from "@/components/Modal/Modal";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface ModalWindow {
  content: ReactNode | null;
  timeout: number | null;
}

interface ModalData extends ModalWindow {
  updateModal: (modal: ModalWindow) => void;
}

const ModalContext = React.createContext<ModalData>({
  content: null,
  timeout: null,
  updateModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalWindow>({
    content: null,
    timeout: null,
  });

  const updateModal = (modal: ModalWindow) => {
    setModalState(modal);
  };

  useEffect(() => {
    let clearModalTimeout: NodeJS.Timeout;
    if (modalState.content) {
      if (modalState.timeout) {
        clearModalTimeout = setTimeout(() => {
          setModalState({ content: null, timeout: null });
        }, modalState.timeout);
      }
    }

    return () => clearTimeout(clearModalTimeout);
  }, [modalState.content]);

  return (
    <ModalContext.Provider value={{ ...modalState, updateModal }}>
      <Modal onClose={() => updateModal({ content: null, timeout: null })}>
        {modalState.content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an AppProvider");
  }

  return context.updateModal;
};
