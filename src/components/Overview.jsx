import React from 'react'
import Logo from './logo'
import { Box, Stack, Typography } from '@mui/material'

const Overview = () => {
  return (
    <Box display="flex" sx={{width: {xs: "80vw", md: "auto"}}} alignItems="center" justifyContent="center" p={4} flex={1}>
        {/* <Logo></Logo> */}
        <Stack spacing={1} direction="column" alignItems="center">
        <Box>
            <img style={{maxWidth: "100%"}} src={require("../images/overview.svg").default} alt="phone" />
        </Box>
        <Typography p={2} sx={{fontSize: "1.9rem", display: {xs: "none", md: "block"}}} align='center' variant='h5' color="primary.dark" fontWeight={600}>Get your contacts managed like never before only with Linkify</Typography>
        </Stack>
        </Box>
  )
}

export default Overview