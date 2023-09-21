import { forwardRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import TextField from '@mui/material/TextField'

import axios from 'axios'
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

import TextInput from './TextInput'
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
      }}
    >
      <Get url={'/job/' + props.jobID}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return (
              <div>
                Something bad happened today: {error.message}{' '}
                <Button onClick={() => makeRequest({ params: { reload: true } })}>Retry</Button>
              </div>
            )
          } else if (isLoading) {
            return <div>Loading...</div>
          } else if (response !== null && !response.data.results) {
            return <div>No results found</div>
          } else if (response !== null) {
            return (
              <div>
                <Button onClick={() => makeRequest({ params: { refresh: true } })}>Refresh</Button>
                <Post
                  instance={axios.create({ baseURL: '/' })}
                  url={props.shinyUrls.ggplot_url_svg}
                  data={response.data}
                >
                  {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                      return (
                        <div>
                          Something bad happened: {error.message}{' '}
                          <Button onClick={() => makeRequest({ params: { reload: true } })}>
                            Retry this post
                          </Button>
                        </div>
                      )
                    } else if (isLoading) {
                      return <div>Loading...</div>
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
                    return <div>Default message before request is made.</div>
                  }}
                </Post>
              </div>
            )
          }
          return <div>Default message before request is made.</div>
        }}
      </Get>
    </Box>
  )
})

export default JobPlot
