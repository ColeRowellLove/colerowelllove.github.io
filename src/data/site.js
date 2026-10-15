export const site = {
  name: 'Cole Rowell-Love',
  url: 'https://colerowelllove.github.io',
  email: 'colerowell11@gmail.com',
  linkedin: 'https://www.linkedin.com/in/colerowelllove',
  github: 'https://github.com/ColeRowellLove',
  employer: { name: 'Earth Dynamics AI', url: 'https://earthdynamics.ai' },
  repo: 'https://github.com/ColeRowellLove/colerowelllove.github.io',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const highlights = [
  {
    value: '75%',
    text: 'lower classifier latency through TorchScript, distillation, and INT8 quantization',
  },
  { value: '80,000+', text: 'images collected to train ViT and hybrid ViT-CNN classifiers' },
  {
    value: '95%',
    text: 'shorter self-test data-extraction runtime after refactoring MATLAB data handling',
  },
  {
    value: '5–10%',
    text: 'accuracy gains for LLM image analysis from prompt optimization and fine-tuning',
  },
];

export const experience = [
  {
    id: 'earthdynamicsai',
    dates: 'May 2026 – Present',
    place: 'Vancouver, BC',
    title: 'Data Engineer',
    org: 'Earth Dynamics AI',
    orgUrl: 'https://earthdynamics.ai',
    bullets: [],
  },
  {
    id: 'ubc',
    dates: 'May – Aug 2025',
    place: 'Vancouver, BC',
    title: 'Machine Learning Researcher',
    org: 'UBC Robotics and Control Laboratory (NSERC-URSA)',
    orgUrl: 'https://rcl.ece.ubc.ca/home-page/',
    summary: 'Echocardiography report generation from multi-view ultrasound video.',
    bullets: [
      "Reimplemented Stanford's EchoPrime multimodal deep-learning architecture to generate structured echocardiography reports from multi-view ultrasound videos, adapting the pipeline to UBC's proprietary clinical dataset.",
      'Fine-tuned a text encoder using contrastive learning on millions of echo videos and thousands of cardiac reports to improve video–report alignment, strengthening clinical interpretability and downstream retrieval performance.',
    ],
  },
  {
    id: 'yakoa',
    dates: 'Jan – May 2025',
    place: 'Vancouver, BC',
    title: 'Machine Learning Engineer, Co-op',
    org: 'Yakoa, Inc.',
    orgUrl: 'https://www.yakoa.io/',
    summary: 'LLM benchmarking and fast image classifiers for IP infringement detection.',
    bullets: [
      'Designed a scalable, provider-agnostic LLM benchmarking framework integrating OpenAI, Google, Anthropic, Mistral, and AWS APIs to evaluate image-based IP infringement detection.',
      'Improved LLM image-analysis accuracy by 5–10% through prompt optimization, multi-step reasoning chains, and grounding strategies.',
      'Fine-tuned Gemini 1.5 Pro and Flash models on proprietary IP datasets, achieving a 5–10% improvement in intellectual property recognition accuracy over baseline models.',
      'Collected 80,000+ images, built a Hugging Face API pipeline, and trained ViT and hybrid ViT-CNN classifiers to detect images containing valuable assets.',
      'Reduced classifier latency by 75% through TorchScript compilation, knowledge distillation, and INT8 quantization, enabling real-time image analysis at scale.',
    ],
  },
  {
    id: 'sonic',
    dates: 'May – Dec 2024',
    place: 'Vancouver, BC',
    title: 'Junior Software Developer, Co-op',
    org: 'Sonic Incytes Medical Corp.',
    orgUrl: 'https://www.sonicincytes.com/',
    summary: 'Full-stack software for a liver health assessment device.',
    bullets: [
      'Developed full-stack medical device software for liver health assessment in a 3-person agile team, building a web-based diagnostic platform (HTML, CSS, JavaScript, Python, C++).',
      'Designed a C++/JavaScript backend with a WebSocket server for low-latency data exchange between device code and a browser-based GUI.',
      'Built a Python REST API to manage SQLite databases, supporting reliable CRUD operations for patient and device records.',
    ],
  },
  {
    id: 'kardium',
    dates: 'Sep – Dec 2023',
    place: 'Burnaby, BC',
    title: 'Software Systems Engineering, Co-op',
    org: 'Kardium, Inc.',
    orgUrl: 'https://kardium.com/',
    summary: 'Time-series analysis and tooling for cardiac ablation systems.',
    bullets: [
      'Analyzed time-series data from cardiac ablation systems using MATLAB, developing visualization pipelines for electrical signal analysis and system performance monitoring.',
      'Refactored MATLAB data-handling classes, reducing self-test data-extraction runtime by 95%.',
      'Diagnosed and resolved reported system issues by correlating performance data with hardware and software specifications.',
    ],
  },
];

export const projects = {
  ml: [
    {
      dates: '2025',
      place: 'UBC research',
      title: 'Echocardiography report generation',
      lede: "A reimplementation of Stanford's EchoPrime that generates structured reports from multi-view ultrasound videos.",
      bullets: [
        "Adapted the pipeline to UBC's proprietary clinical dataset.",
        'Fine-tuned a text encoder with contrastive learning on millions of echo videos and thousands of cardiac reports to improve video–report alignment.',
      ],
      tags: ['Multimodal learning', 'Contrastive learning', 'Medical imaging'],
    },
    {
      dates: '2025',
      place: 'Yakoa',
      title: 'LLM benchmarking framework',
      lede: 'A provider-agnostic framework for comparing LLMs on image-based IP infringement detection.',
      bullets: [
        'Integrated OpenAI, Google, Anthropic, Mistral, and AWS APIs behind one interface.',
        'Raised image-analysis accuracy by 5–10% with prompt optimization, multi-step reasoning chains, and grounding.',
        'Fine-tuned Gemini 1.5 Pro and Flash models on proprietary IP datasets, achieving a 5–10% improvement in intellectual property recognition accuracy over baseline models.',
      ],
      tags: ['LLM evaluation', 'Prompt engineering', 'Fine-tuning'],
    },
    {
      dates: '2025',
      place: 'Yakoa',
      title: 'Real-time image classifier',
      lede: 'ViT and hybrid ViT-CNN models that detect images containing valuable assets.',
      bullets: [
        'Collected 80,000+ images and built a Hugging Face API pipeline for training data.',
        'Cut latency by 75% with TorchScript compilation, knowledge distillation, and INT8 quantization.',
      ],
      tags: ['Computer vision', 'Model compression', 'Hugging Face'],
    },
    {
      dates: ['Python, OpenCV,', 'TensorFlow, ROS'],
      place: 'Coursework',
      title: 'ROS autonomous vehicle',
      lede: 'An end-to-end autonomous driving system in ROS, running in the Gazebo simulator.',
      bullets: [
        'Deployed neural networks for perception and control.',
        'Trained a CNN via imitation learning to follow lanes and navigate from camera input.',
        'Built an OpenCV preprocessing and labeling pipeline to generate supervised training data.',
      ],
      tags: ['Imitation learning', 'Robotics', 'Simulation'],
    },
  ],
  software: [
    {
      dates: '2024',
      place: 'Sonic Incytes',
      title: 'Liver health assessment platform',
      lede: 'A web-based diagnostic platform for a medical device, built in a 3-person agile team.',
      bullets: [
        'C++/JavaScript backend with a WebSocket server for low-latency data exchange between device code and a browser GUI.',
        'Python REST API managing SQLite databases for patient and device records.',
      ],
      tags: ['C++', 'Python', 'WebSockets', 'REST'],
    },
    {
      dates: '2026',
      place: 'Personal',
      title: 'This website',
      lede: 'A static site built with Astro, with no client-side framework.',
      bullets: [
        'Automatic dark and light themes, a responsive layout, and accessible markup.',
        'Linted in CI and deployed to GitHub Pages with GitHub Actions.',
      ],
      tags: ['Astro', 'CSS', 'GitHub Actions'],
      link: {
        href: 'https://github.com/ColeRowellLove/colerowelllove.github.io',
        label: 'View source on GitHub',
      },
    },
  ],
};

export const skills = [
  { label: 'Programming languages', value: 'Python, C++, MATLAB, Java, SQL' },
  {
    label: 'ML and data science',
    value:
      'PyTorch, TensorFlow/Keras, Hugging Face, OpenCV, scikit-learn, NumPy, Pandas, Matplotlib',
  },
  { label: 'Tools', value: 'Docker, AWS, GCP, Git, Linux, Jira, Confluence' },
];

export const education = {
  dates: 'Sep 2020 – May 2026',
  place: 'Vancouver, BC',
  title: 'University of British Columbia',
  org: 'Bachelor of Applied Science, Engineering Physics',
  note: 'Cumulative average: 90.4%',
};

export const awards = [
  {
    dates: 'Aug 2025',
    title: 'Charles and Jane Banks Scholarship',
    org: 'University of British Columbia',
    lede: 'Awarded on the recommendation of the Faculties to continuing undergraduates in Science, Applied Science, Forestry, Land and Food Systems, and Pharmaceutical Sciences who have completed at least one year.',
  },
  {
    dates: 'May 2025',
    title: 'Undergraduate Summer Research Award (USRA)',
    org: 'University of British Columbia',
    lede: 'An NSERC award that funds undergraduate research experiences for students with strong research potential; roughly 3,000 are offered each year across Canada.',
  },
  {
    dates: 'Sep 2022 and 2023',
    title: 'Engineering Scholarship',
    org: 'University of British Columbia',
    lede: 'Endowed by alumni and friends for Engineering students and awarded on the recommendation of the Faculty of Applied Science.',
  },
  {
    dates: 'Sep 2022 and 2023',
    title: 'Trek Excellence Scholarship for Continuing Students',
    org: 'University of British Columbia',
    lede: 'A $1,500 scholarship offered to the top 5% of undergraduate domestic students at UBC Vancouver.',
  },
];

export const interests = [
  {
    label: 'Staying active',
    pick: { kind: 'Hike', text: 'Garibaldi Lake, BC' },
    also: 'Gym, cycling',
  },
  {
    label: 'Watching sports',
    pick: { kind: 'Team', text: 'Seattle Seahawks' },
    also: 'NFL, fantasy football, UFC',
  },
  { label: 'Music', pick: { kind: 'Artist', text: 'Elliott Smith' }, also: 'EDM, rock, rap' },
  {
    label: 'Reading and learning',
    pick: { kind: 'Book', text: 'The Power of Now, by Eckhart Tolle' },
    also: 'Self-help books, AI',
  },
];
