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
  title: "Oats Overnight — Claymation Ad",
  category: "Video Advertising",
  description: "A claymation music video Ad that sells Oats Overnight to people who skip breakfast and have never thought about buying it.",

  image: "assets/images/oats-overnight-claymation-ad.jpg",
  bunnyEmbed: "https://player.mediadelivery.net/embed/780421/28c4af33-717e-4c31-ac23-f2c3ca2201c2",
  bunnyAspectRatio: "9/16",
  caseStudy: "case-studies/the-6am-problem.html",

  client: "Oats Overnight",
  services: "Creative Direction · Storyboarding · AI Video"
},
    {
      title: "Abib — Carousel Ad",
      category: "INTERACTIVE / MULTI-MEDIA ADVERTISING",
      description: "A spec Meta carousel for Abib's PDRN Retinal Eye Patch that reaches makeup wearers the brand's current ads miss.",
      // Add your case-study page path or URL here when ready.
      caseStudy: "case-studies/abib-carousel.html",
      galleryFit: "contain",
      images: [
        "assets/images/abib/abib-slide-1.png",
        "assets/images/abib/abib-slide-2.png",
        "assets/images/abib/abib-slide-3.png",
        "assets/images/abib/abib-slide-4.png",
        "assets/images/abib/abib-slide-5.png",
        "assets/images/abib/abib-slide-6.png"
      ]
    },
    {
      title: "Project Three — Social Content",
      category: "Social Media",
      description: "A short description of the social media redesign, content system, or campaign.",
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
