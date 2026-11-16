# RG Tempo Traveller — V9

Premium, responsive Tempo Traveller website.

## Structure

- `index.html` — page markup only
- `css/style.css` — all site styling and premium animations
- `js/script.js` — booking, sliders, chatbot and interaction logic
- `images/` — all travel and vehicle imagery
- `images/vehicles/12-seater/` through `25-seater/` — vehicle-specific assets

## V9 UI improvements

- Separate CSS and JavaScript files
- Desktop + mobile responsive layout
- Smooth section reveal animations
- Premium card hover motion
- Hero Ken Burns transitions
- Horizontal desktop slider motion
- Mouse-wheel support for horizontal sliders
- Touch-friendly sliders
- Active navigation state
- Smooth anchor scrolling
- Vehicle/gallery image hover zoom
- Modal entrance animation
- Chatbot entrance/message animations
- Reduced-motion accessibility support

Replace the vehicle images inside `images/vehicles/` with real RG vehicle photographs using the existing filenames to keep the page code unchanged.


## V10 detail pages added
- Vehicle detail pages: `vehicles/12-seater.html`, `14-seater.html`, `16-seater.html`, `18-seater.html`, `21-seater.html`, `25-seater.html`.
- Trip detail pages: `trips/madurai-temple-escape.html`, `madurai-rameswaram.html`, `chola-heritage-route.html`, `tiruvannamalai-circuit.html`, `trichy-temple-trail.html`, `murugan-temple-circuit.html`.
- Shared detail styling: `css/details.css`; shared page interactions: `js/details.js`.
- Replace the image slots inside `images/vehicles/<seater>/` and `images/trips/<trip>/` with real photographs.
- Callback forms send the customer's name, phone number, date, travellers and page context to the owner WhatsApp number configured in `js/details.js`.
