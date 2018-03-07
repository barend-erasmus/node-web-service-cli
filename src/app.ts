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
    })
        .argv;

    const templateVersion = argv.template.replace(/\./g, '-');

    const displayName = argv.name;

    const projectName = changeCase.paramCase(displayName);

    const gitHubUrl = argv.gitHubUrl;

    const absoluteDirecoryPath = path.join(__dirname, `./../src/templates/version-${templateVersion}`);

    const destinationDirectoryPath = path.normalize(argv.dest);

    const files = await readdir(absoluteDirecoryPath);

    for (const file of files) {

        const contents = fs.readFileSync(file, 'utf8');

        const compiledTemplate = handlebars.compile(contents);

        const model = {
            displayName,
            gitHubUrl,
            projectName,
        };

        const result = compiledTemplate(model);

        const relativePath = path.relative(absoluteDirecoryPath, file);

        const destinationFilePath: string = path.join(destinationDirectoryPath, relativePath);

        const destinationFileDirectoryPath: string = path.dirname(destinationFilePath);

        if (!fs.existsSync(destinationFileDirectoryPath)) {
            mkdirp.sync(destinationFileDirectoryPath);
        }

        fs.writeFileSync(destinationFilePath, result);
    }
})();
