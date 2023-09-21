import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'darkblue' }}>
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
