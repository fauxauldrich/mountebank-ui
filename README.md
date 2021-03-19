# Wiremock UI

## Local Setup

- git clone `ssh://git@gitlab.corp.olacabs.com:2222/shubhendu.m/wiremockui.git`
- `cd wiremockui`
- `npm install`
- Modify `ts/src/config.ts` in case Wiremock details differ from default values
  - `WIREMOCK_HOST`: default value -> localhost
  - `WIREMOCK_PORT`: default value -> 8080
- Run application in development mode using `npm start`
- Navigate to `http://localhost:5000/`
- To deploy in production

  - Build using webpack: `npm run wp`
  - `npm install -g serve`
  - `serve build/`

- Alternative to start UI with standalone wiremock:
  - Build using webpack: `npm run wp`
  - Create a folder `__files` relative to wiremock jar.
  - Copy the `build` folder to `__files` folder.
  - Start wiremock and access the UI using `http://localhost:8080/build/index.html`
