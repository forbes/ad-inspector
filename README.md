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
- [Charles](https://www.charlesproxy.com/)

## Installation
`npm install`

## Development
This project runs a simple http server that watches for changes to your JS/CSS files.

To start the server:
`npm run start`

Assuming you have no errors, you should be able to see your files on your local host (http://127.0.0.1:8080/).

See proxied changes at https://forbes.github.io/ad-inspector/src/loader.js.

## Charles Setup
This used to be a straight-forward process, but our migration to HTTPS has complicated things.

### Add Charles root certificate and trust it
The OS X section of their documentation:

> In Charles go to the Help menu and choose "SSL Proxying > Install Charles Root Certificate". Keychain Access will open. Find the "Charles Proxy..." entry, and double-click to get info on it. Expand the "Trust" section, and beside "When using this certificate" change it from "Use System Defaults" to "Always Trust". Then close the certificate info window, and you will be prompted for your Administrator password to update the system trust settings.

Windows users should check out the [page](https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/) for your solution.

### Set up HTTPS Proxy
1. Click Proxy >> SSL Proxy Settings...
2. Click Enable SSL Proxying
3. Click Add
4. Enter the following for the fields in this dialog
    - *Host:* forbes.github.io
    - *Port:* 443
5. Click OK

### Map the Github assets to your local server
1. Click Tools >> Map Remote
2. Click Enable Map Remote
3. Click Add
4. Enter the following for the fields in this dialog
    - Map From
      - *Protocol:* https
      - *Host:* forbes.github.io
      - *Port:*
      - *Path:* ad-inspector/src/*
      - *Query:*
    - Map To
      - *Protocol:* http
      - *Host:* 127.0.0.1
      - *Port:* 8080
      - *Path:* /
      - *Query:*
    - Preserve Host Header (Leave unchecked)

## Additional Information
This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Contributors
* **Anthony Giallella** - ajg723@gmail.com
* **Johnny McCampbell** - jmccampbell@forbes.com
* **Johnny McCampbell** - jmccampbell@forbes.com
* **Alexander Shnayderman** - ashnayderman@forbes.com
* **Anne Zhou** - azhou@forbes.com
