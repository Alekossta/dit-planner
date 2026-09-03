# DIT Planner

DIT Planner is a web application for students of the Department of Informatics
and Telecommunications at the National and Kapodistrian University of Athens.
It helps students organize their degree progress and plan the courses they want
to take.

Try it here: [alex-stavrin.github.io/dit-planner](https://alex-stavrin.github.io/dit-planner/)

## Features

- Browse and filter the complete course catalog by semester and category.
- Track planned, current, and passed courses.
- Record grades and view progress statistics.
- Create custom courses.
- Import and export course progress as JSON files.
- Keep progress between visits using browser local storage.

## Built with

- React 18 and Create React App
- Chakra UI
- React Router
- Recharts
- Formik and Yup

## Local development

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Run the tests:

```bash
npm test -- --watchAll=false
```

Create an optimized production build:

```bash
npm run build
```

## Updating the course catalog

Course definitions are stored in [`src/coursesData.js`](src/coursesData.js).

> [!IMPORTANT]
> **Every change to `coursesData.js` must be accompanied by a version bump in
> [`src/coursesDataVersion.js`](src/coursesDataVersion.js).** This includes new
> courses, removals, renamed courses, and corrections to fields such as the
> semester, ECTS, category, code, or study-area values.

The catalog version tells the application that its bundled course data has
changed. It allows existing users' saved progress to be reconciled with the new
catalog instead of continuing to use stale course records. Forgetting the
version bump can make a correct course-data change appear missing in the
published application.

When changing course data:

1. Edit `src/coursesData.js`.
2. Increment `coursesDataVersion` in `src/coursesDataVersion.js` (for example,
   from `"1.3"` to `"1.4"`).
3. Run the tests and create a production build.
4. Confirm the affected course appears with the expected filters.

## Deployment

The application is hosted on GitHub Pages. Build and publish it with:

```bash
npm run deploy
```

The `predeploy` script automatically creates a fresh production build before
the `build` directory is published.
