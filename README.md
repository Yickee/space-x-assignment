# Assignment for Toelevering Online

This project is for a job application for Toelevering Online.

## Intallation & run

- npm i to install dependencies
- npm run dev to run the app
- go to localhost:5173 to view the page

## Testing

- npm run test to run test

## Functinalities

When opening the page all launches should be visibale. You can filter launches by using the filters on the left side.
Clicking on a launch expands the card and it will show some additional info.

## Technical

I used Vite with typescript and tailwind, since I know all these tchnologies. I like vite because it's easy to setup and the fast refresh is nice.
I tried to show usage of shadcn and zustand, since we talked about that in our first meet up.
For simplicity I chose to just use shadcn's darkmode filter on the main component for styling.

## Challenges

I tried to animate the page by using framer-motion, but it made the app feel slow (on my pc at least, not on my laptop), so I cut all of that in the end for performance.
I also never really wrote tests for frond-end (except from the occational test with playwright), so I just wrote a few simple tests with vitest, since I know how to use that for backend test.
