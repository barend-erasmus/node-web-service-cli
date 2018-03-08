import chalk from 'chalk';
import * as changeCase from 'change-case';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as readdir from 'recursive-readdir';
import * as tslint from 'tslint';
import * as yargs from 'yargs';

(async () => {
    const argv = yargs.argv;

    if (argv._[0] === 'lint') {
        await lint();
    } else if (argv._[0] === 'generate') {
        await generate();
    }
})();

async function lint(): Promise<void> {
    const argv = yargs
        .option('directory', {
            alias: 'd',
            description: 'Directory',
            required: true,
            type: 'string',
        }).argv;

    const directoryPath: string = path.normalize(argv.directory);

    const linter: tslint.Linter = new tslint.Linter({
        fix: false,
    });

    const configuration = tslint.Configuration.findConfiguration(path.join(__dirname, './../tslint.json')).results;

    const files: string[] = await readdir(directoryPath);

    console.log(chalk.cyan(`Found ${files.length} Files.`));

    for (const file of files) {

        if (path.extname(file) !== '.ts') {
            continue;
        }

        if (file.indexOf('node_modules') > -1) {
            continue;
        }

        const contents: string = fs.readFileSync(file, 'utf8');

        linter.lint(file, contents, configuration);
    }

    const result = linter.getResult();

    if (result.warningCount) {
        console.log(chalk.yellow(`${linter.getResult().warningCount} Warnings Found.`));
    }

    if (result.errorCount) {
        console.log(chalk.red(`${linter.getResult().errorCount} Errors Found.`));
    }

    if (!result.warningCount && !result.errorCount) {
        console.log(chalk.green(`No Errors Found`));
    }

    console.log(chalk.magenta(result.output));
}

async function generate(): Promise<void> {
    const argv = yargs
        .option('dest', {
            alias: 'd',
            description: 'Destination Directory',
            required: true,
            type: 'string',
        })
        .option('gitHubUrl', {
            description: 'GitHub Url',
            required: true,
            type: 'string',
        })
        .option('name', {
            alias: 'n',
            description: 'Project Name',
            required: true,
            type: 'string',
        })
        .option('template', {
            alias: 't',
            description: 'Template and Version',
            required: true,
            type: 'string',
        }).argv;

    const templateVersion: string = argv.template.replace(/\./g, '-');

    const displayName: string = argv.name;

    const projectName: string = changeCase.paramCase(displayName);

    const gitHubUrl: string = argv.gitHubUrl;

    const absoluteDirectoryPath: string = path.join(__dirname, `./../src/templates/version-${templateVersion}`);

    const destinationDirectoryPath: string = path.normalize(argv.dest);

    console.log(chalk.white(`Creating project...`));
    console.log(chalk.white(`    Github Url: ${gitHubUrl}`));
    console.log(chalk.white(`    Project Name: ${displayName} (${projectName})`));
    console.log(chalk.white(`    Template: ${templateVersion}`));

    const files: string[] = await readdir(absoluteDirectoryPath);

    console.log(chalk.cyan(`Template Contains ${files.length} Files.`));

    for (const file of files) {

        const contents: string = fs.readFileSync(file, 'utf8');

        const compiledTemplate: (model: any) => string = handlebars.compile(contents);

        const model: any = {
            displayName,
            gitHubUrl,
            projectName,
        };

        const result: string = compiledTemplate(model);

        const relativePath: string = path.relative(absoluteDirectoryPath, file);

        const destinationFilePath: string = path.join(destinationDirectoryPath, relativePath);

        const destinationFileDirectoryPath: string = path.dirname(destinationFilePath);

        if (!fs.existsSync(destinationFileDirectoryPath)) {
            mkdirp.sync(destinationFileDirectoryPath);
            console.log(chalk.magenta(`Created Directory: ${destinationFileDirectoryPath}`));
        }

        fs.writeFileSync(destinationFilePath, result);
        console.log(chalk.magenta(`Created File: ${destinationFilePath}`));
    }

    console.log(chalk.green(`Successfully created project.`));
}
