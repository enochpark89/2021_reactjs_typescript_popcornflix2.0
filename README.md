# Netflix Clone

# Development

# 1. Create Header

# 2. Create Animation

- Put your mouse on top of the netflix > animation starts over and over. 
- Use *framer-motion* library to accomplish animation easily.

```js
const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    // create a repeat
    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
    return (
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
    );
}

```

- useRouteMatch will tell you whether you are there or not.
- console.log them and see how it shows. 
- It returns the Object that tells you which path you are in and which url you have.

```js
{path: '/', url: '/', isExact: false}
```

- you can use this RouteMatch to check whether the path matches the url you want to match. If true, you can render a dot next to the active 

# Home Screen

- We are going to have many movie data presented in slider. 
- We use TMDB API to grab information. 
- As netflix, we show the first Movie in the screen as Netflix and present all the other ones in sliders. 
- We can use React Query to quety the movei.

Steps:
1. Create query client from the index.tsx
```ts
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")

);
```
2. Work with API.

- get the address > paste in the browser to see what items you are getting
- 

3. Use React-Query to fetch the data
4. Check whether you queried successfully or not.

*You can set the background image with the backdrop image that the TMDB API*

