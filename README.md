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
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
```
It's a bit messy, but theres an actual reason for it. Tailwindcss uses postcss 8 (the latest version), but one of our dependancies uses postcss 7. Tailwind made a postcss 7 compatability layer for tailwind 2.0, but hasn't released one for tailwind 3.0. 

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
