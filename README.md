# mockery-istanbul-example
Example of proper unit testing on NodeJS using Mockery, Sinon, Istanbul

### commands: 

Run unit tests (`npx nyc mocha src/*.test.js`), generating code coverage report:
```
yarn test
```

Once reports are ready, generate HTML to visualize them (`nyc report --reporter=html"`):
```
yarn coverage
```

### License

MIT