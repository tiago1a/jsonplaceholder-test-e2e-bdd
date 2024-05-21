const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      
      // Adiciona o reporter mochawesome
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    screenshots: true,
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
    screenshotsPath: 'cypress/screenshots',
  },
  defaultCommandTimeout: 10000, // timeout para 10 segundos
  trashAssetsBeforeRuns: true,
  video: false,
  exit: true
});
