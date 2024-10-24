const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Input file path')
  .option('-o, --output <path>', 'Output file path')
  .option('-d, --display', 'Display result in console')
  .parse(process.argv);

const options = program.opts();

//перевірочка
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

try {
  //синхронне читання і далі ми створюємо об'єкт джейсона в консту
  const data = fs.readFileSync(options.input, 'utf8');
  const jsonData = JSON.parse(data);

  /* фільтр по моєму варіанту (з джейсона вибираються варіанти з цими значеннями і потім мапом вибираються лише знач. value і створюється масив з тільки цими значеннями)*/
  const filteredData = jsonData
    .filter(item => item.ku === "13" && item.value > 5)
    .map(item => item.value);

  
  if (options.display) {
    console.log('Filtered values:', filteredData.join('\n'));
  }

  if (options.output) {
    fs.writeFileSync(options.output, filteredData.join('\n'), 'utf8');              //синхронно записуємо в масив ....... .join('\n') для об'єднання в один рядок з роздільником
    console.log(`Filtered values have been written to ${options.output}`);
  }
} catch (err) {
  console.error('Error processing the file:', err.message);
  process.exit(1);
}
