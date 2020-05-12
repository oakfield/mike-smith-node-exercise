# Node Exercise

Mike Smith's submission for the Node part of the Solo code challenge. Exposes two endpoints on port 3000, `/planets` and `people`.

## Building and Running

The submission is written in TypeScript, so it needs to be built before running.

- `npm install`
- `npm run build`
- `npm start`

## NFRs

### Performance

- The services make multiple requests simultaneously to reduce latency.

### Maintainability

- The code is written in TypeScript. Some studies suggest that code in TypeScript tends to have fewer bugs than code in JavaScript.
- The app has a layered architecture, which is reflected by the file structure. Different modules are responsible for formatting requests and responses, for application logic, and for data access (in this case, the `swapi-client` file).

## Notes

- I wrote the planet service to make all requests -- for planet pages and residents -- simultaneously. But that strategy was much more complicated, and, in my tests, no faster than the more synchronous approach I ultimately went with. I suspect my browser was throttling the requests.