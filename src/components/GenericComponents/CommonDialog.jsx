import {
  Button,
  Dialog,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { Xmark } from "iconoir-react";

const CommonDialog = ({
  open,
  handleClose,
  title = "Confirmation",
  content,
  onConfirm,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  confirmButtonColor = "blue",
  cancelButtonColor = "gray",
}) => {
  return (
    <Dialog open={open} handler={handleClose}>
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">{title}</Typography>
            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color={cancelButtonColor}
              className="absolute right-2 top-2"
              isCircular
            >
              <Xmark className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>
          <Typography className="mb-6 mt-2 text-foreground">
            {typeof content === "string" ? <Typography>{content}</Typography> : content}
          </Typography>
          <div className="mb-1 flex items-center justify-end gap-2">
            <Dialog.DismissTrigger as={Button} variant="ghost" color={cancelButtonColor}>
              {cancelButtonText}
            </Dialog.DismissTrigger>
            {onConfirm && (
              <Button color={confirmButtonColor} onClick={onConfirm}>
                {confirmButtonText}
              </Button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
};

export default CommonDialog;