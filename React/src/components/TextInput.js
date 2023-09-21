import { forwardRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const TextInput = forwardRef(
  ({ header, label, helperText, placeholder, setInput, textValue, multi, input }, ref) => {
    // const [input, setInput] = useState('')
    const [inputError, setInputError] = useState(false)
    return (
      <Box
        sx={{
          width: '100%',
          // maxWidth: 300,
          // bgcolor: 'background.paper',
          paddingTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '5rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="div" align="left">
          {header}
        </Typography>
        <TextField
          id="outlined-textarea"
          label={label}
          input
          placeholder={placeholder}
          helperText={helperText}
          value={textValue}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          multiline={multi}
          fullwidth={multi}
          variant="filled"
          rows={multi ? 12 : null}
          sx={multi ? { width: 1080 } : null}
          // error={inputError}
        />
      </Box>
    )
  }
)

export default TextInput
