# Sveltekit - TaskManager

West Tigers project about a task manager using integration and others tools

## Starting a project

```bash
# install node modules
npm install

#install the pickdate and calendar styles
npm install --save-dev mono-icons carbon-components-svelte @event-calendar/core @event-calendar/time-grid @event-calendar/day-grid @event-calendar/list @event-calendar/resource-time-grid @event-calendar/interaction
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn install`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

In other terminal run the next command to apply the tailwind and daisy styles:

```bash
npx tailwindcss -i ./src/app.css -o ./src/lib/styles.css --watch
```

## Considerations:

- To use keycloak you need to start the docker container on your docker desktop, once done you would be able to register in the app
- To connect with the database you need to rename the .env.example file to: .env
