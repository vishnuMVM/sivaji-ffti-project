import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

import { Xmark } from "iconoir-react";

const CustomDialog = ({
  open,
  onClose,
  title,
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}) => {
  return (
    <Dialog open={open} handler={onClose}>
      <Dialog.Content>
        <div className="flex items-center justify-between gap-4">
          <Typography type="h6">{title}</Typography>
          {/* <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            className="absolute right-2 top-2"
            isCircular
            onClick={onClose}
          >
            <Xmark className="h-5 w-5" />
          </IconButton> */}
        </div>
        <Typography className="mb-6 mt-2 text-foreground">{content}</Typography>
        <div className="mb-1 flex items-center justify-end gap-2">
          <Button variant="ghost" color="error" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export default CustomDialog;