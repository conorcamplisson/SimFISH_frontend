import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function ButtonAppBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 1,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <AppBar
        color="primary"
        elevation={5}
        square={false}
        position="static"
        sx={{ width: 1080, padding: 3 }}
      >
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Genome-wide Fluorescence In Situ Hybridization Simulation
          </Typography>
          {/*<Button variant="contained" color="primary">
            Try it
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
