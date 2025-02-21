import React from 'react'
import Typography from '@material-ui/core/Typography'
import { LoremIpsum } from 'react-lorem-ipsum'

function Books(props) {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Books
      </Typography>

      <Typography paragraph>
        <LoremIpsum />
      </Typography>
      <Typography paragraph>
        <LoremIpsum p={7} />
      </Typography>
    </div>
  )
}

export default Books
