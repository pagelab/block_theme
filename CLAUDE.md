# CLAUDE.md

## Project Overview

This WordPress block theme leverages Pinegrow for dynamic block creation and management, offering a flexible and customizable user experience. It stands out with its integration of custom blocks and a tailored navigation system, making it ideal for developers looking to create visually appealing and functional WordPress sites.

## Quick Start

```bash
# Navigate to the theme directory
cd wp-content/themes/block_theme

# Ensure WordPress is set up and running
# Recommend activation of the theme through the WordPress admin panel
```

## Architecture

- **Component Diagram**: 
  - `functions.php`: Theme setup and support registration.
  - `inc/`: Helper classes for blocks and navigation.
  - `blocks/`: Individual block registration and scripts.
  - `tailwind_theme/`: Styling with Tailwind CSS.
  - `templates/`: Templates for the block editor.

- **Key Design Decisions**:
  - Give preference to utilize WordPress hooks and filters for extensibility.
  - Pinegrow is used for design ideation and block creation.

- **Technology Choices**:
  - **PHP**: Core language for WordPress theme development.
  - **JavaScript**: For block interactivity.
  - **CSS**: Tailwind for styling.

## Core Components

| Component                  | File Location                                      | Responsibility                                      | Key Classes/Functions                  |
|----------------------------|----------------------------------------------------|-----------------------------------------------------|----------------------------------------|
| Theme Setup                | `functions.php:4-71`                               | Initialize theme supports and features               | `block_theme_setup`                    |
| Block Registration         | `inc/wp_pg_blocks_helpers.php:13-279`              | Register and manage custom blocks                    | `PG_Blocks_v3`                         |
| Navigation                 | `inc/wp_smart_navwalker.php:15-279`                | Custom navigation walker for menus                   | `PG_Smart_Walker_Nav_Menu`             |
| Image Handling             | `inc/wp_pg_helpers.php:13-89`                      | Manage image URLs and attributes                     | `PG_Image`                             |
| Custom PHP Code            | `inc/custom.php:2-4`                               | Placeholder for additional PHP functionalities       | N/A                                    |

## Development Commands

- **Setup/Installation**: Follow the Quick Start guide.
- **Running Locally**: Ensure WordPress is running and activate the theme.
- **Testing Commands**: Manual testing through WordPress admin.
- **Code Quality Checks**: N/A
- **Deployment**: Activate the theme on a WordPress site.

## Configuration

- **Required Environment Variables**: N/A
- **Optional Configurations**: Customize `theme.json` for color and typography settings.
- **Common Gotchas**: Ensure WordPress is properly set up before activating the theme.
- **Security Considerations**: Follow WordPress security best practices.

## File Structure

```
block_theme/
|-- additional-editor-styles.css
|-- blocks/
|   |-- [individual block directories]
|-- header.php
|-- footer.php
|-- functions.php
|-- inc/
|   |-- custom.php
|   |-- wp_pg_blocks_helpers.php
|   |-- wp_pg_helpers.php
|   |-- wp_smart_navwalker.php
|-- index.php
|-- languages/
|-- styles.css
|-- screenshot.png
|-- tailwind_theme/
|   |-- tailwind.css
|   |-- tailwind_for_wp_editor.css
|-- templates/
|   |-- index.html
|   |-- [individual templates]
|-- theme.json
```

## Extension Guide

- **Adding New Features**: Create new blocks in the `blocks/` directory following existing patterns.
- **Common Modification Patterns**: Use `custom.php` for additional PHP code.
- **Plugin/Extension Architecture**: N/A

## Testing & Quality

- **How to Run Tests**: Manual testing in a WordPress environment.
- **Test Structure**: N/A
- **Code Style Rules**: Follow WordPress coding standards.
- **Performance Considerations**: Optimize block scripts and styles.

