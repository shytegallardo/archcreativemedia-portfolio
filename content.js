/*
  ============================================================
  SITE CONTENT
  ============================================================
  Edit this file first. Add your own text, links, and images here.
  Project images can be a single string or an array of image paths.
  Optional video: 'assets/videos/filename.mp4' appears first in the modal.
  Keep image/images for carousel thumbnails and the remaining gallery items.
  caseStudy is optional and can be a URL or omitted.
  ============================================================
*/

const SITE_CONTENT = {
  brand: "Archilles Vivero",
  tagline: "Where creativity meets strategy",
  introTitle: "Where creativity meets strategy",
  introCopy: "I bring together branding, design, marketing, and storytelling to create work that connects with people and supports real business goals.",

  aboutTitle: "Creative thinker. Strategic builder. Detail-oriented maker.",
  aboutCopy: "I’m a creative professional focused on turning ideas into clear visual identities, campaigns, digital experiences, and content systems.",
  aboutCopy2: "My approach combines creativity with strategy: understand the audience, find the strongest idea, and execute it with intention.",

  contactTitle: "Have a project in mind?",
  email: "hello@example.com",
  location: "Philippines · Available worldwide",

  heroImages: [
    "assets/images/hero-portrait.jpeg",
    "assets/images/hero-portrait-2.jpeg",
    "assets/images/hero-detail.jpeg"
  ],

  projects: [
  {
  title: 'Brunaé — "3 Weeks After Bali"',
  category: "CLAYMATION AD",
  description: "A claymation music video ad that sells Brunaé's tanning bundle to fair-skinned skeptics who've seen the ads but never believed it would work on them.",

  image: "assets/images/brunae-3-weeks-after-bali.png",
  // Optional PDF popup. To add another, upload a PDF and set briefPdf on its project.
  briefPdf: "assets/pdfs/Brunae-Three-Weeks-After-Bali-Creative-Brief.pdf",
},
    {
      title: 'Metabolae — "Enjoy the Table, Keep the Routine"',      
      category: "STATIC AD",
      description: "A warm holiday static: one family kitchen, one simple habit. It says you can enjoy the meals that matter and still keep your daily routine easy.",

      image: "assets/images/Metabolae-Creative-Brief-Enjoy-the-Table-Keep-the-Routine.png",
      briefPdf: "assets/pdfs/Metabolae-Creative-Brief-Enjoy-the-Table-Keep-the-Routine.pdf",
    },
    {
      title: 'Brunaé — "Somewhere in My Forties"',      
      category: "UGC AD",
      description: "A storytelling UGC Reel about a woman who thought sheʼd aged out of tanning, and the holiday she got that version of herself back.",
      images: ["assets/images/project-03.svg"],
      client: "Client Name",
      services: ["Social Strategy", "Content Design", "Copywriting"],
      caseStudy: ""
    },
    {
      title: "Project Four — Digital Experience",
      category: "Web Design",
      description: "An additional case study you can add whenever you are ready.",
      images: ["assets/images/project-04.svg"],
      client: "Client Name",
      services: ["UX/UI", "Web Design", "Development"],
      caseStudy: ""
    }
  ],

  // Add entries here with title, category, description, and optional image / url.
  // Example: { title: "Study title", category: "Research", description: "Your findings",
  //            url: "assets/documents/study.pdf", image: "assets/images/project-02.svg" }
  caseStudies: [
    {
      title: "The 6am Problem",
      category: "Creative Strategy / Spec Case Study",
      description: "A problem-first claymation music video concept for Oats Overnight. Explore the insight, story, rollout and proposed testing plan.",
      image: "assets/images/oats-overnight-claymation-ad.jpg",
      url: "case-studies/the-6am-problem.html"
    },
    {
      title: "Abib — Your Concealer Isn't the Problem",
      category: "Creative Strategy / Spec Case Study",
      description: "Explore the ad audit, problem-aware insight, six-slide carousel and proposed hook testing plan.",
      image: "assets/images/abib/abib-slide-1.png",
      url: "case-studies/abib-carousel.html"
    }
  ],

  socials: [
    { name: "Instagram", url: "https://instagram.com/" },
    { name: "LinkedIn", url: "https://linkedin.com/" },
    { name: "Behance", url: "https://behance.net/" }
  ]
};
