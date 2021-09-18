import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/Modal/Modal";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <ModalProvider>
      <App />
      <Modal />
    </ModalProvider>
  </AuthProvider>,
  document.querySelector("#root")
);