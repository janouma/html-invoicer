# html-invoicer

CLI to genarate simple invoices from html template

## Install

```bash
npm i -g html-invoicer
```

## Usage

```bash
invoice --tmpl path/to/template.html --data path/to/data --out path/to/output.pdf --any 12 --kind "of additional" --params possible
```

### Parameters

| Parameter   | Type        | Required      | Description |
|-------------|-------------|---------------|-------------|
| --tmpl    | String      | Yes        | **Template**: a relative or absolute path to an **html** file.<br>Templates can use es6 string interpolation syntax for variables: `${varname}`|
| --data     | String      | Yes        | <p>**Data**: a relative or absolute path to a **js** or **json** file. A **js** file can return either an `object` or a `function`.</p> If a **js** data file exports a function, this function get passed all the command line parameters as an object. The function must then return an object with all the variables needed by the template|
| --out     | String      | Yes        | **Output file**: the pdf destination file|

> Any additional parameters will be passed to the **js** data function — _in case it is actually a function_ — and can be used to craft the template variables object — _as stated before_.

> A complete example of a [`template.html`](https://github.com/janouma/html-invoicer/blob/master/example/template.html) file, a [`data.js`](https://github.com/janouma/html-invoicer/blob/master/example/data.js) file and the resulting [`invoice.pdf`](https://github.com/janouma/html-invoicer/blob/master/example/invoice.pdf) file can be found under the [`example`](https://github.com/janouma/html-invoicer/tree/master/example) directory.