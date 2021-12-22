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

# 3. Home Screen

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

# 4. Slider

Steps:

1. import { motion } from framer-motion

2. Create a motion div which you can add animation to.
```js
const Slider = styled.div`
  position: relative;
  top: -100px;
`;


const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
// Create 6 boxes.
const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;
```

3. Create a grid that takes up 6 spaces each row. 

4. Create each boxes under the <Slider> and we can set up different keys for each boxes. 

- you can assign keys with the array efficiently.

```js

// returning form home.js
<Slider>
      <AnimatePresence>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i}>{i}</Box>
          ))}
        </Row>
      </AnimatePresence>
    </Slider>
```

5. Set up rowVarients

- create one that is hidden, visiable, exiting.
  - hidden: x-coordinate
  - 

```js
const rowVariants = {
  hidden: {
    x: window.outerWidth + 12,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 12,
  },
};
```
6. When you click the page, slider is moving. 

- if you want to change the speed of a slider, you can change the rowVariants


*Bug1: when you click twice, there is a hole*

*How do you fix the bug?*

Step:
1. We can create a state that show the leaving. 
- only when the leaving is false, you can re-initiate.
2. user onExitComplete

*Bug2: Movies coming from the right*

Step:
1. We use another prop called initial={false}
```js
<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
```

*How do you organize the movies in the array?*

Steps:

1. Create const offset =6

```js
const offset = 6;
let page = 0;
// use slice to get 6 each
[1,2,3,4,5].slice(0,2)
// algorithm: .slice(offset*page, offset*page+offset): This will take 6 each from the array.
// There are several ways to do this. This was Nico's way.

```

2. Make sure the index goes back to 0 when it hits the last page. 

- Get the max index

```js
// Get the max index
const maxIndex = Math.floor(totalMovies / offset) - 1;
// if the index reaces the max, set it to 0.
setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
```

*How to make the box bigger if users hover over?*

```js

// animation set in the Varients.
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

// return (<Component>)
  <Box
    key={movie.id}
    whileHover="hover"
    initial="normal"
    variants={boxVariants}
    transition={{ type: "tween" }}
    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
  />
```

- Since the boxes on the left and right wouldn't scale to match the screen, we hav eto set the transform-origin.

```js
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
```

# 5. Information Card in the Box

- There is a card that introduces the data. 
- We can create that and show data part of each movie when the user hover over boxes. 

Steps:
1. Create Info motion.div

```js
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
```

2. return inside the box along with the Info Varient.

```js
<Box
  key={movie.id}
  whileHover="hover"
  initial="normal"
  variants={boxVariants}
  transition={{ type: "tween" }}
  bgphoto={makeImagePath(movie.backdrop_path, "w500")}
>
  <Info variants={infoVariants}>
    <h4>{movie.title}</h4>
  </Info>
</Box>
```

3. Set up infoVarient that moves just as the box

```js
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
```

# 6. Movie Modal 

- When you Click on the box, the card becomes bigger, providing more informatino about the movie. 
- We can use animation to make this happen. 
- Also, the URL changes. 
- useHistory(): you can move between routes. 

Steps:

1. Create onClick that takes the movieID.

2. Use useHistory() to move users to a new route based on the movieID.
- 

*Match: checking whether the user is on the page or not.*

3. AnimatePresense of another component. It will show when the bigMovieMatch exist. If the route exist, we should show the bigger card.

- Create motion.div which can seem ugly, but we want to make sure whether the logic works first before we design. 

# 7. Create overlay behind the box

- We need to create an Overlay so that when the user click, it will return to the previous screen. 

Steps:

1. Create a overlay component

```js
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
```

2. useHistory() to go back to the screen when the overlay is clicked. 

```js
const onOverlayClick = () => history.push("/");

// return
  <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
```

3. Keep track of the scroll position so that box will remain even if user scrolls down or up. 

- useViewportScroll from the framer-motion can be used. 
```js
  const { scrollY } = useViewportScroll();

// return
// it will get the Y axis of the scroll and add that to the style so that the card would remain the same. 
<BigMovie
  style={{ top: scrollY.get() + 100 }}
  layoutId={bigMovieMatch.params.movieId}
>
  hello
</BigMovie>
```

# 8. Find the movie and retrieve data that need to be displayed.

- When you click on the movie, you want to show the picture and the text. 

*gradient: fade-in, out*
```js
{clickedMovie && (
  <>
    <BigCover
      style={{
        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
          clickedMovie.backdrop_path,
          "w500"
        )})`,
      }}
    />
    <BigTitle>{clickedMovie.title}</BigTitle>
    <BigOverview>{clickedMovie.overview}</BigOverview>
  </>
)}
```

# 9. 

- With typescript, you need to create a form interface. 
- useForm() is going to receive the form. 
```js
  const { register, handleSubmit } = useForm<IForm>();
```

- location() tells information about wher you are in a route currently.
