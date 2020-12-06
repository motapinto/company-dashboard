import commandLineArgs from 'command-line-args';

const optionDefinitions = [
  {name: 'source', alias: 's', type: String, defaultValue: 'saft.xml'}
]

const options = commandLineArgs(optionDefinitions);
console.log(options);
export default options;