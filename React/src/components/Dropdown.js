import { forwardRef, useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import TextField from '@mui/material/TextField'

const Dropdown = forwardRef(({ setAssemblyID, instance }, ref) => {
  const [dropdown, setDropdown] = useState(null)
  const [dropdownDict, setDropdownDict] = useState(null)
  // const [loaded, setLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function getKeyByValue(object, value) {
    let key = ''
    try {
      key = Object.keys(object).find((key) => object[key] === value)
    } catch (e) {
      console.log('No ID Found')
    }
    return key
  }

  useEffect(() => {
    instance
      .get('/assemblies')
      .then((response) => {
        setDropdown(response.data.assemblies)
        var dict = {}
        for (var i = 0, assembly; i < response.data.assemblies.length; i++) {
          assembly = response.data.assemblies[i]
          dict[assembly.id] = assembly.description
        }
        setDropdownDict(dict)
      })
      .catch((e) => console.log(e))
  }, [instance])

  useEffect(() => {
    let assemblyID = getKeyByValue(dropdownDict, inputValue)
    if (assemblyID) {
      console.log(assemblyID)
      setAssemblyID(assemblyID)
    }
  }, [dropdownDict, inputValue, setAssemblyID])

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
      }}
    >
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id="ref-select"
        sx={{ width: 300 }}
        options={!dropdown ? [{ description: 'Loading...' }] : dropdown}
        autoHighlight
        getOptionLabel={(option) => option.description}
        defaultValue={!dropdown ? { id: 20, description: 'hg38 (Human Genome)' } : dropdown[0]}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.description}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select reference assembly"
            variant="filled"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </Box>
  )
})

export default Dropdown
