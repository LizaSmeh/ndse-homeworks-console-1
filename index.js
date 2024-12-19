#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const getCurrentDateTime = () => {
    return new Date().toISOString();
}

const getCurrentYear = () => {
    return new Date().getFullYear();
}

const getCurrentMonth = () => {
    return new Date().getMonth() + 1;
}

const getCurrentDay = () => {
    return new Date().getDate();
}

function addSubtractTime (el, {day = 0, month = 0}) {
    const currentDate = new Date();
    if (el === 'add') {
        currentDate.setDate(currentDate.getDate() + day);
        currentDate.setMonth(currentDate.getMonth() + month);
    } else if (el === 'sub') {
        currentDate.setDate(currentDate.getDate() - day);
        currentDate.setMonth(currentDate.getMonth() - month);
    } else {
        return 'not a valid command'
    }

    return currentDate.toISOString();
}

const argv = yargs(hideBin(process.argv))
  .command("current", "Get the current date and time in ISO format", (yargs) => {
    return yargs
    .options("year", {
      alias: "y",
      describe: "Get the current year",
      type: "boolean",
    })
    .options("month", {
      alias: "m",
      describe: "Get the current month",
      type: "boolean",
    })
    .options("date", {
      alias: "d",
      describe: "Get the current date",
      type: "boolean",
    });
  }, (argv) => {
    if (argv.year) {
        console.log(getCurrentYear());
      } else if (argv.month) {
        console.log(getCurrentMonth());
      } else if (argv.date) {
        console.log(getCurrentDay());
      } else {
        console.log(getCurrentDateTime());
      }
  })
  .command("add",
    "Add time to current date and time",
    (yargs) => {
      return yargs
        .options("day", {
          alias: "d",
          describe: "Number of days to add",
          type: "number",
        })
        .options("month", {
          alias: "m",
          describe: "Number of months to add",
          type: "number",
        });
    },
    (argv) => {
      const { day, month } = argv;
      console.log(addSubtractTime("add", { day, month }));
    })
    .command("sub",
    "Subtract time from current date and time",
    (yargs) => {
      return yargs
        .options("day", {
          alias: "d",
          describe: "Number of days to subtract",
          type: "number",
        })
        .options("month", {
          alias: "m",
          describe: "Number of months to subtract",
          type: "number",
        });
    },
    (argv) => {
      const { day, month } = argv;
      console.log(addSubtractTime("sub", { day, month }));
    })
    .help().argv;