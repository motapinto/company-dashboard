import commandLineArgs from 'command-line-args';

const optionDefinitions = [
  {name: 'source', alias: 's', type: String}
]

const options = commandLineArgs(optionDefinitions);
export default options;