const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Input file path') // обов'язковий параметр
  .option('-o, --output <path>', 'Output file path') // необов'язковий параметр
  .option('-d, --display', 'Display result in console') // необов'язковий параметр
  .parse(process.argv);

const options = program.opts();

// Перевірка наявності обов'язкового параметру -i (input)
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

try {
  // Читання вмісту файлу
  const data = fs.readFileSync(options.input, 'utf8');
  const jsonData = JSON.parse(data);

  // Фільтрація даних
  const filteredData = jsonData
    .filter(item => item.ku === "13" && item.value > 5)
    .map(item => item.value);

  // Виведення результатів, якщо вказано параметр -d
  if (options.display) {
    console.log('Filtered values:', filteredData.join('\n'));
  }

  // Запис у файл, якщо вказано параметр -o
  if (options.output) {
    fs.writeFileSync(options.output, filteredData.join('\n'), 'utf8');
    console.log(`Filtered values have been written to ${options.output}`);
  }
} catch (err) {
  console.error('Error processing the file:', err.message);
  process.exit(1);
}