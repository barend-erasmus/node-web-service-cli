# node-web-service-cli
Generate Node.js Web Services (Micro, Macro, API)

## Installlation

`npm install -g web-service-cli`

## Usage

`web-service-cli --help`

`nws-cli --help`

## Options

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --dest, -d      Destination Directory                      [string] [required]
  --gitHubUrl     GitHub Url                                 [string] [required]
  --name, -n      Project Name                               [string] [required]
  --template, -t  Template and Version                       [string] [required]
```

## Example

`web-service-cli --gitHubUrl https://github.com/barend-erasmus/demo-application --name "Demo Application" --template 1.0.0 --dest ./demo-application`