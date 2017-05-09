React-typing-animation
============
[![NPM](https://nodei.co/npm/react-typing-animation.png)](https://npmjs.org/package/react-typing-animation)

> A fully-featured typing animation in React that supports any valid JSX.

## Motivation

There were other JS typing animations that existed when I created this, but they were all lacking in robust features. This component aims to support all of the following features:

✅ Type text from any valid JSX

✅ Preserve DOM structure/styling

✅ Change typing speed anywhere in tree

✅ Add a delay anywhere in tree

✅ Backspace animation

✅ Reset lines / full tree

✅ Loop functionality

✅ No dependencies (CSS or JS)


## Demo

Try *link to live demo*

*gif of animation*

**or**

```shell
git clone https://github.com/adamjking3/react-typing-animation
cd react-typing-animation
npm install
npm start
```

Then open http://localhost:3000/ in a browser.

## Installation

```shell
npm i --save react-typing-animation
```

## Usage

```jsx
import Typing from 'react-typing-animation'

const AnimatedTypingComponent = () => (
  <Typing>
    <span>This span will get typed.</span>
  </Typing>
);
```


## Documentation

|     Property     |    Type    |       Default       | Required | Description |
|:----------------:|:----------:|:-------------------:|:--------:|:-----------:|
|     children     | React node |                     |    yes   |             |
|     className    |   string   |          ''         |    no    |             |
|      cursor      | React node | [Cursor.js](https://github.com/adamjking3/react-typing-animation/blob/master/src/Cursor.js)         |    no    |             |
|       speed      |   number   |          50         |    no    |             |
|    startDelay    |   number   |          0          |    no    |             |
|       loop       |   boolean  |        false        |    no    |             |
| onFinishedTyping |  function  |       () => {}      |    no    |             |


### Backspace Component

```jsx
import Typing from 'react-typing-animation';
...
  <Typing>
    <span>This span will get typed, then erased.</span>
    <Typing.Backspace count={20} />
  </Typing>
```

| Property |  Type  | Default | Required | Description |
|:--------:|:------:|:-------:|:--------:|:-----------:|
|   count  | number |    1    |   false  |             |
|   delay  | number |    0    |   false  |             |
|   speed  | number |    -1   |   false  |             |

### Delay Component

```jsx
import Typing from 'react-typing-animation';
...
  <Typing>
    <div>
      There will be a 1000ms delay here,
      <Typing.Delay ms={1000} />
      then this will be typed.
    </div>
  </Typing>
```

| Property |  Type  | Default | Required | Description |
|:--------:|:------:|:-------:|:--------:|:-----------:|
|    ms    | number |         |    yes   |             |

### Speed Component

```jsx
import Typing from 'react-typing-animation';
...
  <Typing speed={50}>
    This line will be typed at 50ms/character,
    <Typing.Speed ms={200} />
    then this will be typed at 200ms/character.
  </Typing>
```

| Property |  Type  | Default | Required | Description |
|:--------:|:------:|:-------:|:--------:|:-----------:|
|    ms    | number |         |    yes   |             |

### Reset Component

```jsx
import Typing from 'react-typing-animation';
...
  <Typing>
    <span>This line will stay.</span>
    <span>This line will get instantly removed after a 500 ms delay</span>
    <Typing.Reset count={1} delay={500} />
  </Typing>
```

| Property |  Type  | Default | Required | Description |
|:--------:|:------:|:-------:|:--------:|:-----------:|
|   count  | number |    0    |   false  |             |
|   delay  | number |    0    |   false  |             |
|   speed  | number |    -1   |   false  |             |

## Contributing

After cloning the repository and running npm install inside, you can use the following commands to develop and build the project.

```shell
# Starts a webpack dev server that hosts a demo page with the component.
# It uses react-hot-loader so changes are reflected on save.
npm start

# Lints the code with eslint and my custom rules.
npm run lint

# Lints and builds the code, placing the result in the dist directory.
# This build is necessary to reflect changes if you're
#  `npm link`-ed to this repository from another local project.
npm run build
```

Pull requests are welcome!

## License
[MIT](https://github.com/adamjking3/react-typing-animation/blob/master/LICENSE)
