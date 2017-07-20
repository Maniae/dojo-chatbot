const express = require('express')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')
const handlers = requireDir('./handlers')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('API server listening on port %d in %s mode', server.address().port, app.settings.env)
});

app.post('/webhook', (req, res) => {
  const response = makeResponse(req)
  return res.json(response)
})

function makeResponse(req) {
  const data = req.body.result
  const handler = handlers[data.action]

  return handler.handle(data)
}