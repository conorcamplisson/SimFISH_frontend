import { forwardRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import axios from 'axios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import TextInput from './TextInput'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// const StyledIFrame = styled.iframe`
//   width: 150px;
// `

const JobPlot = forwardRef((props, ref) => {
  const [seqInputForm, setSeqInputForm] = useState('')

  return (
    <Box
      sx={{
        padding: '15px 15px 15px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Get url={'/job/' + props.jobID}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return (
              <>
                <Typography variant="h6" component="div">
                  Error to /job/ endpoint: {error.message}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => makeRequest({ params: { reload: true } })}
                  sx={{ marginBottom: '1rem' }}
                >
                  Retry
                </Button>
              </>
            )
          } else if (isLoading) {
            return (
              <>
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={1100}
                  height={60}
                  sx={{ margin: 1 }}
                />
                <Skeleton animation="wave" variant="rounded" width={1100} height={200} />
              </>
            )
          } else if (response !== null && !response.data.results) {
            return (
              <Typography variant="h6" component="div">
                No alignments found
              </Typography>
            )
          } else if (response !== null && !response.data.is_done) {
            return (
              <>
                <Typography variant="h6" component="div">
                  JobID {props.jobID} is not done yet! Please try again later.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => makeRequest({ params: { reload: true } })}
                  sx={{ marginBottom: '1rem' }}
                >
                  Retry
                </Button>
              </>
            )
          } else if (response !== null && response.data.is_done) {
            return (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => makeRequest({ params: { refresh: true } })}
                  sx={{ marginBottom: '1rem' }}
                >
                  Refresh
                </Button>
                <Post
                  instance={axios.create({ baseURL: '/' })}
                  url={props.shinyUrls.ggplot_url_svg}
                  data={response.data}
                >
                  {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                      return (
                        <>
                          <Typography variant="h6" component="div">
                            Error to Chromograph endpoint: {error.message}
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => makeRequest({ params: { reload: true } })}
                            sx={{ marginBottom: '1rem' }}
                          >
                            Retry
                          </Button>
                        </>
                      )
                    } else if (isLoading) {
                      return (
                        <>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={1100}
                            height={60}
                            sx={{ margin: 1 }}
                          />
                          <Skeleton animation="wave" variant="rounded" width={1100} height={200} />
                        </>
                      )
                    } else if (response !== null) {
                      return (
                        <Card
                          maxWidth={false}
                          maxHeight={false}
                          sx={{
                            position: 'relative',
                            // marginLeft: '100px',
                            // marginRight: '100px',
                            height: '750px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '1100px',
                          }}
                        >
                          <CardMedia
                            component="iframe"
                            srcDoc={response.data}
                            frameborder="no"
                            scrolling="no"
                            sx={{ height: '100%', width: '1100px' }}
                          />
                        </Card>
                        // <iframe srcDoc={response.data} frameborder="no" />
                      )
                    }
                    return (
                      <>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width={1100}
                          height={60}
                          sx={{ margin: 1 }}
                        />
                        <Skeleton animation="wave" variant="rounded" width={1100} height={200} />
                      </>
                    )
                  }}
                </Post>
              </>
            )
          }
          return (
            <>
              <Skeleton
                animation="wave"
                variant="rounded"
                width={1100}
                height={60}
                sx={{ margin: 1 }}
              />
              <Skeleton animation="wave" variant="rounded" width={1100} height={200} />
            </>
          )
        }}
      </Get>
    </Box>
  )
})

export default JobPlot
