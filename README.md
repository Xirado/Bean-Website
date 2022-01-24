# Bean Website

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

If you want to do any css (using tailwind), open another terminal and run this:

```
npx run css
```

It's a bit messy, but theres an actual reason for it. Tailwindcss uses postcss 8 (the latest version), but one of our dependancies uses postcss 7. Tailwind made a postcss 7 compatability layer for tailwind 2.0, but hasn't released one for tailwind 3.0.

### Compiles and minifies for production

```
npm run build
```

### Pre-commit checklist

Every push should *always* be linted and formatted to ensure readable and quality code. Use the commands below every time before you commit:

```
npm run lint
npm run fmt
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
