# Nova Tuition Centre Website

This folder contains the source code for the tuition centre website.

## Files
- `index.html`: The main website file containing all content and structure.
- `styles.css`: The styling file defining the colors (Dark Blue & Pale White), fonts, and layout.
- `script.js`: The JavaScript file for mobile navigation interactivity.

## How to Use
1. Double-click `index.html` to open the website in your web browser.

## Customization
To customize the website for the tuition centre:

1. **Tuition Name**: Open `index.html` and replace "Excellence Tuition" with the actual name.
2. **Contact Details**: 
   - Edit the Phone Number in the "Contact" section and the "Call for Demo Class" button.
   - Edit the WhatsApp link in the `href="https://wa.me/..."`.
   - Update the Address in the "Contact" section.
3. **Google Map**:
   - Go to Google Maps, find the location.
   - Click "Share" -> "Embed a map".
   - Copy the HTML `<iframe>` code.
   - Replace the existing `<iframe>` in `index.html` (inside `.map-container`) with the new code.
4. **Images**:
   - Currently, the site uses CSS patterns and icons. You can add actual images by using `<img src="image.jpg">` tags where needed, or as background images in `styles.css`.

## Design Config
- **Colors**: Defined in `styles.css` under `:root`.
  - `--primary-color`: Dark Blue
  - `--background-color`: Pale White
- **Fonts**: Uses 'Poppins' from Google Fonts.

Need help? Just ask!
