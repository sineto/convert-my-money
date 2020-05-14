# Convert My Money
A simple application to learn the use of [EJS][1] with Nodejs and
[Express.js][2].

## What this app does
Get a dollar exchange rate pass by an user, and some currency amount to buy.
So the application will convert that amount to a value in BRL (Real
brasileiro).

## Requirements
- [Node][3]
- [Yarn][4]

## Packages
- [Nodejs][3]
- [Express.js][2]
- [Ejs][1]
- [Jest][5]

## App Structure
```
convert-my-money
└───README.md
└───index.js
└───package.json
└───now.json
│
└───views
│   └───header.ejs
│   └───footer.ejs
│   └───home.ejs
│   └───cotacao.ejs
│
└───public
│   └───style.css
│   └───logo.png
│
└───lib
    └───currency.js
    └───currency.test.js
```

## Usage
### Install dependencies:
```bash
yarn install
```

### Running the server:
```bash
yarn start
```

### Running unit tests:
```bash
yarn test
```

## Self-Promotion
Do you like this plugin? Come on:
-   Star and follow the repository on  [GitHub](https://github.com/sineto/convert-my-money).
-   Follow me on
    -   [GitHub](https://github.com/sineto)

[1]: https://ejs.co
[2]: https://expressjs.com
[3]: https://nodejs.org/
[4]: https://yarnpkg.com/
[5]: https://jestjs.io
