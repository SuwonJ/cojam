// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import cheerio from 'cheerio';

export class ProbScraper {
    async scrapeProb(url: string) {
        const response = await axios.get(url, { headers: { 'User-Agent': 'YOUR-SERVICE-NAME' } } ).then(response => {
		const html = response.data;
		const $ = cheerio.load(html);
		/*문제 정보들****************************************************************** */
		const probTitle = $('#problem_title').text().trim();
        const probContext = $('#problem_description').text().trim();
		const probInput = $('#problem_input').text().trim();
		const probOutput = $('#problem_output').text().trim();

        console.log(probContext);
		})
    }
}

function isNumber(x: any): x is number {
    return typeof x === "number";
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cojam" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('cojam.getProb', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		var probnum="";
		vscode.window.showInputBox({
			ignoreFocusOut: true,
			placeHolder: '문제 번호를 입력하세요...',
			prompt: ' ',
			value: '2557',
			/* 숫자인지 확인하기
			validateInput: text => {
				return isNumber(text) !== Number ? null : 'Not a Number!';  // return null if validates
			}
			*/
		}).then(text => {
			vscode.window.showInformationMessage(text+'번 문제 불러오는 중...');
			const scraper = new ProbScraper();
    		scraper.scrapeProb("https://www.acmicpc.net/problem/"+text);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
