# Vue SPA

Install dependencies

```
pnpm install
```

Create Build

```
npm run build
```

Serve the app

```
npm run serve
```

Important:
This repository uses mock service worker to mock api files, ideally it would be disabled for production but for this demo I have enabled it
In `main.ts` file, find this code and uncomment the if condition to disable mocking (though it won't be necessary for this demo)

```
if (process.env.NODE_ENV === 'development') {
  const { start } = await import('./mocks/worker');
  start();
}
```
