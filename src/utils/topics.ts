/*
To add:

Product Management
Product Marketing

Political Philosophy
Philosophy of science
Epistemology

English literature
French literature
Creative writing

C++ programming
Python programming
Rust programming

History of Buddhism
History of Judaism

Information theory
Chaos theory

Deep Learning
SQL Fundamentals

Classical mechanics
Quantum physics
Theory of relativity

Chemistry

Architecture
Oceanology

Dermatology

*/

export const subjects = [
  {
    id: 221,
    name: "Blockchain Development",
    status: "open",
    type: "IT",
    version: 2,
    isTop: true,
    description: "Learn blockchain engineering, marketing, product development and legal aspects of building decentralized financial systems.",
    categories: [
      {
        category: "Blockchain fundamentals",
        topics: [
          {
            title: "Distributed ledger technology (DLT)",
            type: "lecture"
          },
          {
            title: "Consensus mechanisms",
            type: "lecture"
          },
          {
            title: "Consensus mechanisms",
            type: "laboratory",
            task: "Write down at least four consensus mechanisms. You need to describe their key features and differences.",
          },
          {
            title: "Types of tokens",
            type: "lecture"
          },
          {
            title: "Blockchain types",
            type: "lecture"
          },
        ],
      },
      {
        category: "Decentralized protocols",
        topics: [
          {
            title: "Bitcoin",
            type: "lecture"
          },
          {
            title: "Bitcoin blockchain",
            type: "discussion",
            person: "Satoshi Nakamoto",
            personProfile: "",
          },
          {
            title: "Ethereum",
            type: "lecture"
          },
          {
            title: "Ethereum blockchain",
            type: "discussion",
            person: "Vitalik Buterin",
          },
          {
            title: "Filecoin",
            type: "lecture"
          },
          {
            title: "Arweave",
            type: "lecture"
          },
        ],
      },
      {
        category: "Smart contracts",
        topics: [
          {
            title: "Smart contract security",
            type: "lecture"
          },
          {
            title: "Solidity programming",
            type: "lecture"
          },
          {
            title: "Solidity programming language",
            type: "laboratory",
            task: "Write a smart contract in Solidity that can manage a simple banking system.",
          },
          {
            title: "Smart contract testing",
            type: "laboratory",
            task: "Write test cases for the smart contract that can manage a simple banking system.",
          },
          {
            title: "Oracles",
            type: "lecture"
          },
        ],
      },
      {
        category: "Decentralized applications",
        topics: [
          {
            title: "Decentralized finance (DeFi) applications",
            type: "lecture"
          },
          {
            title: "Non-fungible tokens (NFTs)",
            type: "lecture"
          },
          {
            title: "Decentralized identity",
            type: "lecture"
          },
          {
            title: "Decentralized social media",
            type: "lecture"
          },
          {
            title: "Decentralized marketplaces",
            type: "lecture"
          },
        ],
      },
      {
        category: "Blockchain deployment and management",
        topics: [
          {
            title: "Blockchain deployment options",
            type: "lecture"
          },
          {
            title: "Node management",
            type: "laboratory",
            task: "Set up and configure a node for the Ethereum network.",
          },
          {
            title: "Blockchain infrastructure management",
            type: "lecture"
          },
          {
            title: "Blockchain maintenance and upgrades",
            type: "lecture"
          },
          {
            title: "Legal and regulatory considerations",
            type: "lecture"
          },
        ],
      },
    ]
  },
  {
    id: 223,
    name: "Product Management",
    status: "open",
    type: "Business",
    version: 2,
    isTop: true,
    description: "The Product Management course teaches the fundamentals of product management, including defining product vision and strategy, conducting market research, creating and prioritizing product roadmaps, developing and launching products, measuring and optimizing product performance, and using product management tools and techniques. Students will learn how to apply these skills to drive product success in today's competitive market..",
    categories: [
      {
        category: "Product strategy and roadmap",
        topics: [
          {
            title: "Product management overview",
            type: "lecture"
          },
          {
            title: "Defining product vision and strategy",
            type: "lecture"
          },
          {
            title: "Market research and analysis",
            type: "laboratory",
            task: "Conduct market research and analysis for a product of your choice and present your findings.",
          },
          {
            title: "Creating and prioritizing product roadmap",
            type: "laboratory",
            task: "Create a product roadmap for a product of your choice, including key milestones and prioritization.",
          },
        ],
      },
      {
        category: "Product development and launch",
        topics: [
          {
            title: "Product design and user experience",
            type: "lecture"
          },
          {
            title: "Product development process",
            type: "lecture"
          },
          {
            title: "Agile development methodologies",
            type: "lecture"
          },
          {
            title: "Minimum viable product (MVP) development",
            type: "laboratory",
            task: "Develop an MVP for a product of your choice and present your results.",
          },
          {
            title: "Product launch and go-to-market strategy",
            type: "lecture"
          },
        ],
      },
      {
        category: "Product metrics and optimization",
        topics: [
          {
            title: "Key performance indicators (KPIs) and metrics",
            type: "lecture"
          },
          {
            title: "Data-driven decision making",
            type: "lecture"
          },
          {
            title: "A/B testing and experimentation",
            type: "laboratory",
            task: "Conduct an A/B test for a feature of a product and present your findings.",
          },
          {
            title: "Continuous product optimization",
            type: "lecture"
          },
        ],
      },
      {
        category: "Product management tools and techniques",
        topics: [
          {
            title: "Product management software",
            type: "lecture"
          },
          {
            title: "Product management frameworks",
            type: "lecture"
          },
          {
            title: "Stakeholder management",
            type: "lecture"
          },
          {
            title: "Product management best practices",
            type: "lecture"
          },
        ],
      },
    ],
  },
  {
    id: 224,
    name: "Product Marketing",
    status: "open",
    type: "Business",
    version: 1,
    isTop: false,
    description: "The Product Marketing course teaches students how to effectively promote and sell products in today's competitive market. Topics covered include creating effective product positioning, understanding customer personas, developing go-to-market strategies, launching and promoting products, and measuring marketing performance.",
    categories: [
      {
        category: "Product positioning and messaging",
        topics: [
          {
            title: "Introduction to product marketing",
            type: "lecture"
          },
          {
            title: "Understanding customer personas",
            type: "lecture"
          },
          {
            title: "Creating effective product positioning",
            type: "laboratory",
            task: "Develop product positioning for a product of your choice based on customer research and present your findings.",
          },
        ],
      },
      {
        category: "Go-to-market strategy",
        topics: [
          {
            title: "Developing a go-to-market strategy",
            type: "lecture"
          },
          {
            title: "Product launch planning",
            type: "lecture"
          },
          {
            title: "Marketing channels and tactics",
            type: "laboratory",
            task: "Develop a go-to-market strategy and marketing plan for a new product launch and present your plan.",
          },
        ],
      },
      {
        category: "Measuring marketing performance",
        topics: [
          {
            title: "Key performance indicators (KPIs)",
            type: "lecture"
          },
          {
            title: "Marketing analytics",
            type: "lecture"
          },
          {
            title: "Reporting and optimization",
            type: "laboratory",
            task: "Set up and analyze marketing KPIs for a product campaign and present your findings with recommendations for optimization.",
          },
        ],
      },
    ],
  },
  {
    id: 222,
    name: "Mycology",
    status: "open",
    type: "Science",
    version: 2,
    description: "Mycology is the branch of biology concerned with the study of fungi, including their genetic and biochemical properties, their taxonomy and their use to humans, including as a source for tinder, traditional medicine, food, and entheogens, as well as their dangers, such as toxicity or infection.",
    "categories": [
      {
        category: "Introduction to Mycology",
        "topics": [
          {
            title: "Mycology History and Movements",
            type: "lecture"
          },
          {
            title: "Classification and Morphology",
            type: "lecture"
          },
          {
            title: "Growth and Development",
            type: "lecture"
          },
          {
            title: "Pathology and Control",
            type: "lecture"
          }
        ],
      },
    ],
  },
]

export const oldSubjects = [
  {
    id: 1,
    name: "Blockchain Development",
    status: "open",
    type: "IT",
    categories: [
      {
        category: "Blockchain fundamentals",
        topics: [
          "Distributed ledger technology (DLT)",
          "Consensus mechanisms",
          "Tokenization concepts",
          "Blockchain types",
        ],
      },
      {
        category: "Smart contract platforms",
        topics: [
          "Ethereum",
          "Binance Smart Chain",
          "Cardano",
          "Solana",
          "Polkadot",
          "Avalanche",
        ],
      },
      {
        category: "Smart contract programming languages",
        topics: [
          "Solidity",
          "Vyper",
          "Rust",
          "Plutus",
          "Development frameworks",
          "Integrated development environments",
        ],
      },
      {
        category: "Smart contract design patterns and best practices",
        topics: [
          "Contract structure and organization",
          "Function visibility and access control",
          "Reentrancy prevention",
          "Error handling and exception management",
          "Gas optimization",
          "Upgradeability and modularity",
        ],
      },
      {
        category: "Smart contract security",
        topics: [
          "Common vulnerabilities (reentrancy attacks, integer overflows",
          "Security audits and tools",
          "Secure coding practices",
          "Formal verification",
        ],
      },
      {
        category: "Testing and deployment",
        topics: [
          "Writing unit and integration tests",
          "Local blockchain setup",
          "Test networks",
          "Deployment to mainnet",
        ],
      },
      {
        category: "Decentralized application (DApp) integration",
        topics: [
          "Front-end frameworks",
          "Web3.js, ethers.js",
          "Decentralized storage solutions",
          "Decentralized identity",
        ],
      },
      {
        category: "Standards and interoperability",
        topics: [
          "ERC20, ERC721, ERC1155 token standards",
          "EIPs (Ethereum Improvement Proposals)",
          "Cross-chain communication and bridges",
        ],
      },
      {
        category: "DeFi (Decentralized Finance) concepts",
        topics: [
          "Decentralized exchanges (DEXes)",
          "Lending platforms",
          "Yield farming",
          "Stablecoins",
          "Oracles and data providers",
          "Liquidity pools",
        ],
      },
      {
        category: "Legal, regulatory, and compliance aspects",
        topics: [
          "Smart contract legal implications",
          "Security and utility tokens",
          "Data privacy regulations",
          "Anti-money laundering (AML) and know your customer (KYC)",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Dermatology",
    status: "open",
    type: "Healthcare",
    "categories": [
      {
        "category": "Introduction to Dermatology",
        "topics": [
          "Overview of Dermatology",
          "Skin Anatomy and Physiology",
          "Diagnostic Tools in Dermatology"
        ]
      },
      {
        "category": "Inflammatory Skin Diseases",
        "topics": [
          "Atopic Dermatitis",
          "Psoriasis",
          "Acne Vulgaris",
          "Rosacea"
        ]
      },
      {
        "category": "Infectious Skin Diseases",
        "topics": [
          "Bacterial Skin Infections",
          "Viral Skin Infections",
          "Fungal Skin Infections",
          "Parasitic Skin Infections"
        ]
      },
      {
        "category": "Skin Cancer",
        "topics": [
          "Melanoma",
          "Non-Melanoma Skin Cancer",
          "Actinic Keratosis"
        ]
      },
      {
        "category": "Cosmetic Dermatology",
        "topics": [
          "Chemical Peels",
          "Botulinum Toxin Injections",
          "Dermal Fillers",
          "Laser Therapy"
        ]
      },
      {
        "category": "Dermatologic Surgery",
        "topics": [
          "Skin Biopsy",
          "Excisional Surgery",
          "Mohs Surgery"
        ],
      },
    ],
  },
  {
    "id": 3,
    "name": "Art History",
    "status": "open",
    type: "Arts and Humanities",
    "categories": [
      {
        "category": "Prehistoric and Ancient Art",
        "topics": [
          "Cave Paintings",
          "Egyptian Art",
          "Greek Art",
          "Roman Art"
        ]
      },
      {
        "category": "Medieval Art",
        "topics": [
          "Byzantine Art",
          "Romanesque Art",
          "Gothic Art"
        ]
      },
      {
        "category": "Renaissance Art",
        "topics": [
          "Italian Renaissance",
          "Northern Renaissance",
          "Baroque Art"
        ]
      },
      {
        "category": "Modern Art",
        "topics": [
          "Impressionism",
          "Post-Impressionism",
          "Fauvism",
          "Expressionism",
          "Surrealism",
          "Abstract Expressionism",
          "Pop Art"
        ]
      },
      {
        "category": "Contemporary Art",
        "topics": [
          "Installation Art",
          "Performance Art",
          "Video Art",
          "Street Art"
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "Political History",
    "status": "open",
    type: "History",
    "categories": [
      {
        "category": "Ancient Politics",
        "topics": [
          "Greek City-States",
          "Roman Republic",
          "Roman Empire",
          "Han Dynasty"
        ]
      },
      {
        "category": "Medieval Politics",
        "topics": [
          "Feudalism",
          "Holy Roman Empire",
          "Papacy",
          "Crusader States"
        ]
      },
      {
        "category": "Early Modern Politics",
        "topics": [
          "Absolutism",
          "Enlightened Absolutism",
          "American Revolution",
          "French Revolution"
        ]
      },
      {
        "category": "Modern Politics",
        "topics": [
          "Democracy",
          "Totalitarianism",
          "Cold War",
          "Decolonization"
        ]
      },
      {
        "category": "Contemporary Politics",
        "topics": [
          "International Relations",
          "Globalization",
          "Human Rights",
          "Terrorism"
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "Economic History",
    "status": "open",
    type: "History",
    "categories": [
      {
        "category": "Pre-Modern Economies",
        "topics": [
          "Agricultural Economies",
          "Feudal Economies",
          "Mercantilism",
          "Early Capitalism"
        ]
      },
      {
        "category": "Industrial Revolution",
        "topics": [
          "Mechanization",
          "Factory System",
          "Transportation Revolution",
          "Urbanization"
        ]
      },
      {
        "category": "Modern Economies",
        "topics": [
          "Keynesian Economics",
          "Monetarism",
          "Neoliberalism",
          "Globalization"
        ]
      },
    ]
  },
  {
    "id": 6,
    "name": "Theology",
    "status": "open",
    type: "History",
    "categories": [
      {
        "category": "World Religions",
        "topics": [
          "Christianity",
          "Islam",
          "Judaism",
          "Hinduism",
          "Buddhism",
          "Sikhism"
        ]
      },
      {
        "category": "Religious History",
        "topics": [
          "Ancient Religions",
          "Medieval Religions",
          "Modern Religions",
          "Comparative Religion"
        ]
      },
      {
        "category": "Religious Texts",
        "topics": [
          "The Bible",
          "The Quran",
          "The Torah",
          "The Bhagavad Gita",
          "The Tao Te Ching"
        ]
      },
      {
        "category": "Religious Philosophy",
        "topics": [
          "Ethics and Morality",
          "Theology",
          "Mysticism",
          "Spirituality"
        ]
      },
      {
        "category": "Religious Practices",
        "topics": [
          "Worship and Rituals",
          "Sacred Spaces and Places",
          "Pilgrimage",
          "Meditation and Prayer",
          "Religious Art and Architecture"
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "Psychology",
    "status": "open",
    type: "Healthcare",
    "categories": [
      {
        "category": "Foundations of Psychology",
        "topics": [
          "History of Psychology",
          "Research Methods in Psychology",
          "Biological Bases of Behavior",
          "Nature vs Nurture"
        ]
      },
      {
        "category": "Developmental Psychology",
        "topics": [
          "Child and Adolescent Development",
          "Adult Development and Aging",
          "Cognitive Development",
          "Social and Emotional Development"
        ]
      },
      {
        "category": "Abnormal Psychology",
        "topics": [
          "Mental Disorders",
          "Psychotherapy",
          "Psychopharmacology",
          "Stress and Coping"
        ]
      },
      {
        "category": "Social Psychology",
        "topics": [
          "Social Cognition",
          "Attitudes and Persuasion",
          "Prejudice and Discrimination",
          "Group Dynamics"
        ]
      },
      {
        "category": "Cognitive Psychology",
        "topics": [
          "Memory",
          "Thinking and Problem Solving",
          "Attention and Perception",
          "Language and Communication"
        ]
      },
      {
        "category": "Personality Psychology",
        "topics": [
          "Trait Theory",
          "Psychodynamic Theory",
          "Humanistic Theory",
          "Assessment of Personality"
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Chemistry",
    "status": "open",
    type: "Science",
    "categories": [
      {
        "category": "General Chemistry",
        "topics": [
          "Atoms and Molecules",
          "Chemical Bonds",
          "Stoichiometry",
          "Thermochemistry"
        ]
      },
      {
        "category": "Organic Chemistry",
        "topics": [
          "Functional Groups",
          "Reactions of Organic Compounds",
          "Stereochemistry",
          "Biochemistry",
          "Aromatic Compounds",
          "Alcohols and Phenols",
          "Ethers and Epoxides",
          "Aldehydes and Ketones",
          "Carboxylic Acids and Their Derivatives",
          "Amines",
          "Carbohydrates",
          "Lipids",
          "Proteins",
          "Nucleic Acids"
        ]
      },
      {
        "category": "Inorganic Chemistry",
        "topics": [
          "Periodic Table",
          "Acids and Bases",
          "Coordination Compounds",
          "Organometallic Chemistry"
        ]
      },
      {
        "category": "Physical Chemistry",
        "topics": [
          "Thermodynamics",
          "Quantum Chemistry",
          "Electrochemistry",
          "Surface Chemistry"
        ]
      },
      {
        "category": "Analytical Chemistry",
        "topics": [
          "Quantitative Analysis",
          "Qualitative Analysis",
          "Spectroscopy",
          "Chromatography"
        ]
      },
      {
        "category": "Materials Chemistry",
        "topics": [
          "Polymers",
          "Nanotechnology",
          "Catalysis",
          "Solid State Chemistry"
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Introduction to Machine Learning",
    status: "open",
    type: "IT",
    categories: [
      {
        category: "Machine Learning Fundamentals",
        topics: [
          "Introduction to Machine Learning",
          "Supervised Learning",
          "Unsupervised Learning",
          "Reinforcement Learning",
          "Bias-Variance Tradeoff",
        ],
      },
      {
        category: "Supervised Learning Algorithms",
        topics: [
          "Linear Regression",
          "Logistic Regression",
          "Decision Trees",
          "Random Forests",
          "Naive Bayes",
          "Support Vector Machines",
          "K-Nearest Neighbors",
        ],
      },
      {
        category: "Unsupervised Learning Algorithms",
        topics: [
          "Clustering",
          "Principal Component Analysis",
          "Association Rule Mining",
          "Anomaly Detection",
        ],
      },
      {
        category: "Deep Learning",
        topics: [
          "Introduction to Neural Networks",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
          "Autoencoders",
          "Generative Adversarial Networks",
        ],
      },
      {
        category: "Machine Learning Applications",
        topics: [
          "Natural Language Processing",
          "Computer Vision",
          "Time Series Analysis",
          "Recommender Systems",
          "Deep Reinforcement Learning",
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Python Programming",
    status: "open",
    type: "IT",
    categories: [
      {
        category: "Python Basics",
        topics: [
          "Introduction to Python",
          "Variables and Data Types",
          "Operators and Expressions",
          "Conditional Statements",
          "Loops",
          "Functions",
          "Modules and Packages",
          "File Handling",
        ],
      },
      {
        category: "Python Advanced Topics",
        topics: [
          "Object-Oriented Programming in Python",
          "Inheritance and Polymorphism",
          "Exception Handling",
          "Regular Expressions",
          "Lambda Functions and Map-Reduce",
          "Decorators",
          "Generators",
          "Threading and Concurrency",
        ],
      },
      {
        category: "Python Libraries",
        topics: [
          "NumPy",
          "Pandas",
          "Matplotlib",
          "Scikit-learn",
          "TensorFlow",
          "Keras",
        ],
      },
      {
        category: "Python Applications",
        topics: [
          "Web Development with Flask",
          "Web Scraping with Beautiful Soup and Selenium",
          "Game Development with Pygame",
          "Data Science with Python",
          "Machine Learning with Python",
        ],
      },
    ],
  },
  {
    id: 11,
    name: "SQL Fundamentals",
    status: "open",
    type: "IT",
    categories: [
      {
        category: "SQL Basics",
        topics: [
          "Introduction to SQL",
          "Data Definition Language (DDL)",
          "Data Manipulation Language (DML)",
          "Querying Data",
          "Filtering Data",
          "Sorting Data",
          "Joining Tables",
        ],
      },
      {
        category: "Advanced SQL",
        topics: [
          "Subqueries",
          "Aggregation Functions",
          "Grouping Data",
          "Window Functions",
          "Common Table Expressions",
          "Stored Procedures",
          "Triggers",
        ],
      },
      {
        category: "Relational Database Design",
        topics: [
          "Relational Database Concepts",
          "Entity-Relationship (ER) Modeling",
          "Normalization",
          "Referential Integrity",
          "Indexes",
          "Views",
        ],
      },
      {
        category: "SQL for Data Analysis",
        topics: [
          "Data Analysis with SQL",
          "Data Warehousing",
          "OLAP (Online Analytical Processing)",
          "Data Mining",
          "Business Intelligence (BI)",
          "Reporting",
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Internet Marketing",
    status: "open",
    type: "IT",
    categories: [
      {
        category: "Marketing Fundamentals",
        topics: [
          "Introduction to Marketing",
          "Marketing Mix",
          "Market Research",
          "Consumer Behavior",
          "Segmentation, Targeting and Positioning",
          "Marketing Strategy",
          "Marketing Planning",
          "Marketing Metrics",
        ],
      },
      {
        category: "Digital Marketing Channels",
        topics: [
          "Search Engine Optimization (SEO)",
          "Pay-Per-Click Advertising (PPC)",
          "Social Media Marketing (SMM)",
          "Content Marketing",
          "Email Marketing",
          "Mobile Marketing",
          "Affiliate Marketing",
          "Influencer Marketing",
        ],
      },
      {
        category: "Digital Marketing Tools",
        topics: [
          "Google Analytics",
          "Marketing Automation",
          "Customer Relationship Management (CRM)",
          "A/B Testing",
          "Heatmaps and Click Tracking",
          "Web Analytics",
          "Conversion Rate Optimization (CRO)",
        ],
      },
      {
        category: "E-commerce",
        topics: [
          "Introduction to E-commerce",
          "Online Store Design and Development",
          "Payment Gateway Integration",
          "Shipping and Logistics",
          "E-commerce Analytics",
          "E-commerce Marketing",
          "E-commerce Platforms",
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Creative Writing",
    status: "open",
    type: "Arts and Humanities",
    categories: [
      {
        category: "Writing Fundamentals",
        topics: [
          "Introduction to Creative Writing",
          "Elements of Fiction Writing",
          "Elements of Poetry Writing",
          "Narrative Voice and Point of View",
          "Dialogue Writing",
          "Character Development",
          "Setting and Description",
          "Plot and Structure",
        ],
      },
      {
        category: "Writing Techniques",
        topics: [
          "Imagery and Figurative Language",
          "Metaphor and Simile",
          "Symbolism",
          "Irony and Satire",
          "Foreshadowing and Suspense",
          "Flashback and Flashforward",
          "Repetition and Parallelism",
          "Showing vs. Telling",
        ],
      },
      {
        category: "Writing Genres",
        topics: [
          "Short Story Writing",
          "Novel Writing",
          "Poetry Writing",
          "Screenplay Writing",
          "Playwriting",
          "Creative Nonfiction Writing",
          "Memoir Writing",
          "Travel Writing",
        ],
      },
      {
        category: "Publishing and Marketing",
        topics: [
          "Submitting and Querying",
          "Editing and Revising",
          "Self-Publishing",
          "Traditional Publishing",
          "Book Design and Cover Art",
          "Author Branding",
          "Book Marketing and Promotion",
          "Building an Author Platform",
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Robotics Fundamentals",
    status: "open",
    type: "Engineering",
    categories: [
      {
        category: "Robotics Basics",
        topics: [
          "Introduction to Robotics",
          "Robotics History and Future",
          "Robot Components and Types",
          "Robot Kinematics and Dynamics",
          "Robot Sensors and Actuators",
          "Robot Programming",
        ],
      },
      {
        category: "Robotics Technologies",
        topics: [
          "Robot Vision",
          "Robot Control",
          "Robot Navigation",
          "Artificial Intelligence and Machine Learning for Robotics",
          "Robot Localization and Mapping",
          "Robot Manipulation and Grasping",
        ],
      },
      {
        category: "Robotics Applications",
        topics: [
          "Industrial Robotics",
          "Medical Robotics",
          "Service Robotics",
          "Military Robotics",
          "Space Robotics",
          "Agricultural Robotics",
        ],
      },
      {
        category: "Robotics Design and Development",
        topics: [
          "Robot Design",
          "Robot Prototyping",
          "Robot Simulation",
          "Robot Testing and Validation",
          "Robotics Safety and Ethics",
          "Robotics Entrepreneurship",
        ],
      },
    ],
  },
  {
    id: 15,
    name: "Electrical Engineering",
    status: "open",
    type: "Engineering",
    categories: [
      {
        category: "Electrical Fundamentals",
        topics: [
          "Introduction to Electrical Engineering",
          "Electrical Circuits and Components",
          "Electromagnetic Fields and Waves",
          "Analog and Digital Electronics",
          "Semiconductor Devices",
          "Microelectronics",
        ],
      },
      {
        category: "Power Systems",
        topics: [
          "Power Generation and Transmission",
          "Electricity Distribution Systems",
          "Power Electronics",
          "Electric Motors and Drives",
          "Electric Power Quality",
          "Renewable Energy Systems",
        ],
      },
      {
        category: "Control Systems",
        topics: [
          "Feedback Control Systems",
          "Linear and Nonlinear Control Systems",
          "Digital Control Systems",
          "Robust Control",
          "Optimal Control",
          "Adaptive Control",
        ],
      },
      {
        category: "Electrical Applications",
        topics: [
          "Electrical Machines",
          "Power Electronics Applications",
          "Robotics and Automation",
          "Digital Signal Processing",
          "Communication Systems",
          "Wireless Networks",
        ],
      },
    ],
  },
  {
    id: 16,
    name: "Architecture",
    status: "open",
    type: "Arts and Humanities",
    categories: [
      {
        category: "Architecture History and Theory",
        topics: [
          "Introduction to Architecture",
          "Architectural History and Movements",
          "Architectural Theory and Criticism",
          "Design Principles and Elements",
          "Building Typologies",
          "Urban Planning and Design",
        ],
      },
      {
        category: "Architectural Design",
        topics: [
          "Architectural Drawing and Drafting",
          "Building Information Modeling (BIM)",
          "Architectural Visualization",
          "Sustainable Design and Green Architecture",
          "Interior Design",
          "Landscape Architecture",
        ],
      },
      {
        category: "Building Systems and Technology",
        topics: [
          "Structural Engineering",
          "Building Materials and Construction",
          "HVAC Systems",
          "Plumbing and Sanitation Systems",
          "Lighting Systems",
          "Acoustics and Sound Control",
        ],
      },
      {
        category: "Architectural Practice and Management",
        topics: [
          "Project Management",
          "Construction Contract Documents",
          "Building Codes and Regulations",
          "Building Inspection and Testing",
          "Marketing and Business Development",
          "Professional Ethics and Responsibilities",
        ],
      },
    ],
  },
  {
    id: 17,
    name: "Oceanology",
    status: "open",
    type: "Science",
    categories: [
      {
        "category": "Introduction to Oceanography",
        "topics": [
          "Introduction to the World Ocean",
          "Oceanography History and Movements",
          "Physical Properties of Seawater",
          "Ocean Circulation and Currents",
          "Ocean Waves and Tides",
          "Marine Ecology and Ecosystems",
        ]
      },
      {
        "category": "Marine Geology",
        "topics": [
          "Plate Tectonics and Seafloor Spreading",
          "Sedimentology and Seafloor Morphology",
          "Volcanism and Hydrothermal Vents",
          "Coral Reefs and Carbonate Platforms",
          "Marine Minerals and Resources",
          "Seismic Surveys and Ocean Mapping",
        ]
      },
      {
        "category": "Marine Biology",
        "topics": [
          "Marine Organisms and Biodiversity",
          "Plankton and Nekton",
          "Marine Food Webs and Trophic Interactions",
          "Marine Biogeochemistry and Climate Change",
          "Marine Conservation and Management",
          "Marine Biotechnology and Biomimicry",
        ]
      }
    ]
  },
  {
    "id": 18,
    "name": "Mycology",
    "status": "open",
    "type": "Natural Sciences",
    "categories": [
      {
        "category": "Introduction to Mycology",
        "topics": [
          "Mycology History and Movements",
          "Classification and Morphology",
          "Growth and Development",
          "Ecology and Biodiversity",
          "Pathology and Control",
          "Biotechnology and Applications",
        ]
      },
      {
        "category": "Fungal Diversity and Taxonomy",
        "topics": [
          "Mycorrhizae and Symbiotic Relationships",
          "Fungal Genetics and Molecular Biology",
          "Lichenology and Fungal-Plant Interactions",
          "Fungal Biogeography and Evolution",
          "Fungal Conservation and Biodiversity",
          "Fungal Systematics and Nomenclature",
        ]
      },
      {
        "category": "Applied Mycology",
        "topics": [
          "Agriculture and Horticulture",
          "Bioremediation and Decomposition",
          "Fermentation and Biotechnology",
          "Fungal Food and Beverage Production",
          "Fungal Medicine and Pharmacology",
          "Fungal Bioprospecting and Natural Products",
        ]
      }
    ]
  }
]