# UI Design Rules for AI Programming Agents

## Starting from Scratch
- Begin designing with a specific feature rather than the overall layout. For example, when creating a flight booking service, start with the "searching for a flight" feature, which includes fields for departure city, destination city, departure date, return date, and a search button.
- In the early stages of designing a new feature, avoid getting caught up in low-level details like typefaces, shadows, and icons. These can be addressed later.
- Even when refining an idea with higher fidelity, resist introducing color immediately. Designing in grayscale forces the use of spacing, contrast, and size to create hierarchy, resulting in a clearer interface that can be enhanced with color later.
- Don't over-invest in low-fidelity designs. Sketches and wireframes are disposable; use them to explore ideas and move on once a decision is made to start building the real thing.
- Avoid designing every single feature upfront. Work in short cycles: design a simple version of the next feature, build it, iterate on the working design, then move to the next feature.
- When designing a new feature, expect it to be hard to build. Design the smallest useful version that can be shipped to reduce risk. If a part of a feature is a "nice-to-have," design it later.
- Every design has a personality. Determine the desired personality based on the context (e.g., a banking site might be secure and professional, a startup might be fun and playful). Factors influencing personality include font choice, color, border radius, and language.
- Limit design choices by defining systems in advance for elements like colors, font sizes, font weights, line height, margin, padding, etc. This saves time and reduces decision fatigue.

## Hierarchy is Everything
- Not all elements in an interface are equal. Deliberately de-emphasize secondary and tertiary information to highlight the most important elements, creating a more pleasing design.
- Avoid relying too much on font size to control hierarchy. Use font weight or color instead. For example, make primary elements bolder with a reasonable font size, and use a softer color for supporting text.
- Stick to two or three colors for text: a dark color for primary content, a grey for secondary content, and a lighter grey for tertiary content. Similarly, two font weights are usually enough: normal for most text and heavier for emphasized text.
- Don't use grey text on colored backgrounds. Instead, hand-pick a new color based on the background color, with the same hue and adjusted saturation and lightness.
- When a main element isn't standing out enough, de-emphasize competing elements. For example, make inactive nav items a softer color to make the active one stand out.
- Labels are a last resort when presenting data. In many cases, the format or context of the data makes labels unnecessary. When labels are needed, treat them as supporting content and de-emphasize them.
- Separate visual hierarchy from document hierarchy. Use semantic markup for the web but style elements based on visual needs, not just their default semantic appearance.
- Balance weight and contrast. For example, lower the contrast of icons (which are heavy) to balance them with text, or increase the weight of low-contrast elements like thin borders.
- When designing actions on a page, consider their hierarchy. Primary actions should be obvious, secondary actions clear but not prominent, and tertiary actions discoverable but unobtrusive. Destructive actions don't need to be big and bold unless they're the primary action.

## Layout and Spacing
- Start with too much white space and remove it until satisfied. This results in a cleaner design compared to only adding the minimum necessary space.
- Establish a spacing and sizing system with constrained values. The system should have values that are progressively more spaced apart as the scale increases, with adjacent values differing by at least about 25%.
- You don't have to fill the whole screen. Use only the space needed for each element. If designing a small interface on a large canvas, shrink the canvas. For responsive designs, start with a mobile layout and adjust for larger screens.
- Grids are overrated. Not all elements should have fluid, percentage-based widths. Use fixed widths when appropriate, and don't force elements to shrink until necessary.
- Relative sizing doesn't scale perfectly. Elements that are large on large screens need to shrink faster on small screens. Properties of a single component (like button padding and font size) should be adjusted independently for different sizes.
- Avoid ambiguous spacing. Ensure there's more space around groups of elements than within them to clearly show which elements belong together.

## Designing Text
- Establish a type scale to avoid using too many font sizes. A hand-crafted scale works well for interface design, providing enough options without being limiting.
- Use good fonts. For UI design, a neutral sans-serif is a safe choice. Rely on system fonts if unsure. Choose fonts with multiple weights, optimize for legibility, and consider popular fonts.
- Keep line length in check for readability. Aim for 45-75 characters per line. Use em units to control width, with 20-35em being a good range.
- Align mixed font sizes by their baseline rather than centering them for a cleaner look.
- Line-height should be proportional to line length and font size. Narrow content can use a shorter line-height (e.g., 1.5), while wide content may need a taller one (e.g., 2). Use a taller line-height for small text and a shorter one for large text.
- Not every link needs a color. Emphasize most links subtly with font weight or color. For ancillary links, consider adding an underline or changing color only on hover.
- Align text based on readability. Most text in English should be left-aligned. Avoid centering long-form text. Right-align numbers in tables. Hyphenate justified text to avoid awkward gaps.
- Use letter-spacing effectively. Tighten letter-spacing for headlines using wider fonts, and increase letter-spacing for all-caps text to improve legibility.

## Working with Color
- Use HSL instead of hex or RGB for colors. HSL represents colors based on hue, saturation, and lightness, which are more intuitive for human perception.
- You need more colors than you might think. A good color palette includes greys (8-10 shades), primary colors (5-10 shades), and accent colors (with multiple shades).
- Define shades up front rather than creating them on the fly. Start with a base color, then pick the darkest and lightest shades, and fill in the gaps.
- Don't let lightness kill saturation. Increase saturation as lightness moves away from 50% to prevent colors from looking washed out.
- Greys don't have to be pure grey. Saturate them with a bit of color (e.g., blue for cool greys, yellow/orange for warm greys) to set a temperature.
- Accessible designs don't have to be ugly. Meet WCAG contrast guidelines. For white text on colored backgrounds, consider using dark text on a light colored background instead. For colored text on colored backgrounds, rotate the hue towards brighter colors to increase contrast.
- Don't rely on color alone to communicate. Use other indicators like icons or contrast to ensure users with color blindness can understand the UI.

## Creating Depth
- Emulate a light source to create depth. Light comes from above, so raised elements should have lighter top edges and darker shadows below, while inset elements have darker top edges and lighter bottom edges.
- Use shadows to convey elevation. Small shadows with tight blur radii make elements feel slightly raised, while larger shadows with higher blur radii make elements feel closer to the user.
- Define a fixed set of shadows for an elevation system. Combine shadows with interaction (e.g., changing shadow on click) to provide visual cues.
- Shadows can have two parts: a larger, softer shadow simulating direct light, and a tighter, darker shadow simulating ambient light. Adjust the ambient shadow based on elevation.
- Even flat designs can have depth using color (lighter objects feel closer, darker ones further), solid shadows, and overlapping elements.

## Working with Images
- Use good photos. Hire a professional or use high-quality stock photography. Avoid using placeholder images and expecting to replace them with smartphone photos later.
- Ensure text has consistent contrast with background images. Use overlays, lower image contrast, colorize images, or add text shadows to improve readability.
- Respect the intended size of images and icons. Don't scale icons up or down beyond their intended size; redraw simplified versions if needed. Avoid scaling down screenshots too much.
- Be cautious with user-uploaded content. Control the shape and size by centering images in fixed containers, and prevent background bleed with subtle inner box shadows or semi-transparent borders.

## Finishing Touches
- Supercharge defaults by replacing bullets with icons, promoting quotes in testimonials, styling links uniquely, and using custom checkboxes/radio buttons.
- Add color with accent borders to various parts of the UI (e.g., top of cards, active navigation items, side of alerts) to add visual flair.
- Decorate backgrounds with color changes, gradients, repeating patterns, or simple shapes/illustrations to break monotony.
- Don't overlook empty states. Incorporate images/illustrations and emphasize call-to-actions. Hide supporting UI that's not useful without content.
- Use fewer borders. Create separation with box shadows, different background colors, or extra spacing instead.
- Think outside the box for component design. Break free from preconceived notions (e.g., dropdowns don't have to be boring lists, tables can have combined columns and rich content).

## Leveling Up
- Look for unique design decisions in designs you like and learn from them.
- Rebuild favorite interfaces from scratch to notice details and discover design tricks.
