import { Button, Box, Container, Typography } from '@material-ui/core'
import ClipboardJS from 'clipboard'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-core'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
//import Button from '@material-ui/core/Button'

import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
//import LinkList from '../components/LinkList'
//import Breadcrumbs from '../components/SimpleBreadcrumbs'
//import Color from './Color'
//import CodeEditor from '../components/CodeEditor'
import Prism from 'prismjs'

const TestCode = `var ExampleApplication = React.createClass({
  render: function() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>;
  }
});
var start = new Date().getTime();
setInterval(function() {
  React.render(
    <ExampleApplication elapsed={new Date().getTime() - start} />,
    document.getElementById('container')
  );
}, 50);
`

function Example() {
  // 宣告一個新的 state 變數，我們稱作為「count」。
  const [count, setCount] = useState(0)

  const clipboard = new ClipboardJS('.btn')

  clipboard.on('success', function (e) {
    console.info('Action:', e.action)
    console.info('Text:', e.text)
    console.info('Trigger:', e.trigger)

    e.clearSelection()
  })

  clipboard.on('error', function (e) {
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button
        variant="outlined"
        className="btn"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </Button>
    </div>
  )
}

const useStateCode = `import React, { useState } from 'react';

function Example() {
  // 宣告一個新的 state 變數，我們稱作為「count」。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`

function About() {
  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <div className="About">
      <Typography variant="h3">About</Typography>
      <Box my={2}>
        <pre>
          <code className="language-javascript">{TestCode}</code>
        </pre>
      </Box>
      <Container maxWidth="sm">
        <Typography variant="h4">React useState</Typography>
        <Typography component="div" gutterBottom>
          <Box my={4}>
            <Typography variant="h5">範例</Typography>
            <Example />
          </Box>
        </Typography>
        <div>
          <Typography variant="h5">程式碼</Typography>
          <pre>
            <code className="language-javascript">{useStateCode}</code>
          </pre>
        </div>
      </Container>
    </div>
  )
}

export default About
