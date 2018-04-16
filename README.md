# Forbes Ad Inspector

A bookmarklet for monitoring GPT ad units and their associated targeting on web pages.

* [Dev Requirements](#dev-requirements)
* [Installation](#installation)
* [Development](#development)
* [Charles Setup](#charles-setup)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Dev Requirements
- [Node](https://nodejs.org/en/)
- A proxy server like [Charles](https://www.charlesproxy.com/)

## Installation
`npm install`

## Development
This project runs a simple http server that watches for changes to your JS/CSS files.

Start by building the project:
`npm run build`

To watch changes made to files:
`npm run

To start the server:
`npm run start`

Assuming you have no errors, you should be able to see your files on your local host (http://127.0.0.1:8080/).

To add chrome extension for local development:
- Navigate to `chrome://extensions/` in chrome browser
- Select 'Load Unpacked'
- Select `src` folder of Ad Inspector project, extension will be added to chrome

## Charles Setup
See Charles setup instructions [here](https://github.com/forbes/ad-inspector/wiki/Charles-Setup)

## Additional Information
This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Contributors
* **Anthony Giallella** - ajg723@gmail.com
* **Johnny McCampbell** - jmccampbell@forbes.com
* **Ben Harrigan** - bharrigan@forbes.com
* **Alexander Shnayderman** - ashnayderman@forbes.com
* **Anne Zhou** - azhou@forbes.com
* **Aaron ROmel** - aromel@forbes.com
