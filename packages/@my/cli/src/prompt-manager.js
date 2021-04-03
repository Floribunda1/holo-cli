class PromptManager {
	constructor() {
		this.featurePrompt = {
			type: 'checkbox',
			name: 'features',
			message: '🎉 请选择需要添加哪些特性',
			choices: [],
			pageSize: 10,
		};
		// 插件注入的交互
		this.injectedPrompts = [];
		// packageManager 选项
		this.packagePrompt = {
			type: 'list',
			name: 'packageManager',
			message: '选择什么来管理软件包',
			choices: ['npm', 'yarn', 'pnpm'],
		};
	}

	getPrompts() {
		return [this.featurePrompt, ...this.injectedPrompts, this.packagePrompt];
	}
}

module.exports = PromptManager;
