# "Leading with Purpose" Campaign Site Documentation

## Overview

This documentation provides an overview of the "Leading with Purpose" campaign site developed for the University of North Dakota (UND). The site aims to foster community interaction, celebrate diversity, and promote innovation through its latest social media campaign.

The site is structured into three main sections, as outlined by the project's requirements, and each section is built with responsive design and accessibility in mind. Several enhancements have also been incorporated to enrich the user experience.

## Installation and Setup

To install the application:

1. Ensure that Node.js and npm are installed on your machine.
2. Clone the project repository from the provided link to the github repo or extract the ZIP file sent through email.
3. Navigate to the project root directory in the terminal.
4. Run `npm install` to install all necessary dependencies.
5. Start the development server by running `npm start`. The application will be available at `http://localhost:3000`.

## Project Structure

The application's codebase is modular, facilitating easy updates and maintenance. Key directories and files include:

- `public/`: Houses static assets like the UND logo and the President's image.
- `src/`: Contains all source code, including JavaScript and CSS files.
- `components/`: Reusable UI components, segregated into common components and specific sections.
- `hooks/`: Custom React hooks for managing menu and modal states.
- `post/`: Resuabale post cards and Enchanced view(modal).

## Key Features

### Header and Footer

The `Header` and `Footer` components provide consistent navigation and branding across the site. The `Menu` component appears when the hamburger menu icon is clicked, facilitating navigation on mobile devices.

### President's Endorsement Section

The `PresidentialEndorsement` component displays a message from UND's president with an image and outlines the campaign goals. It emphasizes the values of engagement, diversity, and innovation.

### Post Section

The `Posts` component showcases user-generated content fetched from an API, organized in a paginated card layout with only 12 posts per page. Posts are displayed in descending order by date, with the latest posts shown first. Each `PostCard` allows users to view detailed post information in a modal (`PostDetail` component) upon selection.

### Visual Representation Section

The `Chart` component uses a tag cloud to represent the frequency of hashtags used in the posts. More frequently used hashtags appear larger in size, and their exact frequency is also indicated in brackets.

### Pagination and Search

The site supports pagination, enabling users to navigate through different pages of posts. A search feature allows users to filter posts by content or hashtags.

### Accessibility

Accessibility features have been implemented, ensuring that the site is navigable via keyboard and screen readers, with appropriate ARIA labels and roles.

## Responsive Design

Responsive CSS and React's dynamic rendering capabilities are utilized to ensure the site is accessible and visually consistent on various screen sizes, from mobile to desktop.

## Enhancements

Several enhancements have been added to exceed the project's base requirements:

1. **Pagination**: The implementation of pagination helps in handling large volumes of posts efficiently. Users can navigate through different pages to view more posts, with only 12 posts per page for better readability and performance.

2. **Latest Posts First**: The posts are sorted so that the most recent ones appear first, providing users with the most up-to-date content as soon as they visit the site.

3. **Tag Cloud Visualization**: The `Chart` component creates a visual representation of the frequency of hashtags used in the posts. The size of the hashtag in the cloud corresponds to its usage frequency, offering a quick, visual understanding of the most popular topics.

4. **Scroll to Top**: The `ScrollToTop` component adds a user-friendly feature allowing users to easily return to the top of the page without manual scrolling.

5. **Custom Hooks**: The use of custom hooks like `useMenu` and `useModal` to manage the state and behavior of menus and modals enhances the maintainability of the code and the reusability of the components.

6. **Date Range Filtering**: Users can filter posts within any date range, giving them control over the timeline of the content they wish to view.

## Running the Application

Execute `npm start` from the root directory to run the application on a local server. It's ready for local development and testing.

## Conclusion

The "Leading with Purpose" site delivers a rich user experience through a thoughtful design that encapsulates the values and goals of the UND social media campaign. This documentation provides a brief on setting up the project, understanding its structure, and appreciating the user-centric enhancements made to the original requirements.
