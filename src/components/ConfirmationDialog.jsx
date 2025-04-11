const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <p style={styles.modalMessage}>{message}</p>
        <div style={styles.modalButtons}>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  modalMessage: {
    marginBottom: "15px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    padding: "8px 15px",
    borderRadius: "3px",
    cursor: "pointer",
    border: "none",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 15px",
    borderRadius: "3px",
    cursor: "pointer",
    border: "none",
  },
};

export default ConfirmationDialog;
