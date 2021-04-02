class PromptManager {
  constructor() {
    this.featurePrompt = {
      type: 'checkbox',
      name: 'features',
      message: '🎉 请选择需要添加哪些特性',
      choices: [],
    };
    this.injectedPrompts = [];
  }

  getPrompts() {
    return [this.featurePrompt, ...this.injectedPrompts];
  }
}

module.exports = PromptManager;
