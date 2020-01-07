import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'component-react-gen',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  }
}

module.exports = command
