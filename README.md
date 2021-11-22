![Maintcainer](https://img.shields.io/badge/maintainer-filipakkad-blue)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/filipakkad)


# React 🤝 Shiny Template

[**See the minimalistic DEMO**](https://akkido.shinyapps.io/react_shiny_template/)

## React developers - welcome on (dash) board!

This setup is allowing the user to build frontend in pure **[React.js](https://reactjs.org/)** whereas keep the backend/logic in **[Shiny](https://shiny.rstudio.com/)**.

But one may ask - why?

1. By breaking the monolithic structure of Shiny app into frontend & backend we are able to apply modern standards and patterns for building beautiful web applications with React.
2. Shiny server wouldn't have to be involved in generating UI.
3. UI part is no longer dependent on R wrappers of JS libraries. 
4. You are able now to take advantage of:
    - [Material UI](https://mui.com/getting-started/usage/), [PrimeReact](https://primefaces.org/primereact/showcase/), [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/controls/web), [React-Bootstrap](), [Blueprint](https://blueprintjs.com/docs/), [Ant Design](https://ant.design/components/overview/) and many other great UI libraries.
    - static typing with [TypeScript](https://www.typescriptlang.org/) ❤️
    - using [JSX](https://reactjs.org/docs/introducing-jsx.html) ❤️
    - [mobx](https://www.mobxjs.com/), [redux](https://redux.js.org/) for state management
    - modern tools for designing/styling React components - e.g. [Storybook](https://storybook.js.org/docs/react/get-started/introduction), [styled-components](https://styled-components.com/)
    - solutions addressing performance issues - e.g. [react-virtualized](https://github.com/bvaughn/react-virtualized)/[react-window](https://github.com/bvaughn/react-window) for [rendering huge lists](https://reactjs.org/docs/optimizing-performance.html#virtualize-long-lists)
    - support from large React community
    - the best standards and patterns for building standards
    - (many many others)
  5. The React app is built as a static page therefore it can be placed as a static resource in Shiny project. It implies that **nothing changes in terms of the deployment e.g. to RStudio Connect**). 

### For whom?
  - You are a Shiny developer passionate about React or 
  - You would like to collaborate with a React developer on your Shiny dashboard 

then **this setup is for you!**

Otherwise you might be interested in using [`shiny.react`](https://appsilon.github.io/shiny.react/) and packages based on top of that (e.g. [`shiny.fluent`](https://appsilon.github.io/shiny.fluent/)). Here is nice example of [how to wrap Blueprint with `shiny.react`](https://appsilon.github.io/shiny.react/articles/shiny-react.html)

## Setup

The setup allows for:
1. Using [Node server for development](https://create-react-app.dev/docs/getting-started/#npm-start-or-yarn-start) (to see changes made live)
2. Building the React app as a stiatic page and then using it with Shiny

The React app itself has been initialized with [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html), so in case you need to perform some more sophisticated operations please take a look at the [documentation](https://reactjs.org/docs/getting-started.html)

# Launching the app

Make sure you have all the `R` dependencies installed:

``` r
renv::restore()
```

Then you launch the app like any other Shiny app
``` r
shiny::runApp()
```

# Development
## Starting development server

Make sure you have all the `R` dependencies installed:

``` r
renv::restore()
```

Then you need to go to React directory inside the project (terminal):

``` console
cd React
```
If you are starting the development for the first time you need to install all the dependencies:

``` console
npm install
```

And then you need to start both Node development server and Shiny app. You can do both just by running the command:

``` console
npm start
```

And you are ready to go! 

---

Once you decide you React app is ready you need to build it and place it inside your Shiny project. You can do it by running the command:
``` console
npm run build
```

Now, you can run your Shiny app as usual. 

## Communication between Shiny and React

There are basically three ways how React app can communicate with Shiny backend:
  1. [Shiny → React (websocket)](#1-shiny--react-websocket)
  2. [React → Shiny (websocket)](#2-react--shiny-websocket)
  > You can also learn more about communication between JS and R through websocket [HERE](https://shiny.rstudio.com/articles/communicating-with-js.html)
  3. [React ⇄ Shiny (REST API)](#3-react--shiny-rest-api)

> **NOTE 1**: no `ui` function is being presented assuming that all the `UI` is being handled by `React` app

> **NOTE 2**: The examples given below aim to present just the idea of how the connection could be established (putting aside applicable design patterns).

### 1. Shiny → React (websocket)
#### Example
On `Shiny` server side:

``` r
library(shiny)

server <- function(input, output, session) {
  #...
  session$sendCustomMessage("message_from_shiny", "I AM THE MESSAGE FROM SHINY SERVER")
}
```

On `React` side:

``` javascript 
const App = () => {
  const [shinyMessage, setShinyMessage] = useState(null);
  
  window.Shiny.addCustomMessageHandler("message_from_shiny", (msg) => {
    setShinyMessage(msg);
  });
  
  return <p>{shinyMessage}</p>
}
```

### 2. React → Shiny (websocket)
#### Example
On `Shiny` server side:
``` r
library(shiny)

server <- function(input, output, session) {
  #...
  observeEvent(input$message_from_react, {
    print(input$message_from_react)
  })
}
```

On `React` side:

``` javascript 
const App = () => {
  const sendMessage = (e) => {
    window.Shiny.setInputValue("message_from_react", e.target.value);
  };
  
  return <input type="text" onChange={sendMessage} />
}
```

### 3. React ⇄ Shiny ([REST API](https://www.ibm.com/cloud/learn/rest-apis))
#### Description
This is probably the least popular way of communicating with Shiny server. However, there are many benefits from using it:

1. Thanks to the stateless nature of `REST API` you can manage the app state solely in `React` (with help of e.g. [`mobx`](https://mobx.js.org/), [`redux`](https://redux.js.org/))
2. You don't need to configure two-way websocket communication whenever React needs anything from Shiny (i.e. [approach 1](#1-shiny--react-websocket) combined with [approach 2](#2-react--shiny-websocket))
3. It would be potentially easier to replace Shiny with any other `REST API` backend

Existence of `REST API` in the Shiny package given out of the box is a great and promising feature. However, *out of the box* doesn’t actually mean transparent in a sense that the developer must combine certain - not intuitively named or easily accessible - functions in order to achieve it:

- [`session$registerDataObj(name, data, filterFunc)`](https://shiny.rstudio.com/reference/shiny/latest/session.html)
- [`shiny:::httpResponse(status, content_type, content, headers)`](https://shiny.rstudio.com/reference/shiny/latest/httpResponse.html)

##### `session$registerDataObj(name, data, filterFunc)`
> **registerDataObj(name, data, filterFunc)**<br/>
> Publishes any `R` object as a URL endpoint that is unique to this session. `name` must be a single element character vector; it will be used to form part of the URL. `filterFunc` must be a function that takes two arguments: `data` (the value that was passed into `registerDataObj`) and req (an environment that implements the `Rook` specification for HTTP requests). `filterFunc` will be called with these values whenever an HTTP request is made to the URL endpoint. The return value of `filterFunc` should be a `Rook`-style response.


So instead of publishing any R object directly (in our case `data = list()`) we are focusing on the `filterFunc(data, req)` function, which in this case will work as the request handler. 

The function returns an URL which looks similarily to this:
> session/13b6edsessiontoken3764158e8a3af1/dataobj/example-api-example-get-api?w=&nonce=14367c50429fc201

##### `shiny:::httpResponse(status, content_type, content, headers)`
The response will be handled by Shiny private (`:::`) function `shiny:::httpResponse(...)` - there is no detailed description unfortunately (yet), but the idea is pretty straightforward - [see the documentation](https://shiny.rstudio.com/reference/shiny/latest/httpResponse.html). When determining `content_type` you can use [this source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

---

#### Graph

![graph](https://user-images.githubusercontent.com/54677165/142600070-48d240d5-c2ff-43c7-a9bd-166ce11bdd67.png)

---
#### Example
On `Shiny` server side:
``` r
library(shiny)
library(jsonlite)
library(dplyr)
library(ggplot2)

server <- function(input, output, session) {
  #...
  
  return_data <- ggplot2::midwest
  
  #' Endpoint for getting the data
  example_get_data_url <- session$registerDataObj(
    name = "example-get-api",
    data = list(), # Empty list, we are not sharing any object
    # That's the place where the request is being handled
    filterFunc = function(data, req) {
      if (req$REQUEST_METHOD == "GET") {
        response <- return_data
        response %>%
          toJSON(auto_unbox = TRUE) %>%
          shiny:::httpResponse(200, "application/json", .)
      }
    }
  )
  
  session$sendCustomMessage(
    "shiny_api_urls",
    list(
      example_get_data_url = example_get_data_url
    )
  )
}
```

On `React` side:

``` javascript 
const App = () => {
  const [urls, setUrls] = useState(null);
  const [data, setData] = useState([]);
  
  Shiny.addCustomMessageHandler('shiny_api_urls', function(urls) => {
    setUrls(urls);
    fetchData(urls);
  })
  
  const fetchData = async (urls) => {
    const fetchedData = await fetch(urls.example_get_data_url).then(data => data.json());
    setData(fetchedData);
  }
  
  const item_list = data.map((item) => (
    <li key={item.PID}>{`${item.county} (${item.state})`}</li>
  ));

  return <ul>{item_list}</ul>
}
```

---




# FAQ
## How does using Shiny REST API differ from [`Plumber`](https://www.rplumber.io/)?

1. Plumber doesn’t offer websocket connection out of the box as Shiny does. In other words, with Plumber only the client is initiating a communication - by making a request - whereas Shiny allows for bidirectional initialization. Having that the developer can trigger things to happen from the server side, e.g. send a notification/message to the browser.

2. As the UI is made as a static web page **it can be the part of the Shiny project**. Therefore the developer doesn’t have to bother with separate servers/deployments for backend and frontend. Deployment process to RStudio Connect will then be the same as for the standard Shiny app. 

3. The session is still managed by Shiny (all the REST URLs contain session token, so assuming that session token is secret the REST URLs might be considered as session-scoped). React app contains all Shiny dependencies (through [`{{ headContent() }}`](https://shiny.rstudio.com/articles/templates.html) used in [`htmlTemplate()`](https://shiny.rstudio.com/reference/shiny/latest/htmlTemplate.html) function), so when the session is over you can notice the characteristic grey page and notification about reloading the session.

