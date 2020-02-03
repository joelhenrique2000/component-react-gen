const inquirer = require('inquirer');

module.exports = {
    askName: () => {
        const questions = [
            {
                name: 'option',
                type: 'input',
                message: 'What is your name author:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your name.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askLanguage: () => {
        const questions = [
            {
                name: 'option',
                type: 'confirm',
                message: 'Do you want to use typescript?'
            }
        ];
        return inquirer.prompt(questions);
    },
    askTesting: () => {
        const questions = [
            {
                name: 'option',
                type: 'confirm',
                message: 'Do you want to use Storybook?'
            }
        ];
        return inquirer.prompt(questions);
    },
    askStories: () => {
        const questions = [
            {
                name: 'option',
                type: 'confirm',
                message: 'Do you want to use Jest and Enzyme (for testing)?'
              }
        ];
        return inquirer.prompt(questions);
    }
};