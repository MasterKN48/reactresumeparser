<img src="client/public/logo192.png" height="64"  />

## Resume Parser

[![PyPI status](https://img.shields.io/pypi/status/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/) [![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/MasterKN48/reactresumeparser)

`A small app for resume parser and save data as csv file. This small app uses react context Api and hooks for basic state management. At back-end it uses express.js with npm library- pdf parser for parsing pdf. After parsing it find various aspect like number of lines by calculating number of `\n`,number of charactes, find font and fontSize (by using built in library method), extract social media accounts, name, email, phone no, skills, languages, experience, education if these data is available in uploaded resume. Only pdf document suppoted. It uses material ui in react app. `

### How to run locally?

```bash
1. git clone https://github.com/MasterKN48/reactresumeparser
2. cd reactresumeparser
3. touch .env # see .env format below
4. yarn # or npm i
5. cd client
6. yarn # or npm i
7. yarn start # or npm start 
# react app uses proxy on http://localhost:8000 in client/package.json
# make sure to change it as backend server port before react app start
# another terminal of root of clone repo.
8. yarn dev # or npm run dev
# start server on expected port

```

`.env` should be like this

```markdown
PORT=<PORT NO>
NODE_ENV=development
```

#### API

| API             | REQUEST                 | RESPONSE                                               | DESCRIPTION                                 |
| --------------- | ----------------------- | ------------------------------------------------------ | ------------------------------------------- |
| GET /api        | --                      | Ping Pong                                              | It is just test to check server is running. |
| POST /api/parse | formData {resume: file} | {totalLines, totalChars,<br/> name, email, phone, ...} | It return parsed resume data as JSON.       |
|                 |                         |                                                        |                                             |

NOTE: `Production build will not work on heroku free tier need paid version to handle file upload and storage.`

[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](http://ForTheBadge.com) [![ForTheBadge uses-html](http://ForTheBadge.com/images/badges/uses-html.svg)](http://ForTheBadge.com) [![ForTheBadge uses-css](http://ForTheBadge.com/images/badges/uses-css.svg)](http://ForTheBadge.com) 

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/MasterKN48/)