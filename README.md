# Mountebank UI

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
  - Build using webpack: `npm run build`
  - `npm install -g serve`
  - `serve build/`


## Screenshots
<img width="1792" alt="1" src="https://user-images.githubusercontent.com/10685907/111806656-36f19100-88f8-11eb-89f9-f51510d5c21f.png">
<img width="1792" alt="2" src="https://user-images.githubusercontent.com/10685907/111806664-38bb5480-88f8-11eb-81b1-ba53887a8e8f.png">
<img width="1792" alt="3" src="https://user-images.githubusercontent.com/10685907/111806667-3a851800-88f8-11eb-82dd-5a227c71f2fb.png">
<img width="1792" alt="4" src="https://user-images.githubusercontent.com/10685907/111806675-3bb64500-88f8-11eb-9609-6d35d0a1beed.png">
