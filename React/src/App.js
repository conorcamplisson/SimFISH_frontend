import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import { Button } from '@mui/material'
import { Container } from '@mui/material'
import AppBar from './components/AppBar'
import ParticlesBG from './components/ParticlesBG'
import Dropdown from './components/Dropdown'
import TextInput from './components/TextInput'
import JobPlot from './components/JobPlot'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
})

const theme = createTheme({
  typography: {
    // fontFamily: 'Roboto',
    h4: {
      fontWeight: 900,
    },
    h3: {
      fontWeight: 900,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#3daed5',
    },
    secondary: {
      main: '#c2e0f9',
    },
    background: {
      default: '#0b3b6d',
    },
    text: {
      primary: '#e3f2fd',
    },
  },
})

function App() {
  const [shinyMessage, setShinyMessage] = useState('')
  const [shinyUrls, setShinyUrls] = useState('')
  const [ggplotTitle, setGgplotTitle] = useState('')
  const [ggplotUrl, setGgplotUrl] = useState(null)
  const [peopleData, setPeopleData] = useState([])
  const [isLoadingPeopleData, setIsLoadingPeopleData] = useState(false)

  /* Receiving the data through websocket */
  // window.Shiny.addCustomMessageHandler('message_from_shiny', (msg) => {
  //   setShinyMessage(msg)
  // })

  /* Sending the message to Shiny through websocket */
  // const sendMessage = (e) => {
  //   window.Shiny.setInputValue('message_from_react', e.target.value)
  // }

  /* Receiving HTTP API URLs */
  window.Shiny.addCustomMessageHandler('urls', (urls) => {
    setShinyUrls(urls)
    updatePlot(urls.ggplot_url_svg)
    console.log(urls)
  })

  const fetchPeopleData = async (urls) => {
    setIsLoadingPeopleData(true)
    await fetch(urls.example_get_people_url)
      .then((data) => data.json())
      .then((data) => {
        setPeopleData(data)
      })
      .finally(() => setIsLoadingPeopleData(false))
  }

  const updateData = () => {
    fetchPeopleData(shinyUrls)
  }

  const updatePlot = (url) => {
    setGgplotUrl(`${url}&title=${ggplotTitle}`)
  }

  const [seqInputForm, setSeqInputForm] = useState('')
  const [assembleID, setAssembleID] = useState('')
  const [jobID, setJobID] = useState('')

  const postData = async (urls) => {
    const data = JSON.stringify({ assembly_id: assembleID, sequence: seqInputForm })
    await axiosInstance
      .post('/create_job', data)
      // .then((response) => response.json())
      .then((response) => {
        setJobID(response.data.job_id)
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(jobID))
  }
  const sendRequest = () => {
    postData(seqInputForm)
  }

  return (
    <div className="App">
      <AxiosProvider instance={axiosInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            sx={{
              // bgcolor: theme.palette.background.default,
              background: 'linear-gradient(to right bottom, #8360c3, #2ebf91)',
              minHeight: '100vh',
              fontSize: 'calc(10px + 2vmin)',
              marginTop: 0,
              // color: 'darkblue',
            }}
            maxWidth={false}
          >
            <AppBar />

            <ParticlesBG />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" component="div" style={{ paddingTop: '3rem' }}>
                Start a New FISH Simulation
              </Typography>
              <Typography variant="subtitle1" component="div">
                This tool simulates the genome-wide binding profile of candidate probes under
                experimental hybridization conditions.
              </Typography>
            </Box>
            <Dropdown instance={axiosInstance} setAssemblyID={setAssembleID} />

            <TextInput
              header="Probe Sequence"
              label="Please enter your probe sequence(s) or drag and drop a valid FASTA file!"
              id="fullWidth"
              setInput={setSeqInputForm}
              multi={true}
            />
            <Box
              sx={{
                width: '100%',
                // maxWidth: 300,
                // bgcolor: 'background.paper',
                paddingTop: '0rem',
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '0rem',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={sendRequest}
                sx={{
                  display: 'flex',
                }}
              >
                Submit
              </Button>
            </Box>

            <TextInput
              header="Job ID"
              label="Job ID"
              placeholder="Enter JobID"
              setInput={setJobID}
              textValue={jobID}
            />
            {/* <p>{shinyMessage}</p> */}
            {/* <input type="text" onChange={sendMessage} /> */}

            {jobID ? <JobPlot jobID={jobID} shinyUrls={shinyUrls} /> : null}
            {/* <div className="shiny-sections">
            <div className="shiny-section">
              <input
                type="text"
                placeholder="New title"
                onChange={(e) => setGgplotTitle(e.target.value)}
              />
              <button
                type="button"
                onClick={() => updatePlot(shinyUrls.ggplot_url_svg)}
                className="shiny-button"
              >
                Update title!
              </button>
              {ggplotUrl ? <iframe src={ggplotUrl} /> : null}
            </div>
            <div className="shiny-section">
              <p>
                Randomly generated data using <code>randomNames</code>
                package fetched from Shiny through HTTP API:
              </p>
              <button type="button" onClick={updateData} className="shiny-button">
                Generate list
              </button>
              {isLoadingPeopleData ? (
                <p>Generating 500,000 rows</p>
              ) : peopleData.length ? (
                <div data={peopleData} />
              ) : null}
            </div>
          </div> */}
          </Container>
        </ThemeProvider>
      </AxiosProvider>
    </div>
  )
}

export default App
