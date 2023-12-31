import { Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../const";
import ManageLoansTableAdmin from "../components/manageLoansTableAdmin";
import ManageLoansModal from "../components/ManageLoanModal";
import AddBoxIcon from '@mui/icons-material/AddBox';


export function ManageLoansAdmin(): React.JSX.Element {
  const navigate = useNavigate();
  const handleClickBackToDashBoard = () => navigate(APP_PATHS.ADMIN.DASHBOARD);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [createdNewLoan, setCreatedNewLoan] = useState<number>(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />
      <Box sx={{ ml: 2, mt: 2 }}>
        <Button
          id='back-to-dash-button'
          startIcon={<KeyboardBackspaceIcon />}
          onClick={handleClickBackToDashBoard}
          sx={{}}
        >
          Back to dashboard
        </Button>
      </Box>
      <Typography
        fontWeight={300}
        color='gray'
        fontSize={"35px"}
        sx={{ ml: 3, mt: 3 }}
      >
        Manage Loans
      </Typography>
      <Box sx={{ m: 3 }}>
        <ManageLoansTableAdmin
          createdNewLoan={createdNewLoan}
          setCreatedNewLoan={setCreatedNewLoan}
        />
      <Toolbar />
      <Toolbar />
      <Button
        sx={{
          position: "fixed",
          bottom: "4em",
          right: "0em",
          mr: 3,
          borderRadius: 0,
        }}
        variant='contained'
        size='large'
        startIcon={<AddBoxIcon />}
        onClick={() => setModalOpen(true)}
      >
        Add Loan
      </Button>
      <ManageLoansModal 
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      createdNewLoan={createdNewLoan}
      setCreatedNewLoan={setCreatedNewLoan}
      />
    </Box>
    </Box>
  );
}
