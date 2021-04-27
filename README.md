# ClientesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Instalar Node.js
> https://nodejs.org/es/download/

- Despues de instalar Node.js, instalar el cliente de Angular
````
npm install -g @angular/cli
````

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

------

###Solucion de errores

- *No se puede cargar el archivo, no está firmado digitalmente*
  - Abrimos el Windows PowerShell como administrador y ejecutamos el comando «Get-ExecutionPolicy» nos tendría que devolver «Unrestricted» o lo que es lo mismo
    «Restringido». Para cambiar esta configuración basta con ejecutar «Set-ExecutionPolicy Unrestricted».
