# Wiremock UI

## Local Setup

- git clone `https://github.com/fauxauldrich/mountebank-ui.git`
- `cd mountebank-ui`
- `npm install`
- `npm install -g serve webpack tsc`
- Modify `ts/src/config.ts` in case Mountebank details differ from default values
  - `MB_HOST`: default value -> localhost
  - `MB_PORT`: default value -> 2525
- Run application in development mode using `npm start`
- Navigate to `http://localhost:5000/`
- To deploy in production
  - Build using webpack: `npm run wp`
  - `npm install -g serve`
  - `serve build/`
