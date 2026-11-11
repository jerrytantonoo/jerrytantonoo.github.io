/* ==========================================================================
   SITE CONTENT — this is the only file you need to edit to update your site.
   --------------------------------------------------------------------------
   HOW PLACEHOLDERS WORK
   • Anything wrapped in [[double brackets]] is a placeholder. While
     `showPlaceholderHints` is true, placeholders are highlighted on the page
     with an orange dashed box so you can spot what still needs filling in.
   • Replace each placeholder with your real information (and remove the
     brackets). When you're done, set `showPlaceholderHints: false`.
   • With hints OFF, any field that is ONLY a placeholder (e.g. "[[Describe…]]")
     is hidden automatically, so unfinished sections never go public.

   FORMATTING
   • Wrap a word in *asterisks* to set it in the italic serif accent font.
   • Leave a link as "" (empty) to hide it. Never leave a fake link.
   • Add `hidden: true` to a project, school or list item to keep it in this
     file without showing it on the site.
   ========================================================================== */

window.SITE = {
  settings: {
    showPlaceholderHints: false,
  },

  /* ---------------------------------------------------------------- PERSON */
  person: {
    name: "Jerry Tantono",
    initials: "JT",
    role: "AI & Data Engineering Student",
    school: "Nanyang Polytechnic",
    location: "Singapore",
    timezone: "Asia/Singapore",
    timezoneLabel: "SGT",
    // Optional status line at the top of the hero, e.g.
    // availability: { open: true, label: "Open to internships from Mar 2027" },
    availability: { open: false, label: "" },
    // Formal photo, shown beside your name at the top of the page.
    // (portrait.jpg is the full-length original; portrait-hero.jpg is a closer crop.)
    portrait: "assets/img/portrait-hero.jpg",
    portraitAlt: "Jerry Tantono in a black suit with a champagne tie and a red rose boutonniere",
    // Which part of the photo stays in frame (horizontal% vertical%).
    portraitPosition: "50% 20%",
  },

  /* ------------------------------------------------------------------ HERO */
  hero: {
    headline: "Turning data into *decisions* — and repetitive work into *automation*.",
    description:
      "I'm a Year 2 AI & Data Engineering student at Nanyang Polytechnic, Singapore. I build data pipelines, IoT systems and dashboards — and bring a retail and coaching background that keeps me focused on real people and real business problems.",
    meta: [
      { label: "Studying", value: "AI & Data Engineering, NYP · Year 2" },
      { label: "Focus", value: "Data · IoT · ML · Automation" },
      { label: "Background", value: "Retail operations & badminton coaching" },
      { label: "Long-term goal", value: "Travel the world" },
    ],
    // Scoreboard under the hero. Numbers count up when they scroll into view.
    // Only use real figures from your own work.
    stats: [
      { value: 84106, label: "Sensor readings processed", note: "WSH-Tech" },
      { value: 10, label: "Global datasets integrated", note: "Diabetes Economy" },
      { value: 5, label: "Projects on this site", note: "Data · IoT · Strategy" },
      { value: 6, label: "Tournament results", note: "Badminton" },
    ],
    // Words in the scrolling band under the hero.
    marquee: ["Data pipelines", "IoT systems", "Dashboards", "Machine learning", "Badminton", "Ultimate frisbee", "Running", "Football", "Backpacking"],
    // Small passport-style stamp beside your photo (Singapore's coordinates).
    stamp: { top: "Based in Singapore", bottom: "1.35°N · 103.82°E", centre: "SG" },
  },

  /* ----------------------------------------------------------------- ABOUT */
  about: {
    // Casual photo, shown beside the About text.
    photo: "assets/img/about-casual.jpg",
    photoAlt: "Jerry Tantono taking a mirror selfie in a striped shirt, framed by a wooden doorway and tropical garden",
    photoPosition: "50% 62%",
    lead:
      "I'm interested in the point where data stops being a spreadsheet and starts being *useful* — a prediction, a pipeline that runs itself, an alert that reaches the right person in time.",
    paragraphs: [
      "I'm Jerry, a Year 2 student in the Diploma in AI & Data Engineering at Nanyang Polytechnic. Before NYP, I took Pure Sciences and Additional Mathematics for my O-Levels at Guangyang Secondary School.",
      "At NYP I've worked across the whole data journey: streaming wearable sensor data into a real-time construction safety dashboard, integrating ten global datasets into Power BI dashboards on the economics of diabetes, and building IoT control systems for the classroom.",
      "Outside class, I've worked as a sales associate at URBNZD CO and SunnyHills, where I handled customers, orders, spreadsheets and stock reports. I also coach badminton. Both jobs showed me how much of a business runs on repetitive, manual work, and how much of it could be automated.",
      "Long term, I want to travel the world and see how people live and work in different places. Right now I'm looking for internships where I can learn from experienced engineers and contribute to real systems.",
    ],
    facts: [
      { label: "Studying", value: "Diploma in AI & Data Engineering, Nanyang Polytechnic" },
      { label: "Year", value: "Year 2 (2025 – present)" },
      { label: "Based in", value: "Singapore" },
      { label: "Nationality", value: "Indonesian" },
      { label: "CCA", value: "Badminton" },
    ],
    interests: [
      "Artificial intelligence",
      "Data engineering",
      "IoT & sensors",
      "Automation",
      "Business strategy",
      "Badminton",
      "Ultimate frisbee",
      "Running",
      "Football",
      "Travel & backpacking",
      "Interior design & architecture",
      "Event planning",
    ],
  },

  /* --------------------------------------------------------------- TOOLKIT
     Tools you've actually used, each with where you used it. No ratings:
     the evidence does the talking. Keep this in sync with your CV.
     ----------------------------------------------------------------------- */
  toolkit: {
    intro: "No self-rated skill bars. Every tool here is tied to the project, course or job where I used it.",
    groups: [
      {
        title: "Data & analytics",
        items: [
          { name: "Python", used: ["WSH-Tech gateway", "Diabetes data prep"] },
          { name: "SQL / SQLite", used: ["WSH-Tech"] },
          { name: "Power BI · DAX · Power Query", used: ["Diabetes Economy"] },
          { name: "Excel / Google Sheets", used: ["Retail stock reports", "Diabetes master dataset"] },
          { name: "CRISP-DM", used: ["Diabetes Economy"] },
        ],
      },
      {
        title: "IoT & embedded",
        items: [
          { name: "Arduino (C++)", used: ["Smart Classroom", "WSH-Tech"] },
          { name: "Bluetooth Low Energy (Bleak)", used: ["WSH-Tech"] },
          { name: "Sensors: IMU, KY-038, DHT11", used: ["WSH-Tech", "Smart Classroom"] },
          { name: "Streamlit", used: ["WSH-Tech dashboard"] },
        ],
      },
      {
        title: "AI & cloud",
        items: [
          { name: "Machine & deep learning", used: ["NYP coursework"] },
          { name: "NLP & computer vision", used: ["NYP coursework"] },
          { name: "AWS (EC2, VPC, RDS, S3) · Flask", used: ["Cloud Computing coursework"] },
          { name: "Ethical & responsible AI", used: ["NYP coursework"] },
        ],
      },
      {
        title: "Strategy & design",
        items: [
          { name: "Market research & KPI design", used: ["Shopee case study"] },
          { name: "Budgeting & rollout planning", used: ["Shopee case study"] },
          { name: "SketchUp", used: ["Interior design studio"] },
          { name: "Customer service & inventory", used: ["URBNZD CO", "SunnyHills"] },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- PROJECTS
     slug:   short id used in the URL (#work/slug). Letters, numbers, dashes.
     cover:  path to an image, e.g. "assets/img/projects/wsh-cover.jpg".
             Leave "" to use the built-in illustration chosen by `art`
             (logistics | dashboard | pipeline | traffic | floorplan |
              safety | cloud | web | chat | ml).
     team:   optional, shown in the project header.
     highlights: optional extra sections. Either one { title, text, items }
             or a list of them. `text` is a paragraph (or list of
             paragraphs), `items` is a bulleted list.
     gallery: screenshots/diagrams. Each item is either
             { src: "assets/img/projects/x.png", alt: "...", caption: "..." }
             or  { art: "pipeline", caption: "..." } for a built-in illustration.
     links:  leave "" to hide a button.
     hidden: true keeps a project in this file without showing it.
     ----------------------------------------------------------------------- */
  projects: [
    {
      slug: "shopee-pickup-points",
      order: 3,
      stats: [{ value: "US$10M", label: "rollout plan" }, { value: 30, label: "urban adoption target", suffix: "%" }, { value: 4, label: "automated circuit breakers" }],
      title: "Scaling Shopee Pickup Points",
      year: "January 2026",
      type: "Individual project · Business strategy",
      role: "Solo — research, analysis & strategy",
      featured: true,
      art: "logistics",
      cover: "assets/img/projects/shopee-cover.jpg",
      coverAlt: "Title slide of the Scaling Shopee Pickup Points case study, January 2026",
      summary:
        "A solo strategy case study on why Shopee users in Indonesia skip cheaper, faster pickup points for doorstep delivery — and a US$10M plan to change that.",
      tags: ["Business strategy", "E-commerce logistics", "Behavioural pricing", "Go-to-market", "KPIs & ROI", "Risk design"],
      tagsTitle: "Focus areas",
      overview: [
        "A solo strategy case study investigating why Shopee users in Indonesia bypass pickup points in favour of doorstep delivery, even though pickup is cheaper and faster, and proposing a US$10M behavioural, pricing and rollout plan to change it.",
        "The deck covers the full arc of a strategy proposal: the market problem, who to target, three strategic pillars, a 12-month go-to-market roadmap, budget, KPIs and ROI, and the risks that could break the plan.",
      ],
      problem: [
        "Pickup points deliver faster, cost less and fail less often, yet regional pickup use has stalled at around 9–14%. My research pointed to three barriers:",
        "*Awareness.* 82% of users discover new features through TikTok and Instagram rather than the app, and the pickup option often disappears at checkout because of hidden size limits or sellers who don't support it, so users stop looking for it.",
        "*Cost perception.* 70–75% of shoppers treat cheap delivery as a top priority, but platform-wide vouchers make home delivery feel free. A small pickup discount (US$0.50–1.00) doesn't outweigh the perceived \"effort tax\" of travelling to collect.",
        "*Habit and distance.* 62–82% of consumers prefer doorstep delivery, and 59% say they'd use pickup more if points were closer — interest drops sharply beyond a 1 km radius.",
      ],
      approach: [
        "I targeted three user groups: urban Gen Z (where the social-media discovery gap is), budget seekers (most likely to switch for savings) and commuters (who can collect on routes they already travel).",
        "The strategy rests on three pillars: *price-led behaviour change* (pickup is always the cheapest option, shown side by side at checkout), *convenience reframing* (rebranding to \"On-The-Way Pickup\", with map views of points near MRT and bus stops and 24/7 partner stores), and *social normalisation* (influencer content, pickup streaks, badges and in-app social nudges).",
        "I then split the US$10M budget across these levers, sequenced them into a quarterly roadmap, and added four automated operational safeguards so the network could scale without the pickup experience getting worse.",
      ],
      highlights: [
        {
          title: "Budget allocation",
          items: [
            "User incentives — US$5M (50%): first-time trial vouchers, ShopeeCoin rewards for 3-order streaks, and keeping pickup cheaper than home delivery",
            "Marketing & social — US$3M (30%): Gen Z influencer partnerships and \"life hack\" content on TikTok and Instagram",
            "UX & tech — US$1.5M (15%): the \"On-the-Way\" map, commute-based notifications and a speed-advantage tracker",
            "Retail & visibility — US$0.5M (5%): signage and branding at partner stores such as Alfamart and Indomaret",
          ],
        },
        {
          title: "12-month roadmap",
          items: [
            "Phase 1 · Awareness & trial (Jan–Mar): lifestyle-hack campaigns and \"First-Time Free\" vouchers to break the doorstep habit",
            "Phase 2 · Habit solidification (Apr–Jun): the 3-order streak with escalating rewards, turning a one-off trial into a routine",
            "Phase 3 · UX & path optimisation (Jul–Sep): geo-located suggestions along a user's commute, highlighting the 1-day speed advantage",
            "Phase 4 · Social proof & loyalty (Oct–Dec): social nudges at checkout, Eco-Saver badges and tiered loyalty status",
          ],
        },
        {
          title: "Risks & circuit breakers",
          text: "I rated four risks by likelihood and designed an automated safeguard for each:",
          items: [
            "Incentive decay (65%) → time-decay rewards: more coins for collecting within 3 hours, so shelves turn over without a bigger subsidy",
            "Merchant churn (30%) → the 45-second rule: a 3-tap retrieval flow so hand-offs are faster than a normal retail transaction",
            "Logistics bottlenecks (25%) → an 85% capacity cap: full hubs are hidden from the checkout map and demand is rerouted",
            "Parcel loss (2%) → QR chain-of-custody: courier and customer both scan, creating an audit trail for every parcel",
          ],
        },
      ],
      contributions: [
        "Individual project: I did the market research, problem analysis, user targeting, strategy design, roadmap, budget allocation, KPI design and risk planning myself.",
        "Built the 33-slide deck that presents the full proposal.",
      ],
      results: [
        "The proposal targets 30% pickup adoption in urban Indonesia over the investment period, with KPIs of 25% of platform volume via self-collection within 12 months, a stick rate above 60% after incentives end, 20% lower last-mile cost per parcel and 15% fewer failed deliveries.",
        "It projects US$25M–40M a year in logistics savings, with cost per parcel falling 15–22% as single-parcel doorstep stops become 50-parcel pickup stops. These are the proposal's targets and projections, not measured outcomes.",
      ],
      lessons: [
        "The biggest lesson was that people don't always pick the cheapest or fastest option. Pickup already won on price and speed, yet habit, effort and visibility kept users choosing doorstep delivery. Changing that meant designing around behaviour, not just cutting prices.",
        "I also learned that a strategy is only as strong as its safeguards. Planning for incentive decay, merchant fatigue and capacity limits made me think about how a plan could fail at scale, and to build automatic checks in from the start instead of reacting later.",
      ],
      gallery: [
        { src: "assets/img/projects/shopee-target.jpg", alt: "Slide stating a 30% expected pickup adoption in urban Indonesia with a US$10M investment", caption: "The headline target: 30% urban pickup adoption from a US$10M plan." },
        { src: "assets/img/projects/shopee-budget.jpg", alt: "Budget allocation table splitting US$10M across four categories", caption: "Budget allocation across user incentives, marketing, UX and retail visibility." },
        { src: "assets/img/projects/shopee-roadmap.jpg", alt: "Four-phase quarterly rollout roadmap", caption: "Phased roadmap: awareness, habit, UX optimisation, then social proof and loyalty." },
        { src: "assets/img/projects/shopee-risks.jpg", alt: "Risk prevention slide describing four automated circuit breakers", caption: "Risk prevention: the four automated circuit breakers." },
      ],
      links: { github: "", demo: "" },
    },
    {
      slug: "global-diabetes-economy",
      order: 2,
      stats: [{ value: 10, label: "datasets, 7 providers" }, { value: 221, label: "countries in one panel" }, { value: "2.11bn", label: "cases forecast by 2045" }, { value: "81×", label: "funding gap exposed" }],
      title: "The Global Diabetes Economy",
      year: "August 2026",
      type: "Team project · Data Preparation & Visualisation (EG2A12)",
      role: "2045 projection & economic cost dashboards",
      team: "Team Alpha Squad: Chris Kevin Seelan, Jerry Tantono, Chew Jia Le Kyle",
      featured: true,
      art: "dashboard",
      cover: "assets/img/projects/diabetes-2045-projection.jpg",
      coverPosition: "left top",
      coverAlt: "Power BI dashboard: 2045 Diabetes Projections & Future Risk, built by Jerry Tantono",
      summary:
        "Integrated 10 global datasets from 7 providers into a 221-country panel, then built Power BI dashboards on diabetes projections and economic cost.",
      tags: ["Power BI", "DAX & Power Query", "Python (pandas, NumPy)", "Google Colab", "Excel", "CRISP-DM", "Data integration", "Forecasting"],
      overview: [
        "A data analytics project on global diabetes risk and its economic burden, run end to end with the CRISP-DM process. Diabetes affected 589 million adults in 2024 and is projected to reach 853 million by 2050, with about 4 in 5 living in low- and middle-income countries.",
        "The team integrated 10 datasets from 7 providers (WHO, World Bank, NCD-RisC, IHME, FAOSTAT, FAO SUA and UN SDG) into one master panel covering 221 countries from 2010 to 2023: 3,094 rows × 33 columns, joined on ISO-3 country code and year.",
      ],
      problem: [
        "Which countries face the greatest risk of diabetes-driven healthcare system strain, and what indicators can identify these risks before healthcare capacity is overwhelmed?",
        "The findings were framed for four stakeholders: the WHO (where to invest in prevention), the World Bank (economic risk in borrower nations), pharmaceutical companies (demand planning) and insurers (risk pricing).",
      ],
      approach: [
        "We set five business objectives: find the countries under the greatest strain, explain what drives prevalence, build an early-warning signal, project cases to 2045, and cost the burden in DALYs (disability-adjusted life years).",
        "Data was cleaned in Python (pandas, NumPy and Matplotlib in Google Colab), exported as a typed Excel master dataset, then shaped in Power BI with Power Query, DAX measures and interactive slicers. Each member built two dashboard pages.",
      ],
      highlights: [
        {
          title: "Data preparation",
          items: [
            "Select & load: extracted only the fields we needed, including pre-filtering the 111 MB FAO SUA file to a single indicator",
            "Clean: handled missing values, dropped aggregate rows and de-duplicated FAOSTAT's overlapping \"China\" and \"China, mainland\" records",
            "Transform: aligned every country to ISO-3, reshaped World Bank data from wide to long, and interpolated slow-moving indicators",
            "Integrate: joined all tables on ISO-3 + year into one country-year panel, with a population-weighted World row as a benchmark",
            "Engineer: derived total cases, untreated diabetics, diabetics per physician, and 5-year BMI and prevalence change",
          ],
        },
        {
          title: "Challenges & fixes",
          items: [
            "Sources ended in different years (health data stops in 2022) → used a single 2022 snapshot for cross-visual comparisons",
            "CSV decimals were read as thousands separators → exported the master as a typed .xlsx so numbers load correctly",
            "Power BI can't merge separate dashboard files → rebuilt each page in one file, transferring the dataset and measures by hand",
            "NCD-RisC splits data by sex → averaged male and female rows into one national figure before joining",
          ],
        },
        {
          title: "Insights from my dashboards",
          items: [
            "The global diabetic population is projected to reach 2.11 billion by 2045, an 89.5% increase, driven mainly by population growth in India and China.",
            "India, China and Pakistan face rising patient-to-physician pressure as cases grow faster than healthcare capacity.",
            "High-income countries spend about US$547K per diabetes DALY, against about US$6.7K in low-income countries: an 81× funding gap.",
            "Estimated productivity loss is about US$1.1 trillion a year, so diabetes is an economic problem as well as a health one.",
          ],
        },
      ],
      contributions: [
        "Built the 2045 Diabetes Projections & Future Risk dashboard, forecasting 2.11 billion cases by 2045 (+89.5% growth), with breakdowns by income group and country.",
        "Built the Economic Cost dashboard: US$10.64T in direct healthcare spending (2010–2023), 86.95M diabetes DALYs, US$122.31K per DALY, and spending per DALY by income tier.",
        "Owned the projection methodology and economic-cost modelling behind both pages.",
        "Presented the problem statement, business objectives and success criteria, the data quality issues, our Power Query steps and the data preparation pipeline.",
      ],
      results: [
        "Two dashboards that turn the merged panel into clear insight on future risk and economic burden. My recommendations: invest in healthcare workers where cases will grow fastest, expand treatment access in Sub-Saharan Africa and South Asia, encourage early screening, and strengthen international funding for low-income countries.",
        "The team's overall conclusion: diabetes strain is not a wealth problem, it is a coverage problem, so funding should follow the gap between burden and healthcare capacity rather than GDP.",
      ],
      lessons: [
        "Most of the work happened before the dashboards. Seven providers meant different country names, end years and formats, and small issues, like decimals being read as thousands separators, could quietly break every number downstream. I learned to check the data at each step instead of trusting a table that looks clean.",
        "On the dashboard side, I learned to lead each page with one clear message, such as 2.11 billion cases by 2045 or an 81× funding gap, and let the charts support it. Working in a team of three also showed me the value of one shared master dataset, so everyone's pages tell a consistent story.",
      ],
      gallery: [
        { src: "assets/img/projects/diabetes-2045-projection.jpg", alt: "2045 Diabetes Projections dashboard showing 2.11bn cases, 19.6% prevalence and 89.5% growth", caption: "My 2045 Projections & Future Risk dashboard: forecast trend, cases by income group and by country." },
        { src: "assets/img/projects/diabetes-economic-cost.jpg", alt: "Economic Cost dashboard showing US$10.64T expenditure, US$122.31K per DALY and 86.95M DALYs", caption: "My Economic Cost dashboard: spending by country, a global expenditure map and cost per DALY by income tier." },
        { src: "assets/img/projects/diabetes-title.jpg", alt: "Title slide: Mapping the Global Burden, Healthcare System Strain, and Socioeconomic Drivers", caption: "Team Alpha Squad: Chris Kevin Seelan, Jerry Tantono and Chew Jia Le Kyle (August 2026)." },
      ],
      links: { github: "", demo: "" },
    },
    {
      slug: "wsh-tech-fall-slip-detection",
      order: 1, // position on the site (1 = first)
      stats: [{ value: 84106, label: "raw sensor readings" }, { value: 56387, label: "processed events" }, { value: 44, label: "BLE packets / second", prefix: "~" }, { value: 3, label: "SQLite databases" }],
      title: "Construction Fall & Slip Risk Detection",
      year: "2026",
      type: "Team project · Data Engineering Project (EG2A17)",
      role: "Data pipeline & sensor integration",
      team: "Jerry Tantono, Chew Jia Le Kyle, Eishmeet Kaur, Chris Kevin Seelan",
      featured: false,
      art: "pipeline",
      cover: "assets/img/projects/wsh-dashboard-flags.jpg",
      coverPosition: "70% center",
      coverAlt: "Streamlit dashboard showing sensor telemetry with fall events flagged above threshold",
      summary:
        "A wearable safety pipeline: an IMU clipped to a worker's waistband streams motion data over BLE to a Python gateway, flagging fall and slip risk on a live dashboard.",
      tags: ["Arduino Nesso N1", "BMI270 IMU", "BLE", "Python (Bleak)", "SQLite", "Streamlit", "Edge processing"],
      overview: [
        "WSH-Tech is a workplace safety project that uses a low-cost wearable to detect falls from height (FFH), slips, trips and falls (STF) and near misses on construction sites, and alert supervisors in real time.",
        "We built a complete sensor-to-insight pipeline: collect, transmit, clean and process, store, then visualise and alert.",
      ],
      problem: [
        "How might we improve construction worker safety by detecting falls from height, slips, trips and falls, and near-miss incidents in real time using wearable sensors?",
        "Existing CCTV and wearable systems mainly catch severe falls and can miss near misses such as recovered trips. PPE checks confirm that equipment is worn, but not whether a harness is actually attached. And scaffolding and basements often have weak Wi-Fi or cellular coverage, which makes cloud-based monitoring unreliable. We used Gammon Construction as a real-world case study for these gaps.",
      ],
      approach: [
        "An Arduino Nesso N1, with a built-in BMI270 6-axis IMU, is clipped to the worker's waistband. It streams 34-byte BLE packets (about 44 per second) to an on-site Python gateway built with Bleak. We chose BLE over Wi-Fi, with one device per worker, an on/off feature and a unique name for each device.",
        "The gateway removes duplicates, fills gaps, smooths readings with a 5-sample moving average and computes movement features such as signal vector magnitude, so detection works regardless of how the device is oriented. Data is stored in three SQLite databases (workers_data.db, wsh_safety_database.db and fall_events.db), and supervisors see live charts, threshold breaches and worker status on a Streamlit dashboard.",
      ],
      highlights: [
        {
          title: "Pipeline",
          items: [
            "Sense: BMI270 6-axis IMU on an Arduino Nesso N1 at the waistband",
            "Transmit: 34-byte BLE packets, about 44 per second",
            "Ingest: Python gateway using Bleak",
            "Clean: de-duplication, gap filling and a 5-sample moving average",
            "Store: three SQLite databases (workers, safety records, fall events) for lightweight edge storage and fast historical queries",
            "Alert: live Streamlit dashboard with adjustable thresholds and raw-log export",
          ],
        },
        {
          title: "Design targets",
          items: [
            "Low cost: modular deployment, starting with a small pilot and scaling without a redesign",
            "Low latency: edge processing keeps detection running in low-connectivity areas",
            "High accuracy: few false positives so alerts stay trustworthy, and few false negatives so real incidents aren't missed",
            "Usability: compact and lightweight hardware that adds no new trip hazards and doesn't distract workers",
          ],
        },
        {
          title: "Sensor limitations we designed around",
          items: [
            "High sample rates could make the dashboard lag → a decoupled architecture keeps sensor processing separate from the interface",
            "Battery drain → edge processing reduces how much data has to be transmitted",
            "False fall triggers and thermal drift from high-frequency sampling → computing signal vector magnitude for both accelerometer and gyroscope",
          ],
        },
        {
          title: "Alternatives & next steps",
          items: [
            "Considered CCTV vision systems (blind spots on scaffolding and in basements) and pure cloud processing (unreliable in shielded zones), and chose wearable sensing with edge processing instead",
            "Future: on-device TinyML (Edge Impulse) to cut false triggers from heavy work such as hammering or jumping",
            "Future: LoRaWAN or BLE mesh to remove dead zones in basements and underground structures",
          ],
        },
      ],
      contributions: [
        "Owned the data pipeline and sensor integration, from the wearable's IMU stream to the processed data behind the dashboard.",
        "Streamed and plotted real-time accelerometer and gyroscope data from my own Nesso N1.",
        "Set up the Bluetooth Low Energy link between each Nesso N1 and the gateway, giving every device a unique name and an on/off control so each worker's stream can be identified.",
        "Worked on the Python (Bleak) gateway that receives the 34-byte packets at about 44 per second and decodes them into accelerometer and gyroscope readings.",
        "Handed the decoded stream to the team's processing and storage stage, keeping a consistent data format from the sensor through to the SQLite databases and dashboard.",
      ],
      results: [
        "The pipeline processed 84,106 raw sensor readings into 56,387 events, producing 15,125 incident records and 764 team alerts.",
        "It showed that low-cost wearable sensing with a well-designed pipeline is a practical, scalable way to monitor worksite safety without replacing existing CCTV. Detection accuracy is the main limitation; future work would focus on a larger dataset and real-time alerts.",
      ],
      lessons: [
        "Real-time sensor data is messy. At about 44 packets a second, noise, duplicates and gaps show up straight away, and a simple threshold can mistake normal movement for a fall. Smoothing the signal and using signal vector magnitude showed me how much detection quality depends on cleaning the data first.",
        "I also learned to design a pipeline around where it will run: BLE and edge processing because construction sites have poor connectivity, and a decoupled architecture so a high-frequency stream doesn't slow down the dashboard supervisors rely on.",
      ],
      gallery: [
        { src: "assets/img/projects/wsh-architecture.jpg", alt: "WSH-Tech system architecture: wearable and gateway layers on site, data and insight layers in the site office", caption: "System architecture: wearable and gateway layers at the site edge, data and insight layers in the site office." },
        { src: "assets/img/projects/wsh-imu-data.jpg", alt: "Line charts of accelerometer and gyroscope X, Y and Z readings from Jerry's Nesso", caption: "Real-time accelerometer and gyroscope readings streamed from my own Nesso N1." },
        { src: "assets/img/projects/wsh-dashboard-flags.jpg", alt: "Dashboard plotting acceleration and gyroscope magnitude with fall detections marked", caption: "Sensor telemetry per worker, with fall events flagged above adjustable thresholds." },
        { src: "assets/img/projects/wsh-dashboard-live.jpg", alt: "Live real-time fall detection dashboard showing latest acceleration and total falls detected", caption: "The live fall-detection view with tunable acceleration and gyroscope thresholds." },
      ],
      links: { github: "", demo: "" },
    },
    {
      slug: "smart-classroom-traffic-light",
      order: 4,
      stats: [{ value: 10, label: "sampling rate", suffix: " Hz" }, { value: 3, label: "alert tiers" }, { value: 2, label: "sensors fused" }],
      title: "Smart Classroom Traffic Light System",
      year: "2025",
      type: "IoT · Intelligent Control Systems · Sensor Automation",
      role: "Hardware prototyping & control logic",
      featured: false,
      art: "traffic",
      cover: "assets/img/projects/smart-classroom-wiring.png",
      coverPosition: "42% center",
      coverAlt: "Wiring diagram: Arduino Uno R3 connected on a breadboard to red, amber and green LEDs, a DHT11 sensor and a KY-038 microphone",
      summary:
        "An Arduino Uno R3 prototype that monitors classroom noise, temperature and humidity in real time and drives a red–amber–green LED traffic light.",
      tags: ["Arduino Uno R3", "C++", "KY-038 sound sensor", "DHT11 sensor", "Embedded systems", "State machine"],
      overview:
        "An automated classroom noise and environmental monitoring system built on an Arduino Uno R3. It uses real-time sound and climate readings to drive a three-tier LED traffic light, so the whole room can see at a glance when it's getting too loud.",
      problem: [
        "High noise levels and unmonitored rises in temperature or humidity hurt students' concentration, strain teachers' voices, and force teachers to keep interrupting lessons to manage the volume.",
        "Standard decibel meters only show a number on a small screen that students rarely notice during group work, and simple sound-activated switches are set off by brief spikes such as a dropped textbook or a closing door. A classroom-ready solution needs a clear, room-wide visual signal with calibrated threshold zones.",
      ],
      approach: [
        "I built a breadboard prototype around an Arduino Uno R3 (ATmega328P). A KY-038 microphone module measures sound intensity through the 10-bit ADC on analogue pin A0, and a DHT11 module reports temperature (°C) and relative humidity (%) on digital pin D2.",
        "Every 100 ms (10 Hz) the microcontroller evaluates the readings and lights one LED in a vertical red–amber–green stack on pins D8, D9 and D10, each protected by a 220 Ω current-limiting resistor. All components share a common 5 V supply and ground bus.",
      ],
      highlights: [
        {
          title: "Three-tier sound states",
          items: [
            "Green (D10): below 55 dBA (ADC < 420) — noise is within the ideal range for study or a lecture",
            "Amber (D9): 55–68 dBA (420 ≤ ADC < 620) — group discussion is approaching the limit",
            "Red (D8): above 68 dBA (ADC ≥ 620) — limit exceeded; the alert prompts students to lower their voices",
          ],
        },
        {
          title: "Hardware & wiring",
          items: [
            "Arduino Uno R3: 5 V logic, 10-bit ADC, 14 digital I/O pins",
            "KY-038 sound module: electret microphone, LM393 comparator and a sensitivity potentiometer, wired 5 V / A0 / GND",
            "DHT11 module: temperature (0–50 °C) and humidity (20–90% RH), wired 5 V / D2 / GND",
            "Three 5 mm diffused LEDs (red top, amber middle, green bottom), each with a 220 Ω resistor on the anode",
            "400-point solderless breadboard with dual power rails and male-to-male jumper wires",
          ],
        },
      ],
      contributions: [
        "Designed and assembled the full breadboard circuit: microcontroller, LED stack, resistors and both sensors on a shared 5 V and ground bus.",
        "Built the three-tier sound state machine that maps ADC readings to green, amber and red, sampled every 100 ms.",
        "Added continuous temperature and humidity readout from the DHT11 sensor.",
      ],
      results:
        "A working workbench prototype that turns live sound readings into a room-wide traffic-light signal, alongside continuous temperature and humidity monitoring.",
      lessons: [
        "Calibrating the thresholds was harder than wiring the circuit. The KY-038 gives a raw 10-bit reading rather than a decibel value, so I had to map ADC ranges to noise levels and set boundaries that respond to real changes in volume without flashing on every short spike, like a dropped book or a closing door.",
        "I also learned to design for the people in the room, not just the data: one clear colour that everyone can see works better than a precise number on a small screen. And building on a breadboard taught me careful hardware habits, such as current-limiting resistors, a shared ground and consistent pin mapping, that carry straight into my other sensor and IoT work.",
      ],
      gallery: [
        { src: "assets/img/projects/smart-classroom-wiring.png", alt: "Wiring diagram: Arduino Uno R3 with red, amber and green LEDs on D8–D10 through 220 Ω resistors, a DHT11 on D2 and a KY-038 microphone on A0, sharing 5 V and ground rails", caption: "Wiring diagram: LEDs on D8–D10 through 220 Ω resistors, DHT11 on D2 and the KY-038 microphone on A0, all on a shared 5 V and ground bus." },
      ],
      links: { github: "", demo: "" },
    },
    {
      slug: "interior-design-studio",
      order: 5,
      stats: [{ value: "SketchUp", label: "design tool" }, { value: 2, label: "rooms shown" }],
      title: "Interior Design & Spatial Architecture",
      year: "Personal studio",
      type: "Self-taught side hobby",
      role: "Designer",
      featured: false,
      art: "floorplan",
      cover: "assets/img/projects/interior-bedroom.jpg",
      coverAlt: "Bedroom with a fluted oak feature wall, low oak platform bed, linen bedding and an olive tree",
      summary:
        "Residential and spatial design studies exploring floor plans, lighting hierarchy and warm minimalist Japandi–Swiss aesthetics.",
      tags: ["SketchUp", "Floor plans", "Lighting hierarchy", "Material palettes", "Japandi", "Swiss minimalism"],
      tagsTitle: "Focus areas",
      overview: [
        "A self-taught design practice: residential and spatial studies exploring floor plans, lighting hierarchy, and a warm minimalist aesthetic that blends Japandi and Swiss architectural ideas.",
        "Both rooms shown here are my own designs.",
      ],
      problem: "",
      approach:
        "I design in SketchUp. Each study starts with the floor plan and furniture layout, then I work through proportions, materials and lighting in 3D until the space feels calm and balanced.",
      highlights: [
        {
          title: "Design language",
          items: [
            "Natural, tactile materials: oak, travertine, linen, bouclé and jute",
            "Layered lighting: backlit feature walls and slim pendants alongside daylight from large windows",
            "A calm, warm-neutral palette, softened with indoor greenery",
            "Japandi warmth and restraint combined with Swiss clarity of line and proportion",
          ],
        },
      ],
      contributions: [],
      results: "",
      lessons: [
        "Designing spaces taught me to start with the person using them: how light moves through a room, where the eye lands first, and how materials feel. A calm result comes from many small, deliberate decisions.",
        "That carries into my technical work. A good dashboard or system, like a good room, has a clear hierarchy, nothing unnecessary, and is built around how people actually use it.",
      ],
      gallery: [
        { src: "assets/img/projects/interior-bedroom.jpg", alt: "Bedroom with a backlit fluted oak wall, floating travertine nightstands and pendant lights", caption: "Bedroom: backlit fluted oak wall, floating travertine nightstands and slim pendant lighting." },
        { src: "assets/img/projects/interior-living.jpg", alt: "Living room with arched black-framed windows, cream boucle seating, travertine coffee table and jute rug", caption: "Living room: arched steel windows, cream bouclé seating, a travertine drum table and layered natural textures." },
      ],
      links: { github: "", demo: "" },
    },

    /* Kept for reference but not shown (not on your current featured list).
       Change hidden to false to show it. */
    {
      hidden: true,
      slug: "aws-cloud-infrastructure",
      title: "AWS Cloud Infrastructure",
      year: "[[2025]]",
      type: "[[School / personal project]]",
      role: "[[Your role]]",
      featured: false,
      art: "cloud",
      cover: "",
      summary:
        "A Flask web application deployed on AWS — compute on EC2 inside a VPC, a managed relational database on RDS, and object storage on S3.",
      tags: ["AWS EC2", "VPC", "RDS", "S3", "Flask", "Python"],
      overview:
        "This project involved deploying a Flask web application on AWS, using EC2 for compute, a VPC for networking, RDS for the relational database and S3 for storage. [[Add what the app itself does.]]",
      problem: "[[What was the brief or goal?]]",
      approach: "[[Describe your setup: VPC and subnets, security groups, how Flask runs on EC2, the RDS connection, what's stored in S3.]]",
      contributions: ["[[What you personally configured or built]]"],
      results: "[[What worked?]]",
      lessons: "[[What did you learn?]]",
      gallery: [{ art: "cloud", caption: "Simplified architecture. [[Update to match your actual setup.]]" }],
      links: { github: "", demo: "" },
    },
  ],

  /* ------------------------------------------------------------ EXPERIENCE
     dates: optional, e.g. "Jun 2024 – Dec 2024". Leave "" to hide.
     ----------------------------------------------------------------------- */
  experience: {
    intro:
      "Retail taught me how a business runs day to day: customers, stock, orders and reports. Coaching taught me to observe, explain and adjust. Both shape how I build.",
    capabilities: [
      "Customer service",
      "Sales",
      "Administration",
      "Spreadsheets & stock reports",
      "Order processing",
      "Inventory management",
      "Coaching & communication",
    ],
    roles: [
      {
        company: "URBNZD CO",
        role: "Sales Associate · Athleisure fashion",
        dates: "",
        type: "Part-time",
        bullets: [
          "Handled customer enquiries, provided product recommendations and supported sales activities.",
          "Assisted with administrative responsibilities, including updating spreadsheets, recording inventory, processing orders and preparing stock reports.",
          "Managed stock replenishment, monitored inventory levels and maintained product organisation and store presentation.",
          "Contributed to smooth daily operations while developing strong skills in customer service, sales, administration and inventory management.",
        ],
      },
      {
        company: "SunnyHills",
        role: "Sales Associate",
        dates: "",
        type: "Part-time",
        bullets: [
          "Provided customer service, handled product enquiries and recommended products and gift selections.",
          "Supported administrative and operational tasks, including updating spreadsheets, recording inventory, processing orders and preparing stock reports.",
          "Assisted with stock monitoring, replenishment, product arrangement and inventory organisation to ensure efficient daily store operations.",
          "Developed strong capabilities in customer engagement, administration, inventory control and retail operations.",
        ],
      },
      {
        company: "Badminton Coaching",
        role: "Main & Assistant Coach · Competitive Sparring Partner",
        dates: "",
        type: "Part-time",
        location: "Catholic Junior College & private sessions",
        bullets: [
          "Assistant coach and sparring partner for the Catholic Junior College (CJC) school team.",
          "Coach students of all ages and levels in private sessions.",
          "As a sparring partner, give competitive players match-level practice to prepare for competition.",
          "Bring my own competitive experience into training: I play in tournaments in Singapore and Johor Bahru, including a 3rd-place finish in Mixed Doubles at the Aura Badminton League, and train with NYP's badminton CCA.",
          "Coaching has taught me to break a skill into small steps, spot what each player needs, and explain the same idea in different ways until it clicks.",        ],
      },
    ],
  },

  /* ------------------------------------------------------------- EDUCATION */
  education: {
    // Schools are listed newest first. Wrap a word in *asterisks* to highlight it.
    schools: [
      {
        school: "Nanyang Polytechnic (NYP)",
        dates: "2025 – Present",
        qualification: "Diploma in AI & Data Engineering",
        details: [
          "Currently in Year 2 of the diploma, which covers machine learning, data engineering, cloud, IoT and responsible AI.",
          "Module projects include The Global Diabetes Economy (Data Preparation & Visualisation) and WSH-Tech construction safety detection (Data Engineering Project).",
          "CCA: Badminton.",
          "Volunteered as a Freshmen Orientation Mentor, welcoming and guiding incoming students.",
        ],
      },
      {
        school: "Guangyang Secondary School",
        dates: "2021 – 2024",
        qualification: "Singapore-Cambridge GCE O-Level",
        details: [
          "*Leadership* — Badminton Captain.",
          "*Award* — Merit Award, Mathematics Olympiad.",
          "Studied Pure Sciences and Additional Mathematics, which built the maths and science foundation for my data and AI studies.",
          "Sat the GCE O-Level examinations in 2024.",
        ],
      },
      {
        school: "Teck Ghee Primary School",
        dates: "2018 – 2020",
        qualification: "Primary School Leaving Examination (PSLE)",
        details: [
          "CCA: Sports and Wellness.",
          "Joined Teck Ghee Primary in 2018 after starting primary school at Meridian Primary School.",
          "Completed primary education and sat the PSLE in 2020.",
        ],
      },
      {
        school: "Meridian Primary School",
        dates: "2015 – 2017",
        qualification: "Primary School",
        details: [],
      },
    ],
  },

  /* ---------------------------------------------------------- BEYOND CODE */
  beyond: {
    intro:
      "Sport keeps me disciplined and competitive, travel keeps me curious, and volunteering keeps me connected to the people technology is meant to serve.",
    // The five panels in "Off the clock". `kind` picks the built-in field graphic:
    // court | field | track | pitch | route. Keep the text true to you.
    sports: [
      { kind: "court", title: "Badminton", tag: "Competitive · Captain · Coach", text: "My main sport. Former school badminton captain, NYP CCA player, tournament competitor, and assistant coach for the CJC school team." },
      { kind: "field", title: "Ultimate frisbee", tag: "Teamwork in motion", text: "A fast, self-refereed team sport. Every point depends on spacing, communication and trust." },
      { kind: "track", title: "Running", tag: "One more lap", text: "Time to clear my head and build consistency, one run at a time." },
      { kind: "pitch", title: "Football", tag: "Read the space", text: "Reading the game, finding space and moving as a unit." },
      { kind: "route", title: "Travel & backpacking", tag: "Curious by default", text: "Exploring new places, meeting people and experiencing different cultures. It's also my long-term goal: to travel the world." },
    ],
    // The interactive badminton court at the top of the "On court" section.
    court: {
      kicker: "Competitor · Captain · Coach",
      title: "Badminton is where I learned to *compete*.",
      stats: [
        { value: 6, label: "Tournament results" },
        { value: "3rd", label: "Best finish · Aura League mixed doubles" },
        { value: "SG · JB", label: "Competed in Singapore & Johor Bahru" },
        { value: "Captain", label: "School team, Guangyang Secondary" },
      ],
    },
    achievementsTitle: "Competitive record",
    achievements: [
      { result: "3rd Place", event: "Aura Badminton League", category: "Mixed Doubles", where: "Johor Bahru" },
      { result: "Quarter-finals", event: "Aura Badminton League", category: "Singles", where: "Johor Bahru" },
      { result: "Round of 16", event: "Papago Badminton Carnival 2025", category: "", where: "" },
      { result: "Round of 16", event: "SMU Shuttlers Challenge 2024", category: "", where: "" },
      { result: "Round of 64", event: "Sengkang North CSN 2024", category: "", where: "" },
      { result: "Round of 64", event: "Protech International Badminton Championship Invitational", category: "", where: "Johor Bahru" },
    ],
    communityTitle: "Community",
    community: [
      {
        title: "Freshmen Orientation Mentor",
        org: "Nanyang Polytechnic",
        description: "Volunteered as a student mentor to welcome and guide incoming freshmen.",
      },
      {
        title: "Eldercare Support",
        org: "St. Luke's Eldercare",
        description: "Provided interpersonal support to senior beneficiaries and helped staff run wellness activities.",
      },
      {
        title: "Neighbourhood Sustainability Action",
        org: "Civic stewardship",
        description: "Organised and carried out litter collection and clean-up efforts across neighbourhood sectors.",
      },
    ],
  },

  /* ---------------------------------------------------------------- RESUME
     file:   the one-page resume behind the "Download CV" button.
     fullCv: optional longer CV, shown as a second button. Leave "" to hide.
     The PDFs are built from cv-src/resume.html and cv-src/cv.html.
     While ready is false, the button becomes "Request my CV" (opens email).
     ----------------------------------------------------------------------- */
  resume: {
    file: "assets/cv/Jerry_Resume.pdf",
    fullCv: "assets/cv/Jerry_CV.pdf",
    ready: true,
    updated: "November 2026",
    glance: [
      { label: "Education", value: "Diploma in AI & Data Engineering, NYP (Year 2)" },
      { label: "Experience", value: "Sales Associate at URBNZD CO and SunnyHills · Badminton coach" },
      { label: "Strengths", value: "Data pipelines, IoT, dashboards, business strategy" },
    ],
  },

  /* --------------------------------------------------------------- CONTACT
     intro: optional sentence above your email. Leave "" to hide.
     linkedin / github: leave "" until you add real ones; empty links are
     hidden, never broken.
     phone: optional, e.g. "+65 8123 4567". Shows a WhatsApp link. Left empty
     on purpose: a public phone number tends to attract spam.
     formEndpoint: optional. Create a free form at https://formspree.io and
     paste its endpoint here so messages go straight to your inbox. If "",
     the form opens the visitor's email app with the message pre-filled.
     ----------------------------------------------------------------------- */
  contact: {
    intro: "",
    email: "jerrytantono@gmail.com",
    linkedin: "https://www.linkedin.com/in/jerry-tantono",
    github: "",
    phone: "",
    formEndpoint: "",
    responseNote: "",
  },
};
