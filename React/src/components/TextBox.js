import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="fish" height="140" image="/fish-experiment-uw.jpg" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="left">
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This tool simulates the genome-wide binding profile of candidate probes under experimental
          hybridization conditions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
