# Weather 8-Bit Jekyll Project

This project is a simple Jekyll-based website that features a single web page styled in a black and white 8-bit aesthetic. The page includes an animated background that reflects the current weather conditions in Boronia, utilizing a specified weather API.

## Project Structure

- **_config.yml**: Configuration settings for the Jekyll site, including site title and description.
- **_data/weather_codes.json**: JSON file containing mappings of weather codes to their descriptions.
- **_includes/header.html**: HTML for the header section, including site title and navigation.
- **_includes/footer.html**: HTML for the footer section, containing copyright information and links.
- **_layouts/default.html**: Default layout for pages, including header and footer includes.
- **_layouts/page.html**: Layout for individual pages, extending the default layout.
- **_sass/_base.scss**: Base styles for typography and layout.
- **_sass/_layout.scss**: Styles specific to the layout of the webpage.
- **_sass/_8bit.scss**: Styles for the black and white 8-bit aesthetic.
- **assets/css/styles.scss**: SASS file that imports other SASS files and compiles them into CSS.
- **assets/js/weather.js**: JavaScript file that fetches current weather data and updates the background.
- **index.html**: Main HTML file for the webpage, structured using layouts and includes.
- **Gemfile**: Specifies the gems required for the Jekyll project.
- **Gemfile.lock**: Locks the versions of the gems specified in the Gemfile.
- **README.md**: Documentation for the project.

## Setup Instructions

1. **Install Jekyll**: Ensure you have Ruby and Bundler installed. Then, install Jekyll by running:
   ```
   gem install jekyll bundler
   ```

2. **Clone the Repository**: Clone this repository to your local machine.

3. **Install Dependencies**: Navigate to the project directory and run:
   ```
   bundle install
   ```

4. **Run the Jekyll Server**: Start the Jekyll server with:
   ```
   bundle exec jekyll serve
   ```

5. **View the Site**: Open your web browser and go to `http://localhost:4000` to view the site.

## Features

- Animated background that changes based on the current weather in Boronia.
- Black and white 8-bit styling for a retro aesthetic.
- Responsive design that works on various devices.

## License

This project is licensed under the MIT License.