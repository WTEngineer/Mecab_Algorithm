import { Box, Link, Typography } from '@material-ui/core'
//import ClipboardJS from 'clipboard'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-core'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/toolbar/prism-toolbar.css'
//import Button from '@material-ui/core/Button'

import React, { useEffect } from 'react'

import Prism from 'prismjs'

const routesExample = ` // You can declare this in 'App.js', but it might
// be better to move it to its own file.

const routes = [{
    path: '/',
    component: HomePage,
  }, {
    path: '/Teachers',
    component: TeacherListPage,
  }, {
    path: '/Teachers/:teacherId',
    component: TeacherPage,
  }, {
    path: '/Teachers/:teacherId/Classes',
    component: TaughtClassesPage,
  }, /* And so on. */];
  `

const appCode = `class App extends Component {
    render() {
      const routeComponents = routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);
      return (
        <BrowserRouter>
          {routeComponents}
          </div>
        </BrowserRouter>
      );
    }
  }`

function AboutRoute() {
  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <div className="AboutRoute">
      <Box mb={5}>
        <Typography variant="h3">About Route</Typography>
      </Box>

      <Typography component="div" gutterBottom>
        <Typography variant="h4">Mapping Routes in React Router</Typography>
        <Box my={4}>
          <Typography variant="h5">參考範例</Typography>
          <Link
            color="textPrimary"
            component="button"
            href="https://www.digitalocean.com/community/tutorials/react-react-router-map-to-routes"
          >
            網址
          </Link>
        </Box>
        <Box my={4}>
          <Typography variant="h5">route設定</Typography>
          <pre>
            <code className="language-javascript">{routesExample}</code>
          </pre>
        </Box>
        <Box my={4}>
          <Typography variant="h5">App.js範例</Typography>
          <pre>
            <code className="language-javascript">{appCode}</code>
          </pre>
        </Box>
      </Typography>
    </div>
  )
}

export default AboutRoute
