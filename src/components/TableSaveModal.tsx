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

const TableSaveModal: FC<TableSaveModalProps> = ({
  handleClose,
  handleAgree,
  open,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Save Filters</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Save your table current state before leaving?
        </DialogContentText>
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

export default TableSaveModal;
