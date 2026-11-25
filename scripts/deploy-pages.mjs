import { rename, rm, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const clientDir = path.join(root, 'dist', 'client');
const generatedConfig = path.join(clientDir, 'wrangler.json');
const generatedBackup = path.join(clientDir, 'wrangler.json.bak');
const deployRedirect = path.join(root, '.wrangler', 'deploy', 'config.json');

async function exists(file) {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
}

/** Prefer PR head branch, then push ref; local runs target production (`master`). */
function deployBranch() {
	return process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'master';
}

async function run() {
	if (await exists(deployRedirect)) {
		await rm(deployRedirect, { force: true });
	}

	let moved = false;
	if (await exists(generatedConfig)) {
		await rename(generatedConfig, generatedBackup);
		moved = true;
	}

	const branch = deployBranch();

	try {
		const code = await new Promise((resolve) => {
			const child = spawn(
				'npx',
				[
					'wrangler',
					'pages',
					'deploy',
					'dist/client',
					'--project-name=sidesofnav',
					`--branch=${branch}`,
					'--commit-dirty=true',
				],
				{ stdio: 'inherit', shell: true, cwd: root },
			);
			child.on('exit', (exitCode) => resolve(exitCode ?? 1));
		});
		process.exitCode = code;
	} finally {
		if (moved && (await exists(generatedBackup))) {
			await rename(generatedBackup, generatedConfig);
		}
	}
}

run();
