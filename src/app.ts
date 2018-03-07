import * as yargs from 'yargs';
import * as readdir from 'recursive-readdir';
import * as changeCase from 'change-case';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

(async () => {
    const argv = yargs
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

    const absolutePath = path.join(__dirname, `./../src/templates/version-${templateVersion}`);

    const destinationPath = path.normalize(`D:/git/barend-erasmus/node-web-service-cli`);

    const files = await readdir(absolutePath);

    for (const file of files) {

        const contents = fs.readFileSync(file, 'utf8');

        const compiledTemplate = handlebars.compile(contents);

        const model = {
            displayName,
            gitHubUrl,
            projectName,
        };

        const result = compiledTemplate(model);

        const relativePath = path.relative(absolutePath, file);

        console.log(path.join(destinationPath, relativePath));

        // fs.writeFileSync(path.join(destinationPath, relativePath), result);
    }
})();