import {
  Laptop,
  PhoneCall,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  icon: LucideIcon;
  title: string;
  points: string[];
};

export type TierItem = {
  tier: string;
  scope: string;
  tools: string;
};

export type DeliveryItem = {
  label: string;
  value: string;
};

export type FeedbackItem = {
  client: string;
  quote: string;
  date: string;
};

export type ExperienceItem = {
  client: string;
  scope: string;
};

export const heroCopy = {
  eyebrow: "Raymond Gray | Remote Support Services",
  title: "Remote Admin, Business Support & IT Helpdesk Services",
  lede: "Raymond Gray provides reliable remote support for SMEs worldwide — spanning back-office administration, customer service operations, and IT helpdesk coverage. We help teams stay responsive to customers, keep workflows organised, resolve day-to-day technical issues, and reduce operational load through structured, SOP-driven delivery.",
  subLede: "Operating from Accra, Ghana, we serve clients across the UK, US, and internationally, with flexible timezone coverage and a delivery model built around measurable outcomes, clear escalation paths, and consistent quality."
};

export const coreServicesAdmin: ServiceItem[] = [
  {
    icon: Users,
    title: "Remote Admin & Business Support",
    points: [
      "Shared inbox management & customer query handling (email/chat)",
      "Inbound call answering, routing, booking & message discipline (VoIP/softphone)",
      "Timesheets, attendance tracking & contractor chasing",
      "CRM updates, data entry, document preparation & reporting packs",
      "HR admin support (starter/leaver checklists, rota support, document packs)",
      "Order processing, acknowledgements & expediting support"
    ]
  },
  {
    icon: PhoneCall,
    title: "Customer Service & Front-Office",
    points: [
      "Shared inbox monitoring and proactive job status updates",
      "Inbound call handling via VoIP extension using scripts and escalation paths",
      "Open order and job tracking reports on agreed cadence",
      "Customer query resolution and escalation routing"
    ]
  },
  {
    icon: Briefcase,
    title: "Operations & Workflow Coordination",
    points: [
      "Supplier follow-up, RFQ coordination and delivery chasing",
      "Outside processing tracking and purchasing admin",
      "Timesheet exception reporting and approvals chasing",
      "Reporting packs and performance summaries for leadership"
    ]
  }
];

export const coreServicesIT: ServiceItem[] = [
  {
    icon: Laptop,
    title: "Remote IT Helpdesk Support",
    points: [
      "L1: Ticket intake & triage, password resets, user onboarding comms",
      "L2 Standard: Remote desktop, VPN/connectivity, Office 365 user admin",
      "L2 Advanced: Active Directory, Azure/M365 tenant, Intune/SCCM, PowerShell",
      "Structured escalation paths with clear handover to client technical team or MSP",
      "SOP-based responses with QA oversight and weekly performance reporting",
      "Coverage across GMT and US timezones; dedicated or shared agent models available"
    ]
  }
];

export const itTiers: TierItem[] = [
  {
    tier: "L1",
    scope: "Ticket intake & triage, password resets, account unlocks, user onboarding comms, basic software installs, escalation routing",
    tools: "Zendesk, Freshdesk, Jira Service Desk, Teams"
  },
  {
    tier: "L2 — Standard",
    scope: "All L1 scope plus: remote desktop troubleshooting, VPN & connectivity issues, Office 365 user admin (basic), printer/peripheral config, software conflict resolution",
    tools: "TeamViewer, AnyDesk, M365 Admin Centre, RMM tools"
  },
  {
    tier: "L2 — Advanced",
    scope: "All L2 Standard scope plus: Active Directory / Entra ID admin, Azure / M365 tenant management, endpoint management (Intune / SCCM), PowerShell scripting, escalation-to-engineer triage",
    tools: "Azure AD, Intune, SCCM, PowerShell, Microsoft Defender"
  }
];

export const deliveryModel: DeliveryItem[] = [
  { label: "Engagement model", value: "Monthly hour blocks (25 / 50 / 100 hrs) or dedicated full-time agent(s)" },
  { label: "Structure", value: "SOP-driven delivery with clear handovers and escalation rules" },
  { label: "Reporting", value: "Weekly performance summary with KPIs and continuous improvement loop" },
  { label: "Pilot approach", value: "2-week pilot on one bottleneck; scale to additional modules after sign-off" },
  { label: "Assurance", value: "NDA available; role-based access controls; QA checks and template-based responses" },
  { label: "Timezone coverage", value: "GMT base standard; US East Coast, full US business day, and US West Coast / PST coverage available" }
];

export const bestFitClients = [
  "SMEs that need overflow or dedicated cover for customer emails, calls, or IT tickets",
  "Businesses with recurring admin workload — invoicing support, scheduling, CRM hygiene",
  "Teams with timesheet/attendance friction and contractor-heavy operations",
  "IT-dependent businesses that need structured L1/L2 helpdesk support without the overhead of a full-time in-house team",
  "Organisations expanding into new markets who need remote operational support from day one"
];

export const assuranceControls = [
  "Confidentiality-first approach — NDA available on request",
  "Role-based access controls; secure storage and access logging where applicable",
  "Template-based responses and QA checks for consistent customer tone and accuracy",
  "Structured SOPs with clear handovers and escalation rules on every engagement",
  "Weekly performance reporting against agreed KPIs"
];

export const experienceProfile: ExperienceItem[] = [
  {
    client: "Aerospace Technical Metal Finishing (Aero TMF)",
    scope: "Customer service delivery (shared inbox), Open Order Reports, job tracking/status reporting, customer service calls support, front-office call handling via VoIP, time & attendance monitoring."
  },
  {
    client: "Applied Powdercoat",
    scope: "Order processing support, customer queries/status updates, reporting packs, and administrative workflow coordination."
  },
  {
    client: "Alard Engineering",
    scope: "Order administration, customer communications, job tracking and status reporting, and purchasing/admin coordination as required."
  }
];

export const representativeList = [
  { name: "A & S Manufacturing Inc.", logoUrl: "/logos/as-manufacturing.png" },
  { name: "A&S MFG INC.", logoUrl: "/logos/as-mfg.jpg" },
  { name: "Absolute Technologies, Inc.", logoUrl: "/logos/absolute-technologies.png" },
  { name: "Aero Bending Co. Inc.", logoUrl: "/logos/aero-bending.png" },
  { name: "Aero Plating, Inc.", logoUrl: "/logos/aero-plating.png" },
  { name: "Aerospace Metal Fabrication", logoUrl: "/logos/amf.png" },
  { name: "Aircraft Component Repair Inc.", logoUrl: "/logos/acr.png" },
  { name: "Alard Machine Products", logoUrl: "/logos/alard.png" },
  { name: "Asturies Manufacturing Co. Inc.", logoUrl: null },
  { name: "Atomic Aerospace, LLC", logoUrl: "/logos/atomic-aerospace.svg" },
  { name: "B & B Manufacturing Co., Inc.", logoUrl: "/logos/bb-manufacturing.png" },
  { name: "C&H Machine and EDM Services", logoUrl: "/logos/ch-machine.png" },
  { name: "Crissair Incorporated", logoUrl: "/logos/crissair.png" },
  { name: "David Barnes Company", logoUrl: null },
  { name: "Donaldson Co. Inc.", logoUrl: "/logos/donaldson.png" },
  { name: "DP Products", logoUrl: "/logos/dp-products.png" },
  { name: "Eaton Aerospace", logoUrl: "/logos/eaton.png" },
  { name: "Francis Manufacturing Company", logoUrl: "/logos/francis-mfg.png" },
  { name: "Frazier Aviation", logoUrl: "/logos/frazier-aviation.png" },
  { name: "Hutchinson U.S.A Aerospace", logoUrl: "/logos/hutchinson.png" },
  { name: "Integrated Panel Systems", logoUrl: "/logos/ips.png" },
  { name: "Kurt Manufacturing Company", logoUrl: "/logos/kurt.png" },
  { name: "Lansair Corporation", logoUrl: "/logos/lansair.PNG" },
  { name: "Mar Engineering", logoUrl: "/logos/mar-engineering.png" },
  { name: "Meggitt Defense Systems, Inc.", logoUrl: "/logos/meggitt.png" },
  { name: "Mono Engineering", logoUrl: null },
  { name: "Mooney Industries", logoUrl: "/logos/mooney.png" },
  { name: "Performance Machine Tech. Inc.", logoUrl: "/logos/pmt.png" },
  { name: "Pneudraulics, Inc.", logoUrl: "/logos/pneudraulics.png" },
  { name: "Precision Engine Controls Corporation", logoUrl: "/logos/pecc.png" },
  { name: "Prime Plating", logoUrl: "/logos/prime-plating.png" },
  { name: "Primus Aerospace", logoUrl: null },
  { name: "ROMI Industries", logoUrl: "/logos/romi.svg" },
  { name: "RS Machining Co.", logoUrl: "/logos/rs-machining.png" },
  { name: "S&H Machine", logoUrl: "/logos/sh-machine.png" },
  { name: "Safran Electrical Components USA", logoUrl: "/logos/safran.png" },
  { name: "Thomas CNC Machining", logoUrl: "/logos/thomas-cnc.png" },
  { name: "TOMI Engineering Inc.", logoUrl: "/logos/tomi.svg" },
  { name: "True Position Tech., Inc.", logoUrl: "/logos/tpt.png" },
  { name: "Unified Manufacturing, Inc.", logoUrl: "/logos/unified-mfg.png" },
  { name: "WK Engineering International, Inc.", logoUrl: null },
  { name: "Woodward HRT", logoUrl: "/logos/woodward.png" }
];

export const feedback: FeedbackItem[] = [
  {
    client: "Aerospace Technical Metal Finishing (Aero TMF)",
    quote: "“Within a few weeks of contracting with Raymond Gray our clients began to commend us for quick and professional response and on-time updates. This has really improved our customer satisfaction with our brand.”",
    date: "April 2025"
  },
  {
    client: "Applied Powdercoat",
    quote: "“There were a lot of errors by in-house staff, with little to no attention to detail, so we decided to try Raymond Gray based on a recommendation from an Aerospace industry player. We were pleasantly surprised by the accuracy, consistency and reliability of their delivery.”",
    date: "January 2025"
  },
  {
    client: "Alard Engineering",
    quote: "“Before bringing Raymond Gray onboard, we struggled a lot with our processes. It took us a long time to do everything, and this affected our productivity, our sales and our customer relationships. It was when we began to lose work and orders from some of our most loyal customers that we decided to bring in help. Our point person from Raymond Gray was brilliant and took their time to understand and refine the system. We went from a week of trying to locate a customer order to same-day updates consistently — this significantly improved our sales and customer experience.”",
    date: "August 2024"
  }
];
