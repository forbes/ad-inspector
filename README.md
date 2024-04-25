<img src="src/images/forbes_logo.svg" alt="Forbes Logo" width="" height="35">

# Ad Inspector

Introducing the Forbes Ad Inspector, an innovative tool crafted by the Forbes engineering team to simplify the complexities of digital ad targeting. This cutting-edge bookmarklet utilizes the Google Publisher Tag (GPT) API  to illuminate ad units and their associated targeting on web pages.

Developed by the Forbes engineering team, this tool empowers Product, QA/Dev, BI, and Ad Operations teams to efficiently conduct QA, create new ad slots, verify targeting, and ensure accurate reporting. It serves as an excellent solution for both technical and non-technical users alike. For more detailed information, read our [official article](https://www.forbes.com/sites/forbesproductgroup/2018/01/10/introducing-ad-inspector-our-open-source-ad-inspection-tool/?sh=3cebc50c709f) on Forbes.

* [Dev Requirements](#dev-requirements)
* [Installation](#installation)
* [Development](#development)
* [Chrome Extension For Local Development](#Chrome-Extension)
* [Charles Setup](#charles-setup)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Dev Requirements
- [Node] v20.11.1
- A proxy server like [Charles](https://www.charlesproxy.com/)

## Installation
`nvm use`

`npm install`

## Development
This project runs a simple http server that watches for changes to your JS/CSS files.

Start by building the project:
`npm run build`

To watch changes made to files:
`npm run watch`

To start the server:
`npm run start`

Assuming you have no errors, you should be able to see your files on your local host (http://127.0.0.1:8080/).

## Chrome Extension

To add extension to chrome for local development:
- After your changes, run `npm run build`
- Once the build file is finished (loader.js) 
- Navigate to `chrome://extensions/` in chrome browser
- Select 'Load Unpacked'
- Select `src` folder of Ad Inspector project, extension will be added to chrome

## Charles Setup
See Charles setup instructions [here](https://github.com/forbes/ad-inspector/wiki/Charles-Setup)

## Additional Information
This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Support
For any questions or support, please contact our ADS team.

## Contributors
* **Anthony Giallella** - ajg723@gmail.com
* **Johnny McCampbell** - jmccampbell@forbes.com
* **Ben Harrigan** - bharrigan@forbes.com
* **Alexander Shnayderman** - ashnayderman@forbes.com
* **Anne Zhou** - azhou@forbes.com
* **Aaron Romel** - aromel@forbes.com
* **Anastasiia Soktoeva** - asoktoeva@forbes.com
