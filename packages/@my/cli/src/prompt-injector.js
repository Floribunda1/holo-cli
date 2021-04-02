class PromptInjector {
  constructor(promptManager) {
    this.promptManager = promptManager;
  }

  injectFeature(feature) {
    this.promptManager.featurePrompt.choices.push(feature);
  }

  injectPrompt(prompt) {
    this.promptManager.injectedPrompts.push(prompt);
  }
}

module.exports = PromptInjector