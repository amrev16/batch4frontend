import { Button, useTheme } from "@mui/material";
import { Box, Card, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_PATHS, USER_ROLES } from "../const";
import { userDetailsContext } from "../contexts/UserDetailsProvider";
import { parseUserCookie } from "../services/common.services";
import { ISignInRes } from "../types/siginInRes";

export function Home() : React.JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickUserLogin = ()=> navigate(APP_PATHS.USER.LOGIN);
  const handleClickAdminLogin = ()=> navigate(APP_PATHS.ADMIN.LOGIN);
  const [globalUser, setGlobalUser] = useContext(userDetailsContext) as [ISignInRes, React.Dispatch<React.SetStateAction<ISignInRes>>]
  useEffect(()=>{
    const user = parseUserCookie();
    setGlobalUser(user)
    console.log(user);
    if(user.roles?.at(0) === USER_ROLES.ADMIN)
      navigate(APP_PATHS.ADMIN.DASHBOARD)
    else if(user.roles?.at(0) === USER_ROLES.USER)
      navigate(APP_PATHS.USER.DASHBOARD)
  },[])
  return (
    <>
      {/* <Toolbar /> */}
      <Box
        sx={{
          display: 'flex',
          height: '100vh'
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: '100%',
            display: "flex",
            alignItems: 'center'
          }}
        >
          <Typography color={theme.palette.primary.main} fontSize={80} fontWeight={200} sx={{m: 4}} >
            Loan Management System
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 3,
              minWidth: '60%',
              background: theme.palette.common.white
            }}
            elevation={12}
          >
            <Typography align="center" fontSize={35} fontWeight={300} >Get Started</Typography>
            <Button sx={{m: 3}} variant='contained' onClick={handleClickUserLogin} > Login as user </Button>
            <Button sx={{m: 3, mt: 0}} variant='contained' onClick={handleClickAdminLogin} > Login as admin </Button>
          </Card> 
        </Box>
      </Box>
    </>
  )
}