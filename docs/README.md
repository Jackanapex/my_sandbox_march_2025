# My Jekyll Introduction

This is a simple Jekyll project that serves as a self-introduction webpage featuring character cards with interactive animations.

## Project Structure

The project is organized as follows:

- **_config.yml**: Configuration settings for the Jekyll site.
- **_data/characters.yml**: Data for the characters, including names and image paths.
- **_includes/**: Contains reusable HTML components such as cards, header, and footer.
- **_layouts/**: Layout files that define the structure of the pages.
- **_sass/**: SCSS files for styling, including animations and card designs.
- **assets/**: Contains additional CSS and JavaScript files for styles and animations.
- **Gemfile**: Specifies the required gems for the Jekyll project.
- **index.html**: The main entry point for the webpage.
- **README.md**: Documentation for the project.

## Setup Instructions

1. **Install Jekyll**: Make sure you have Jekyll installed on your machine. You can install it using the following command:

   ```
   gem install jekyll bundler
   ```

2. **Clone the Repository**: Clone this repository to your local machine.

3. **Navigate to the Project Directory**: Change into the project directory:

   ```
   cd my-jekyll-introduction
   ```

4. **Install Dependencies**: Run the following command to install the required gems:

   ```
   bundle install
   ```

5. **Run the Jekyll Server**: Start the Jekyll server with:

   ```
   bundle exec jekyll serve
   ```

6. **View the Site**: Open your web browser and go to `http://localhost:4000` to view your site.

## Features

- Three character cards displayed side by side.
- Each card features colorful 8-bit game style interactive animations on hover.
- Responsive design for optimal viewing on different devices.

## Characters

- **Lina**: A cute female cat character.
- **Penny**: A cute girl character.
- **Grape**: A grumpy male cat character.

Feel free to customize the characters and styles to make the project your own!