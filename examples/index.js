
const exampleToRun = process.argv[2];
const errorMessage = `Run one of the examples with "npm run start:example [discography]"`;

const printErrorMessage = () => {
  console.error(errorMessage)
  process.exit(1)
}

if (!exampleToRun) {
  printErrorMessage();
}

switch (exampleToRun) {
  case "discography":
    require('./discography');
    return;
  case "pets":
    require('./pets');
    return;
  default:
    printErrorMessage();
}