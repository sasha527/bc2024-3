const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .option('-i, --input <path>', 'Input file path')
  .option('-o, --output <path>', 'Output file path')
  .option('-d, --display', 'Display result in console')
  .parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.log('Please, specify input file');
  process.exit(1);
}

try {
  const data = fs.readFileSync(options.input, 'utf8');
  let jsonData;

  try {
    jsonData = JSON.parse(data);
  } catch (jsonError) {
    console.error('Invalid JSON format in input file');
    process.exit(1);
  }

  const filteredData = [];
  for (let i = 0; i < jsonData.length; i++) {
    const item = jsonData[i];
    if (item.ku === "13" && item.value > 5) {
      filteredData.push(item.value);
    }
  }

  if (options.display) {
    console.log('Filtered values:', filteredData.join('\n'));
  }

  if (options.output) {
    fs.writeFileSync(options.output, filteredData.join('\n'), 'utf8');
    console.log(`Filtered values have been written to ${options.output}`);
  }
} catch (err) {
  console.error('Error processing the file:', err.message);
  process.exit(1);
}