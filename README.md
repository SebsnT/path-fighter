# PathFighter

PathFighter is a free Pathfighter 2e (second edition) encounter builder designed for dungeon masters to quickly create encounters for their games.

This tool is heavily inspired by https://github.com/maxiride/pf2e-encounters. So check out his work and project.

The data for this project was gatherd using this tool:
https://github.com/LukeHagar/archives-of-nethys-scraper

## Features

- Allows dynamic party sizes and levels
- Encounter difficulty indicator
- Links to all [Archives of Nethys](https://2e.aonprd.com) content used.
- JSON export / import 
- PDF export

## Legal Information

This tool and the associated website uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Fan Content Policy [paizo.com/licenses/fancontent]([https://paizo.com/licenses/fancontent]). We are expressly prohibited from charging you to use or access this content. This tool and the associated website is not published, endorsed, or specifically approved by Paizo nor Archives of Nethys. For more information about Paizo Inc. and Paizo products, visit [paizo.com](https://paizo.com).

Link to the open gaming license:
https://opengamingfoundation.org/ogl.html

As this uses all creature releated material from pathfinder 2e (second edition) present on archives of nethys please refer to their sources:

https://2e.aonprd.com/Sources.aspx

## Donations

If you like my work, support me with a small donation on my "buy me a coffee". Coffee is the energy on which this project is build upon :)

  <a href="https://www.buymeacoffee.com/SebsnT" target="_blank"
    ><img
      src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png"
      alt="Buy Me A Coffee"
      style="max-width: 200px !important"
  /></a>


## Local Development

This tool and the associated website are build with [Nuxt 3](https://nuxt.com).

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

If you want to run purely local then:

1. change from "loadCreaturesFromRemote" to "loadCreaturesFromLocal" in the loadCreatures.ts file.

2. Run "prepare_data" python script to generate

Now with these steps you have a local version of the data and you can safely start the application.

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```
