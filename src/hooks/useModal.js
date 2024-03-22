import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ children, modalState, updateModalState }, ref) => {
  const modalContainer = document.getElementById("modal-container");

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove("modal-out");
      ref.current.classList.add("modal-in");
    }
  }, [ref]);

  useEffect(() => {
    const existingFunction = document.onkeydown;
    document.onkeydown = function (evt) {
      if (evt.keyCode === 27) {
        updateModalState(false);
      }
    };

    return () => {
      document.onkeydown = existingFunction;
    };
  });

  return createPortal(
    <div className="modal-background" onClick={() => updateModalState(false)}>
      <div
        className="modal"
        ref={ref}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalContainer
  );
});

function useModal() {
  const [modalState, setModalState] = useState(false);
  const modalRef = useRef(null);
  const root = document.getElementById("root");
  const body = document.getElementsByTagName("body")[0];

  const updateModalState = useCallback(
    (state) => {
      if (!state) {
        modalRef.current.classList.remove("modal-in");
        modalRef.current.classList.add("modal-out");
        setTimeout(() => {
          setModalState(false);
        }, 300);
      } else {
        setModalState(state);
      }
    },
    [modalRef]
  );

  useEffect(() => {
    if (root && body) {
      if (modalState) {
        root.style.filter = "blur(2px)";
        body.style.overflow = "hidden";
      } else {
        root.style.filter = "blur(0px)";
        body.style.overflow = "auto";
      }
    }
  }, [modalState, body, root]);

  return {
    isModalOpen: modalState,
    updateModalState: (state) => updateModalState(state),
    Modal: ({ children }) => (
      <Modal
        modalState={modalState}
        updateModalState={updateModalState}
        ref={modalRef}
      >
        {children}
      </Modal>
    ),
  };
}
export default useModal;
