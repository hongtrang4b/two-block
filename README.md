<h1 align="center">Renault RLink </h1>

<br>

00. <a href="#techspec">Technical Specifications</a>
00. <a href="#readme">Readme</a>
00. <a href="#dependencies">Dependencies</a>
00. <a href="#quick-start">Quick Start</a>
00. <a href="#windows-user-note">Windows Users note</a>
00. <a href="#grunt-tasks">Grunt tasks</a>
00. <a href="#i18n">i18n</a>
00. <a href="#contributing">Contributing</a>
00. <a href="#vendors">Vendors</a>

<h2 id="techspec">Technical Specifications</h2>
Read the [Technical Specifications about Rlink](https://github.digitas.fr/renault/renault-rlink/blob/master/SPECTECH.md) file.


<h2 id="readme">Readme</h2>
Read the [Made Bootstrap readme](https://github.digitas.fr/html/docs/blob/master/globals/CONTRIBUTING.md) file.

<h2 id="dependencies">Dependencies</h2>

```bash
sudo npm i -g grunt-cli bower nodemon
```

<h2 id="quick-start">Quick Start</h2>

```bash
npm install
grunt start # install deps + grunts + runs the server + watches server files + watches assets files exluding vendors and media
```

<h2 id="windows-user">!Windows Users note</h2>

If you want to run "imagemin" on your project from windows:
- Download jpegtran.exe from [jpegclub.org](http://jpegclub.org/jpegtran/)
- Copy it to node-modules/grunt-contrib-imagemin/node_modules/jpegtran-bin/vendor

<h2 id="grunt-tasks">Grunt tasks</h2>

- `grunt` builds the project
- `grunt server` runs the server
- `grunt start` builds the project and runs the server
- `grunt optimize` builds the optimized version of the project
- `grunt deploy` deploys the optimized version of the project
- `grunt release:TYPE` bumps up the version and creates a tag on github.
`TYPE` can be either `patch` or `minor` or `major`.

<h2 id="i18n">i18n</h2>

- The project language can be set by changing the `preferredLanguage` in the `package.json` file.
- When writing jade templates, extract the texts in the `app/i18n/*.json` files.
Then use `locals.i18n.myKey` from inside the jade files.
- Make sure to copy the key:value you added in all the `json` files.

<h2 id="contributing">Contributing</h2>

- Read the project's [contribution guidelines](https://github.digitas.fr/html/docs/blob/master/globals/CONTRIBUTING.md)
- Read our front-end [code standards](https://github.digitas.fr/html/code-standards)

<h2 id="vendors">Vendors</h2>
Vendors are listed in the `bower.json` file
