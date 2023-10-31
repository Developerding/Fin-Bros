import { Grid, Modal } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PrimaryButton from "./buttons/PrimaryButton";
import OutlinedButton from "./buttons/OutlinedButton";
import { useStores } from "../stores";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  portfolioName: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: React.FC<Props> = ({ portfolioName, isOpen, setIsOpen }) => {
  const AppStore = useStores();
  const [loading, setLoading] = useState(false);

  const deleteClick = (portfolioName: string) => {
    setLoading(true);
    AppStore.deletePortfolioController(portfolioName, AppStore.getUserId());
    // logging the status
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const year = d.getFullYear();
    const hour = d.getHours();
    const second = d.getSeconds();
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hour}:${second}`;
    const logData = {
      message: `${AppStore.getUserId()} deleted portfolio ${portfolioName} at ${formattedDate} ${formattedTime}`,
    };
    setLoading(false);
    AppStore.createLogController(logData);
    window.location.reload();
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        onClick: (event) => {
          event.stopPropagation();
        },
      }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Delete portfolio
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 3, mb: 3 }}>
          Are you sure you want to delete this portfolio?
        </Typography>
        <Grid container display={"flex"}>
          <Grid item xs={6}>
            <OutlinedButton
              buttonText="Cancel"
              style={{ width: "150px" }}
              onClick={() => setIsOpen(false)}
            />
          </Grid>
          <Grid item xs={6}>
            <PrimaryButton
              buttonText="Delete"
              isLoading={loading}
              style={{ width: "150px" }}
              onClick={(e: any) => {
                e.stopPropagation();
                deleteClick(portfolioName);
              }}
            ></PrimaryButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
