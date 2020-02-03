#!/usr/bin/env node
const ora = require('ora');

const { red } = require('ansi-colors');
const program = require('commander');
const package = require('./package.json');
const jetpack = require('fs-jetpack');
const { directoryExists } = require('./lib/helpers/files')
const { generateUTF8 } = require('./lib/helpers/template')
program.version(package.version);
const inquirer = require('./lib/inquirer/inquirer');
var join = require('path').join;

function generate(name, callback) {
    spinner = ora(`Creating ${name}`).start();
    callback();
    spinner.succeed(`Created ${name}`)
}

program
    .command('init <name>')
    .alias('i')
    .description('Adiciona um to-do')
    .action(async (name) => {

        // create an folder main of project
        jetpack.dir(name, { empty: true, mode: '700' });

        if (directoryExists(name)) {

            // Creating folders and files main
            try {
                const nameOpts = await inquirer.askName();
                const languageOpts = await inquirer.askLanguage();
                const testingOpts = await inquirer.askTesting();
                const storiesOpts = await inquirer.askStories();
                let spinner;

                generate('package.json', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'package.json.ejs'),
                    dest: join(__dirname, name + '/' + 'package.json'),
                    data: {
                        name: nameOpts.option,
                        testing: testingOpts.option,
                        stories: storiesOpts.option,
                        language: languageOpts.option ? 'typescript' : 'javascript'
                    }
                }))

                generate('.babelrc', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', '.babelrc-ts.ejs'),
                    dest: join(__dirname, name + '/' + '.babelrc')
                }));

                if (languageOpts.option) {
                    generate('tsconfig.json', generateUTF8({
                        template: join(__dirname, 'lib', 'templates', 'tsconfig.json.ejs'),
                        dest: join(__dirname, name + '/' + 'tsconfig.json')
                    }));
                }

                if (testingOpts.option) {
                    generate('setupTests.ts', generateUTF8({
                        template: join(__dirname, 'lib', 'templates', 'setupTests.ts.ejs'),
                        dest: join(__dirname, name + '/' + 'setupTests.ts')
                    }));
                }

                generate('rollup.config.js', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'rollup.config.js.ejs'),
                    dest: join(__dirname, name + '/' + 'rollup.config.js'),
                    data: {
                        typescript: languageOpts.option
                    }
                }));

                generate('LICENSE', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'LICENSE.ejs'),
                    dest: join(__dirname, name + '/' + 'LICENSE'),
                    data: {
                        name: nameOpts.option,
                    }
                }));

                if (testingOpts.option) {
                    generate('jest.config.js', generateUTF8({
                        template: join(__dirname, 'lib', 'templates', 'jest.config.js.ejs'),
                        dest: join(__dirname, name + '/' + 'jest.config.js')
                    }));
                }

                if (testingOpts.option) {
                    generate('fileTransformer.js', generateUTF8({
                        template: join(__dirname, 'lib', 'templates', 'fileTransformer.js.ejs'),
                        dest: join(__dirname, name + '/' + 'fileTransformer.js')
                    }));
                }

                // create an folder of tests
                spinner = ora('Creating folder __tests__').start();
                jetpack.dir(name + '/__tests__', { empty: true, mode: '700' });
                spinner.succeed('Created folder __tests__')

                // create an folder of .storybook
                generate('packagon', generateU);
                if (storiesOpts.option) {
                    spinner = ora('Creating folder .storybook').start();
                    jetpack.dir(name + '/.storybook', { empty: true, mode: '700' });
                    spinner.succeed('Created folder .storybook')
                }

                if (storiesOpts.option) {
                    generate('.storybook/config.js', generateUTF8({
                        template: join(__dirname, 'lib', 'templates', 'config.js.ejs'),
                        dest: join(__dirname, name, '.storybook', 'config.js')
                    }));
                }

                // Create folder src
                spinner = ora('Creating folder src').start();
                jetpack.dir(name + '/src', { empty: true, mode: '700' });
                spinner.succeed('Created folder src')

                // Create folder component in src/
                spinner = ora('Creating folder component').start();
                jetpack.dir(name + '/src/component', { empty: true, mode: '700' });
                spinner.succeed('Created folder component')

                /**
                 * Component example \/
                 */

                generate('component/interfaces.ts', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'interfaces.ts.ejs'),
                    dest: join(__dirname, name, 'src', 'interfaces.ts')
                }));

                // Create photo.jpg for component example in folder src
                spinner = ora('Creating file photo.jpg').start();
                jetpack.copy(join(__dirname, 'lib', 'templates', 'photo.jpg'), join(__dirname, name, 'src', 'assets', 'photo.jpg'), { overwrite: true });
                spinner.succeed('Created file photo.jpg')

                generate('src/index.js', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'index.js.ejs'),
                    dest: join(__dirname, name, 'src', 'index.js')
                }));

                // Create folder Card in src/component/
                spinner = ora('Creating folder Card').start();
                jetpack.dir(name + '/src/component/Card', { empty: true, mode: '700' });
                spinner.succeed('Created folder Card')

                generate('component/Card/card.test.tsx', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'card.test.tsx.ejs'),
                    dest: join(__dirname, name, 'src', 'component', 'Card', 'card.test.tsx')
                }));

                generate('component/Card/Card.tsx', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'Card.tsx.ejs'),
                    dest: join(__dirname, name, 'src', 'component', 'Card', 'Card.tsx')
                }));

                generate('component/Card/index.stories.js', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'index.stories.js.ejs'),
                    dest: join(__dirname, name, 'src', 'component', 'Card', 'index.stories.js')
                }));

                generate('component/Card/styles.css', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'styles.css.ejs'),
                    dest: join(__dirname, name, 'src', 'component', 'Card', 'styles.css')
                }));

                generate('component/Card/styles.scss', generateUTF8({
                    template: join(__dirname, 'lib', 'templates', 'styles.scss.ejs'),
                    dest: join(__dirname, name, 'src', 'component', 'Card', 'styles.scss')
                }));

            } catch (error) {
                console.log(error)
                return
            }















            //jetpack.file(name + '/' + 'something.txt');

            //jetpack.dir(name).dir('src').dir('assets')


        } else {

        }


    });


program
    .command('component <name>')
    .alias('c')
    .description('Adiciona um to-do')
    .action((name) => {
        console.log(name);
    });

program
    .command('component <name>')
    .alias('c')
    .description('Adiciona um to-do')
    .action((name) => {
        console.log(name);
    });

program.parse(process.argv);