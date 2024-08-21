import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";

interface TableSaveModalProps {
  handleClose: () => void;
  handleAgree: () => void;
  open: boolean;
}

const TableResetModal: FC<TableSaveModalProps> = ({
  handleClose,
  handleAgree,
  open,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset Filters</DialogTitle>
      <DialogContent>
        <DialogContentText>Reset your table current state?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleAgree} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TableResetModal;
