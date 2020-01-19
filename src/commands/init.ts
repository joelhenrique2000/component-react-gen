import { GluegunToolbox } from 'gluegun'

async function askLanguage(toolbox: GluegunToolbox) {
    const askLanguage = {
        type: 'select',
        name: 'language',
        message: 'Which language would you like to use?',
        choices: ['Typescript', 'Modern JavaScript'],
    }

    const { language } = await toolbox.prompt.ask(askLanguage)
    
    if (language === 'Typescript') {
        toolbox.print.success(language)
    } else if (language === "Modern JavaScript") {
        toolbox.print.success(language)
    }
}

async function askStorybook(toolbox: GluegunToolbox) {
    const askStorybook = { type: 'input', name: 'storybook', message: 'You can use Storybook for documentation? (Y/n)' }

    const { storybook } = await toolbox.prompt.ask(askStorybook)

    if (storybook === 'Y' || storybook === 'y') {
        toolbox.print.success(storybook)
    } else if (storybook === 'N' || storybook === 'n') {
        toolbox.print.success(storybook)
    }
}

async function askTesting(toolbox: GluegunToolbox) {
    const askJestTesting = { type: 'input', name: 'testing', message: 'You can use JEst/Enzyme for testing? (Y/n)' }

    const { testing } = await toolbox.prompt.ask(askJestTesting)

    if (testing === 'Y' || testing === 'y') {
        toolbox.print.success(testing)
    } else if (testing === 'N' || testing === 'n') {
        toolbox.print.success(testing)
    }
}
module.exports = {
  name: 'init',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    
    await askLanguage(toolbox);
    await askStorybook(toolbox);
    await askTesting(toolbox);
    
    const aavb = 'joel'

      const {
        parameters,
        template: { generate },
        print: { info }
      } = toolbox
  
      await generate({
        template: 'model.ts.ejs',
        target: `models/${aavb}-model.ts`,
        props: { aavb }
      })


    /////////


       
    /////



    // ask a series of questions
    //const questions = [askAge, askShoe]
    //const { age, shoe } = await toolbox.prompt.ask(questions)
    //toolbox.print.success(age)
    ///toolbox.print.success(shoe)
    /*
    const {
      parameters,
      template: { generate },
      print: { info }
    } = toolbox

    const name = parameters.first

    await generate({
      template: 'model.ts.ejs',
      target: `models/${name}-model.ts`,
      props: { name }
    })

    info(`Generated file at models/${name}-model.ts`)
    */
  }
}
