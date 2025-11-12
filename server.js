#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    pageLoadTimeout: 1 * 2000,
    chromeLocation: '/usr/bin/chromium-browser',
    /*
    chromeFlags: [
        '--disable-extensions',
        '--no-sandbox',
        '--headless=new',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--hide-scrollbars',
        '--remote-debugging-port=9222',
        '--skip-js-errors',
        '--disable-dev-shm-usage',
        '--enable-logging',
        '--v=1'
    ],
     */
    workers: 4,
    forwardHeaders: true,
    logRequests: true,
    logErrors: true
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
