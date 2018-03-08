# node-web-service-cli
Generate Node.js Web Services (Micro, Macro, API)

## Installlation

`npm install -g web-service-cli`

## Usage

`web-service-cli generate --help`

`web-service-cli lint --help`

`nws-cli generate --help`

`nws-cli lint --help`

## Lint 

### Options

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --directory, -d Directory                                 [string] [required]
```

### Example

`web-service-cli lint --directory ./`

## Generate 

### Options

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --dest, -d      Destination Directory                      [string] [required]
  --gitHubUrl     GitHub Url                                 [string] [required]
  --name, -n      Project Name                               [string] [required]
  --template, -t  Template and Version                       [string] [required]
```

### Example

`web-service-cli generate --gitHubUrl https://github.com/barend-erasmus/demo-application --name "Demo Application" --template 1.0.0 --dest ./demo-application`