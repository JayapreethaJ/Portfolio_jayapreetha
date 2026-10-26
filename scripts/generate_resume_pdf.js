import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  const doc = await PDFDocument.create();
  
  // Set PDF metadata
  doc.setTitle('Jayapreetha Jayaraman - Resume');
  doc.setAuthor('Jayapreetha Jayaraman');
  doc.setSubject('Professional CV & Resume');
  doc.setKeywords(['Jayapreetha Jayaraman', 'Resume', 'CV', 'Frontend Developer', 'UI/UX Designer', '3D Visualizer', 'Relationship Manager']);
  doc.setCreator('Jayapreetha Jayaraman Portfolio');
  doc.setProducer('pdf-lib');

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // A4 size: 595.28 x 841.89 pt
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Colors
  const primaryColor = rgb(0.08, 0.35, 0.34); // Teal / Dark Emerald matching portfolio
  const nameColor = rgb(0.06, 0.12, 0.22);    // Deep Navy / Slate
  const sectionTitleColor = rgb(0.08, 0.35, 0.34);
  const textColor = rgb(0.18, 0.22, 0.28);
  const subTextColor = rgb(0.42, 0.48, 0.54);
  const ruleColor = rgb(0.82, 0.86, 0.90);
  const bulletColor = rgb(0.08, 0.55, 0.50);

  const leftMargin = 40;
  const rightMargin = width - 40;
  const contentWidth = rightMargin - leftMargin;

  let y = height - 42;

  // --- HEADER: NAME & ROLES ---
  page.drawText('JAYAPREETHA JAYARAMAN', {
    x: leftMargin,
    y: y,
    size: 21,
    font: fontBold,
    color: nameColor,
  });
  y -= 18;

  page.drawText('Chemical Engineering Graduate  |  UI/UX Designer  |  Frontend Developer  |  3D Visualizer', {
    x: leftMargin,
    y: y,
    size: 10,
    font: fontBold,
    color: primaryColor,
  });
  y -= 15;

  page.drawText('Puducherry, India   |   +91-9360271358   |   jayaraman4preetha@gmail.com', {
    x: leftMargin,
    y: y,
    size: 9,
    font: fontRegular,
    color: textColor,
  });
  y -= 13;

  page.drawText('LinkedIn: linkedin.com/in/jayapreetha-jayaraman   |   GitHub: github.com/JayapreethaJ', {
    x: leftMargin,
    y: y,
    size: 9,
    font: fontRegular,
    color: subTextColor,
  });
  y -= 14;

  // Header Divider
  page.drawLine({
    start: { x: leftMargin, y },
    end: { x: rightMargin, y },
    thickness: 1.5,
    color: primaryColor,
  });
  y -= 16;

  // Helper function to draw section header
  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: leftMargin,
      y,
      size: 11,
      font: fontBold,
      color: sectionTitleColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: leftMargin, y },
      end: { x: rightMargin, y },
      thickness: 0.75,
      color: ruleColor,
    });
    y -= 12;
  }

  // Helper function to draw bullet point
  function drawBullet(text, indent = 12, fontSize = 8.5) {
    page.drawCircle({
      x: leftMargin + indent - 5,
      y: y + 2.5,
      size: 1.8,
      color: bulletColor,
    });
    page.drawText(text, {
      x: leftMargin + indent,
      y,
      size: fontSize,
      font: fontRegular,
      color: textColor,
    });
    y -= 11.5;
  }

  // --- 1. PROFESSIONAL SUMMARY ---
  drawSectionHeader('Professional Summary');
  const summaryLines = [
    'Detail-oriented Chemical Engineering graduate (CGPA 8.46) with cross-functional experience in Quality and Production',
    'Operations at Hindustan Unilever, Client Relationship Management at TenMind Global IT Solutions, UI/UX Design, and',
    'Frontend Web Development. Proficient in HTML5, CSS3, JavaScript, Java, Bootstrap 5, Figma, and Blender 3D modeling.',
    'Adept at bridging technical operations, human-centered digital experiences, and proactive client communications.'
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: leftMargin,
      y,
      size: 8.5,
      font: fontRegular,
      color: textColor,
    });
    y -= 11;
  }
  y -= 6;

  // --- 2. WORK EXPERIENCE ---
  drawSectionHeader('Work Experience');

  // Experience 1
  page.drawText('Relationship Manager', {
    x: leftMargin,
    y,
    size: 10,
    font: fontBold,
    color: nameColor,
  });
  page.drawText('March 2026 - October 2026', {
    x: rightMargin - 135,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  y -= 12;

  page.drawText('TenMind Global IT Solutions  |  Puducherry, India', {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontOblique,
    color: subTextColor,
  });
  y -= 12;

  drawBullet('Manage enterprise client relations, digital communication channels, and project onboarding to support smooth delivery.');
  drawBullet('Coordinate client requirements with cross-functional development teams, aligning scope and timely deliverables.');
  drawBullet('Facilitate proactive stakeholder updates, client retention strategies, and professional business correspondence.');
  y -= 6;

  // Experience 2
  page.drawText('Assistant Quality & Production Executive', {
    x: leftMargin,
    y,
    size: 10,
    font: fontBold,
    color: nameColor,
  });
  page.drawText('Jan 2024 - Jan 2025', {
    x: rightMargin - 95,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  y -= 12;

  page.drawText('Hindustan Unilever Limited  |  Puducherry, India', {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontOblique,
    color: subTextColor,
  });
  y -= 12;

  drawBullet('Applied rigorous analytical problem-solving and quality control standards across manufacturing lines and operations.');
  drawBullet('Collaborated with cross-functional engineering and safety teams to elevate production efficiency and process reliability.');
  drawBullet('Audited batch records, monitored quality parameters, and contributed to root-cause process improvement initiatives.');
  y -= 6;

  // --- 3. EDUCATION ---
  drawSectionHeader('Education');

  page.drawText('Bachelor of Technology (B.Tech) in Chemical Engineering', {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontBold,
    color: nameColor,
  });
  page.drawText('2019 - 2023', {
    x: rightMargin - 60,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  y -= 12;

  page.drawText('Puducherry Technological University (formerly PEC)  |  CGPA: 8.46 / 10', {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 14;

  page.drawText('Higher Secondary Certificate (HSLC)', {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontBold,
    color: nameColor,
  });
  page.drawText('2018 - 2019', {
    x: rightMargin - 60,
    y,
    size: 9,
    font: fontBold,
    color: primaryColor,
  });
  y -= 12;

  page.drawText('Amalorpavam Higher Secondary School, Puducherry  |  Score: 75.3%', {
    x: leftMargin,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 14;

  // --- 4. TECHNICAL & PROFESSIONAL SKILLS ---
  drawSectionHeader('Technical & Professional Skills');

  page.drawText('Frontend & Web:', { x: leftMargin, y, size: 8.5, font: fontBold, color: nameColor });
  page.drawText('HTML5, CSS3, JavaScript, Java, Bootstrap 5, Responsive Web Layouts, Local Storage, Git/GitHub', {
    x: leftMargin + 85,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 12;

  page.drawText('UI/UX & Design:', { x: leftMargin, y, size: 8.5, font: fontBold, color: nameColor });
  page.drawText('Figma, Wireframing, High-Fidelity Interactive Prototyping, User Flow, Design Systems, Typography', {
    x: leftMargin + 85,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 12;

  page.drawText('3D Modeling:', { x: leftMargin, y, size: 8.5, font: fontBold, color: nameColor });
  page.drawText('Blender 3D, Photorealistic Product Visualization, Texturing, Lighting Setup, Cycles/Eevee Rendering', {
    x: leftMargin + 85,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 12;

  page.drawText('Professional & Core:', { x: leftMargin, y, size: 8.5, font: fontBold, color: nameColor });
  page.drawText('Client Relationship Management, Quality Assurance, Industrial Operations, Cross-Functional Teamwork', {
    x: leftMargin + 85,
    y,
    size: 8.5,
    font: fontRegular,
    color: textColor,
  });
  y -= 14;

  // --- 5. FEATURED PROJECTS ---
  drawSectionHeader('Featured Projects');

  // Project 1
  page.drawText('3D Product Visualization & Modeling', { x: leftMargin, y, size: 9, font: fontBold, color: nameColor });
  page.drawText('(Blender 3D - Oct 2026)', { x: leftMargin + 175, y, size: 8.5, font: fontOblique, color: subTextColor });
  y -= 11;
  drawBullet('Engineered high-detail 3D models including tea stalls, glassware, perfume bottles, and consumer appliances with studio lighting.');
  y -= 4;

  // Project 2
  page.drawText('Music Streaming & Events Platform UI', { x: leftMargin, y, size: 9, font: fontBold, color: nameColor });
  page.drawText('(Figma UI/UX - Jul 2025)', { x: leftMargin + 185, y, size: 8.5, font: fontOblique, color: subTextColor });
  y -= 11;
  drawBullet('Designed an intuitive multi-screen music web experience with live concert discovery, personalized albums, and artist spotlights.');
  y -= 4;

  // Project 3
  page.drawText('Kids Toys E-Commerce Website UI', { x: leftMargin, y, size: 9, font: fontBold, color: nameColor });
  page.drawText('(Figma UI/UX - May 2025)', { x: leftMargin + 175, y, size: 8.5, font: fontOblique, color: subTextColor });
  y -= 11;
  drawBullet('Crafted a vibrant shopping platform with categorized product collections (educational, outdoor, fashion) and checkout UX.');
  y -= 4;

  // Project 4
  page.drawText('Interactive Task & To-Do List Application', { x: leftMargin, y, size: 9, font: fontBold, color: nameColor });
  page.drawText('(HTML5, CSS3, JavaScript, Bootstrap 5 - Aug 2025)', { x: leftMargin + 200, y, size: 8.5, font: fontOblique, color: subTextColor });
  y -= 11;
  drawBullet('Developed a responsive task manager featuring dynamic DOM rendering, category filters, and persistent Local Storage.');
  y -= 8;

  // --- 6. CERTIFICATIONS & DIPLOMAS ---
  drawSectionHeader('Certifications & Training');
  drawBullet('Diploma in UI/UX Design  -  Creotix Technologies');
  drawBullet('Diploma in Front-End Development  -  Ocean Academy');
  drawBullet('Industrial Process Optimization & Quality Control Internship Certification  -  Industrial Training');

  // Footer note
  y -= 4;
  page.drawLine({
    start: { x: leftMargin, y },
    end: { x: rightMargin, y },
    thickness: 0.5,
    color: ruleColor,
  });
  y -= 10;
  page.drawText('Portfolio: https://jayapreethaj.github.io  |  Verified Resume of Jayapreetha Jayaraman', {
    x: leftMargin,
    y,
    size: 7.5,
    font: fontOblique,
    color: subTextColor,
  });

  const pdfBytes = await doc.save();

  // Targets to write to (comprehensive paths for root, public, and subdirectories)
  const destinations = [
    'public/Jayapreetha_Jayaraman_Resume.pdf',
    'public/Jayapreetha_Jayaraman_CV.pdf',
    'public/resume.pdf',
    'public/resume/Jayapreetha_Jayaraman_Resume.pdf',
    'public/resume/Jayapreetha_Jayaraman_CV.pdf',
    'Jayapreetha_Jayaraman_Resume.pdf',
    'Jayapreetha_Jayaraman_CV.pdf',
    'resume.pdf',
    'resume/Jayapreetha_Jayaraman_Resume.pdf',
    'resume/Jayapreetha_Jayaraman_CV.pdf',
    'portfolio/Jayapreetha_Jayaraman_Resume.pdf',
    'portfolio/Jayapreetha_Jayaraman_CV.pdf',
    'portfolio/resume.pdf',
    'portfolio/resume/Jayapreetha_Jayaraman_Resume.pdf',
    'portfolio/resume/Jayapreetha_Jayaraman_CV.pdf',
    'dist/Jayapreetha_Jayaraman_Resume.pdf',
    'dist/Jayapreetha_Jayaraman_CV.pdf',
    'dist/resume.pdf',
    'dist/resume/Jayapreetha_Jayaraman_Resume.pdf',
    'dist/resume/Jayapreetha_Jayaraman_CV.pdf'
  ];

  for (const dest of destinations) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dest, pdfBytes);
    console.log(`Wrote ${pdfBytes.length} bytes to ${dest}`);
  }

  console.log('Resume generation complete!');
}

generateResume().catch(err => {
  console.error('Error generating resume:', err);
  process.exit(1);
});
