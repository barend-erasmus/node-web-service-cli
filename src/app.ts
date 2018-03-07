import chalk from 'chalk';
import * as changeCase from 'change-case';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as readdir from 'recursive-readdir';
import * as yargs from 'yargs';

(async () => {
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

    console.log(chalk.cyan(`Template contains ${files.length} files.`));

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
            // mkdirp.sync(destinationFileDirectoryPath);
            console.log(chalk.blue(`Created directory: ${destinationFileDirectoryPath}`));
        }

        // fs.writeFileSync(destinationFilePath, result);
        console.log(chalk.blue(`Created file: ${destinationFilePath}`));
    }

    console.log(chalk.green(`Successfully created project.`));
})();
