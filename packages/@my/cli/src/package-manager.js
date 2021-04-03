const execa = require('execa');
const executeCommand = require('./utils/execute-command');

const toolCommands = {
	yarn: {
		install: ['install'],
	},
	npm: {
		install: ['install'],
	},
	pnpm: {
		install: ['install'],
	},
};

class PackageManager {
	constructor(context, tool) {
		this.context = context;
		this.tool = tool;
	}

	async install() {
		console.log('🧶 下载依赖中...');
		// console.log(this.tool, toolCommands[this.tool]['install'], this.context);
		await executeCommand(
			this.tool,
			toolCommands[this.tool]['install'],
			this.context
		);
	}
}

module.exports = PackageManager;
