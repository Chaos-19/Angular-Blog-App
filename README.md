# Angular 18 Blog App

This is a blog application built using Angular 18. It features a homepage with a list of blog posts, a separate page for individual blog posts, and a search functionality. The app supports dark mode and is fully mobile responsive.

the project is the final project I completed during a two-week Angular study to land an internship. 

## Features

- **Homepage**: Displays a list of blog posts.
- **Individual Blog Post Page**: Dedicated page for each blog post.
- **Search Page**: Allows users to search for blog posts.
- **Dark Mode**: Toggle between light and dark themes.
- **Mobile Responsive**: Fully responsive design for an optimal experience on mobile devices.

## Screenshots

*Include screenshots of your app here.*

## Tech stack Used

- **Frontend**: Angular 18
- **Styling**: tailwindcss 
- **Routing**: Angular Router
- **State Management**: not used
- **Dark Mode**: CSS custom properties (or Angular Material theming)

## Installation

1. Clone the repository:
   ```sh
   https://github.com/Chaos-19/Angular-Blog-App.git
   ```
2. Navigate to the project directory:
   ```sh
   cd angular-18-blog-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:
   ```sh
   ng serve
   ```
2. Open your browser and navigate to `http://localhost:4200`.

## Folder Structure

angular-18-blog-app/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── service/
│   │   │   │   ├── blog/
│   │   │   │   ├── theme/
│   │   ├── features/
│   │   │   ├── blog/
│   │   │   │   ├── add-blog/
│   │   │   │   ├── blog-detail/
│   │   │   │   ├── blog-list/
│   │   │   │   ├── edite-blog/
│   │   │   │   ├── search/
│   │   │   │   ├── blog.component.html
│   │   │   │   ├── blog.component.spec.ts
│   │   │   │   ├── blog.component.ts
│   │   │   ├── home/
│   │   │   │   ├── hero/
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── 404/
│   │   │   ├── footer/
│   │   │   ├── load-animation/
│   │   │   ├── nav-bar/
│   │   ├── templates/
│   │   │   ├── blog-template/
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── constants.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
├── angular.json
├── package.json
├── README.md

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please reach out to [kalgetachew375@gmail.com].
