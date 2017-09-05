module.exports = ( plop ) => {
  plop.setGenerator('component', {
    description: 'Creates an a-frame component',

    prompts: [{
      type: 'input',
      name: 'tagName',
      message: 'tag name:',
    }],

    actions: [{
      type: 'add',
      path: 'src/components/{{kebabCase tagName}}.js',
      templateFile: 'plop-templates/component.js',
    }],
  }); // component
};
