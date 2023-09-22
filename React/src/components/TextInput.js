import { forwardRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import { useDropArea } from 'react-use'

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const TextInput = forwardRef(
  ({ header, label, helperText, placeholder, setInput, textValue, multi, input }, ref) => {
    // const [input, setInput] = useState('')
    const [bond, state] = useDropArea({
      onFiles: (files) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const text = e.target.result
          console.log(text)
          setSequenceInput(text)
          setInput(text)
        }
        reader.readAsText(files[0])
      },
      onUri: (uri) => console.log('uri', uri),
      onText: (text) => console.log('text', text),
    })
    const [sequenceInput, setSequenceInput] = useState(null)
    return (
      <Box
        sx={{
          width: '100%',
          // maxWidth: 300,
          // bgcolor: 'background.paper',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '1rem',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography variant="h6" component="div" align="left">
          {header}
        </Typography>
        <Paper square={false} elevation={6} sx={{ bgcolor: 'background.paper' }}>
          <TextField
            id="outlined-textarea"
            label={label}
            input
            placeholder={placeholder}
            helperText={helperText}
            value={multi ? sequenceInput : textValue}
            onChange={(e) => {
              setSequenceInput(e.target.value)
              setInput(e.target.value)
            }}
            multiline={multi}
            fullwidth={multi}
            variant="filled"
            rows={multi ? 12 : null}
            sx={multi ? { width: 1080 } : null}
            // error={inputError}
            {...(multi ? { ...bond } : {})}
          />
        </Paper>
      </Box>
    )
  }
)

export default TextInput
