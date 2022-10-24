## Design

### Layout

The app consists of two pages: an overview and a results page. The overview page contains an add bookmark form at the top and a paginated table containing the bookmarks previously entered. Users can edit and delete bookmarks from the table. When adding or editing a bookmark, each segment of the URL is checked to confirm it is a valid URL, as well as check whether the URL already exists in the bookmark list. The results page thanks the user for their submission, shows the URL, and displays a button to return to the overview page.

### Project

Technologies used:

- Angular v14
- Angular Material
- Typescript
- SCSS
- ESLint

Due to the app being client-side only, bookmarks are stored in the browser's local storage. The service to manage the bookmarks mimics a service to make requests to a REST API, which could help in the future if this project utilized a back-end to persist bookmarks in a database.

A basic generic table component is used to show the bookmarks and handle pagination. The table displays data based on the given items and column names inputs. Column names should match the property name of the items TypeScript interface.

The project uses adheres to the Google Javascript, HTML, and CSS Style Guidelines.

https://google.github.io/styleguide/jsguide.html
https://google.github.io/styleguide/htmlcssguide.html

## Limitations

- Due to restrictions in the requirements URLs could not be validated to validate if they exist (more specifically that they do not return a 404). This was because requests to test a URL are blocked due to most sites' CORS policy. A solution for this would be to utilise a backend service to validate the URLs do not return a 404, which will not be blocked by the external site's CORS.
