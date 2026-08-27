yet a lot of changes to be made

This is the complete editable source for Devansh Mishra's animated full-stack portfolio. It is built with React, TypeScript, Vinext/Vite, GSAP, Lenis, CSS, Cloudflare D1, and Drizzle ORM.

Live reference: https://devansh-motion-portfolio.dm7903337.chatgpt.site

1. Quick start
Install these first:

Node.js 22.13 or newer
VS Code (recommended)
Then open this folder in a terminal and run:

npm install
npm run dev
Open the local address printed in the terminal. Stop the development server with Ctrl + C.

Before sharing or deploying a changed version, check it with:

npm run lint
npm run build
The included scripts work on Windows, macOS, and Linux.

2. Where to edit everything
What you want to change	File
Name, role, location, social links, journey, projects and contact copy	app/portfolio-experience.tsx
Colours, spacing, typography, responsive layout and visual styling	app/globals.css
Browser title, description and social-sharing metadata	app/layout.tsx
Images and artwork	public/
Contact-form validation and saving	app/api/contact/route.ts
Contact database fields	db/schema.ts
Page entry point	app/page.tsx
3. Personalize the portfolio
In app/portfolio-experience.tsx, search for and replace:

DEVANSH and MISHRA
FULL-STACK DEVELOPER
GREATER NOIDA / INDIA
https://github.com/dev-ops-sudo
https://linkedin.com/in/devansh-mishra-637184372
the projects array near the top of the file
journey-card education and experience text
final contact and footer text
Keep the existing className values unless you also update their matching CSS or GSAP selectors.

4. Replace images
Images live in public/. The safest method is to replace an image while keeping its current filename and dimensions. If you rename it, update the matching src="/..." value in app/portfolio-experience.tsx or the relevant metadata path in app/layout.tsx.

Important artwork:

public/hero-device-minimal.png — minimal technology sculpture
public/projects/breachwise.png — BreachWise project artwork
public/projects/lifesync.png — LifeSync project artwork
public/projects/college-gym-platform.png — gym platform artwork
public/og.png — social-sharing preview
public/objects/ — additional project-object artwork
public/showreel-frame.webp — journey/showreel background
Use transparent PNG files for floating objects. Avoid baking project titles into images because the HTML text is sharper and more accessible.

5. Understand the animation system
Most animation code is inside the main useEffect in app/portfolio-experience.tsx.

intro controls the pixel loader and first name reveal.
heroSequence controls the pinned name, full-stack pipeline and tech-object scenes.
journey controls the school, college and development timeline cards.
Project and reach/contact timelines control later scroll entrances.
Lenis provides smooth scrolling and is synchronized with GSAP's ticker.
To make an animation slower, increase its GSAP duration. To make an element arrive later, move its timeline position value further forward. Change one scene at a time and run the site after every edit.

6. Colours and fonts
The main palette is defined at the top of app/globals.css:

:root {
  --yellow: #ffd600;
  --ink: #11100f;
  --paper: #f5f1e6;
  --cyan: #64d9e7;
  --red: #f04f31;
  --violet: #9c75ff;
}
Archivo Variable is the main typeface and Caveat Variable is the handwritten accent. Both are installed through npm.

7. Contact form and database
The meeting/review form posts to /api/contact and stores submissions in a Cloudflare D1 database through Drizzle ORM. The frontend can be edited locally without a production database, but saving real form submissions requires your own D1 binding named DB and the included migration under drizzle/.

.openai/hosting.json contains a placeholder project ID so this shared copy cannot point to Devansh's deployment. Create your own Site/project and replace the placeholder before deploying. Never reuse another person's project ID or credentials.

8. Recommended editing workflow
Duplicate the folder and rename the copy.
Change identity text and social links.
Replace project content and artwork.
Adjust colours in app/globals.css.
Run npm run dev and check desktop and mobile widths.
Run npm run lint and npm run build.
Deploy using your own hosting account and database.
For a detailed explanation of how every major scene was designed, read BUILD_NOTES.md.

Credits
Original portfolio direction and content: Devansh Mishra. When adapting it, replace Devansh's personal details, CV claims, contact information, and social links with your own.
