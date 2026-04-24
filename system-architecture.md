# Youniverse System Architecture

## Overview

The Youniverse Ecosystem is a multi-agent orchestration system designed to manage, a currently standing army of 167+ sovereign AI agents and growing every week with 67 agents in 10 pre-built squads and many more individually standing agents, all coordinated by a central "Oracle" system.

---

## Core Architecture Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                 │
│                           (itsyouonline.com)                                │
│                               Home Portal                                   │
│                          "Welcome to Youniverse"                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 Portals OS                                  │
│                          (The Ecosystem Shell)                              │
│                                                                             │
│   • Main dashboard container                                                |
│   • Host of all agent PWAs but not the agents themselves                    |
│   • The Oracle chat widget (bottom right)                                       │
│   • Squad/nodes registry (oracle.itsyouonline.com)                          │
│   • PWAs open here in embedded windows without leaving the portals OS system│
│   • Coordinates between all subagents                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ 
┌─────────────────────────────────────────────────────────────────────────────┐
│                                The Oracle                                   │
│                         (oracle.itsyouonline.com)                           │
│                                                                             │
│   • Hangs out as a chat widget in the bottom right corner of Portals OS      │
│   • The Oracle is the central commanding entity of the Nexus PPSA           │
│   • Receives user intent via chat interface                                 │
│   • Diagnoses the problem and selects appropriate agents                    │
│   • Orchestrates multi-agent coordination                                   │
│   • Ensures all agents are working towards the same goal                    │
│   • Calls agents and opens their PWAs in the Portals OS shell                │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                         ┌───────────────────────────┐ 
                         │       Nexus PPSA          │ 
                         │(Pain Point Solutions Army)│ 
                         │                           │ 
                         └───────────────────────────┘
                                      │
                                      ▼
              ┌───────────────────────┼──────────────────────────────────────────┐
              ▼                       ▼                     ▼                    ▼
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐ ┌────────────────────┐ 
│    AGENT PWAs      │  │    AGENT PWAs      │  │    AGENT PWAs      │ │    AGENT PWAs      │ 
│(One job speciality)│  │(One job speciality)│  │(One job speciality)│ │(One job speciality)│ 
│                    │  │                   │  │                     │ │                    │ 
└────────────────────┘  └───────────────────┘  └─────────────────────┘ └────────────────────┘
             │                      │                      │                   │
             ▼                      ▼                      ▼                   ▼
        ┌────────────────────────────────────────────────────────────────────────┐
        │                        NOTNOTES                                        │
        │                   (Artifact Compilation Layer)                         │
        │                                                                        │
        │          • Aggregates outputs from multiple agents                     │
        │          • Compiles into a structured artifact                         │
        │          • Maintains project context                                   │
        │          • Stores working session data                                 │
        └────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
        ┌────────────────────────────────────────────────────────────────────────┐
        │                          BOOKS OS                                       │
        │                  (Permanent Memory Storage)                            │
        │                                                                        │
        │                • Long-term artifact storage                            │        
        │                • Learning & knowledge base                             │
        │                • User preference memory                                │
        │                • Historical deliverables                               │
        └────────────────────────────────────────────────────────────────────────┘
```

---
    
## Component Details

### 1. The Oracle (oracle.itsyouonline.com)

The Oracle is the central intelligence that:
- **Receives** user intent through natural language
- **Diagnoses** the problem type and complexity
- **Selects** the optimal agent/squad combination
- **Coordinates** parallel execution
- **Returns** consolidated results

**Key Features:**
- Single chat interface for all operations
- Automatic agent routing
- Context preservation across sessions
- Learning from user patterns

### 2. Portals OS (The Shell)

Portals OS is the operating system that:
- Provides the main dashboard framework
- Contains The Oracle chat widget (always accessible, bottom-right)
- Manages the Nexus PPSA registry for all agents
- Opens agent PWAs within the system (no subdomain hopping)
- Coordinates inter-system communication

**Oracle Chat Widget:**
- Floating widget in bottom-right corner
- Connects to The Oracle at oracle.itsyouonline.com
- Maintains conversation context
- Can launch agents directly from chat

### 3. The Nexus PPSA (167+ Sovereign Agents)

Each agent is a standalone PWA that:
- Operates independently with its own brain
- Can be launched by The Oracle or user request
- Works in parallel with other agents
- Reports back to NotNotes for compilation

**Agent Structure:**
- **Pre-built Specialty Agent Squads** (10 squads, ~67 individual agents in squads)
- **Standalone agents** (167+ individual agents)
- **Shared context** through Portals OS
- **Individual learning** capabilities

### 4. NotNotes (Compilation Layer)

NotNotes handles:
- Receiving agent outputs
- Aggregating multi-agent results
- Compiling into final artifacts
- Maintaining project state
- Draft/artifact management

### 5. Books OS (Permanent Storage)

Books OS provides:
- Long-term memory for artifacts
- User preference learning
- Historical deliverable storage
- Knowledge base for agents

---

## Agent Squads (10 Total, 67 Nodes)

| Squad | Nodes | Purpose |
|-------|-------|---------|
| Bridge Validation | 7 | Validate ideas, strategies, plans |
| Gamma Production | 7 | Content creation at scale |
| Sales Engineering | 7 | Full sales pipeline |
| Customer Success | 6 | Customer retention & expansion |
| Cash Flow | 7 | Financial management |
| Developer | 7 | Software development pipeline |
| Research | 6 | Deep dive research |
| Shadow Operations | 6 | Background automation |
| Community Manager | 7 | Community building |
| Project Command | 7 | Project management |

---

## Multi-Window Agent Architecture

**Key Design Decision:** Agents open within Portals OS, not as separate subdomains.

```
┌─────────────────────────────────────────────────────────────────┐
│                       PORTALS OS                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Main Dashboard (nexus.itsyouonline.com)                 │   │
│  │                                                          │   │
│  │  ┌────────────────┐  ┌────────────────┐                  │   │
│  │  │ Agent PWA #1   │  │ Agent PWA #2   │  (Embedded)      │   │
│  │  │                │  │                │                  │   │
│  │  └────────────────┘  └────────────────┘                  │   │
│  │                                                          │   │
│  │  ┌────────────────┐                                      │   │
│  │  │ Agent PWA #3   │                                      │   │
│  │  └────────────────┘                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────┐                                                │
│  │ The Oracle  │  (Chat widget - bottom right)                  │
│  │  Chat       │                                                │
│  └─────────────┘                                                │
└─────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- No subdomain switching
- Shared context across agents
- Unified user experience
- Easier session management

---

## Data Flow

### Typical User Session:

1. **User** visits itsyouonline.com
2. **Chat** with The Oracle describing their goal
3. **The Oracle** diagnoses and selects agents
4. **Portals OS** opens agent PWAs in parallel
5. **Agents** work on their respective tasks
6. **NotNotes** compiles results
7. **Books OS** stores final deliverable
8. **User** receives consolidated output

### Example: Market Entry Validation

```
User: "I want to enter the electric vehicle market in Germany"

        │
        ▼
   ┌─────────────┐
   │ The Oracle  │ → Diagnoses: Market research + Legal + Risk
   │             │
   └─────────────┘
        │
        ▼
   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
   │ Market Node │     │ Legal Node  │     │ Risk Node   │
   │             │     │             │     │             │
   └─────────────┘     └─────────────┘     └─────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
                    ┌─────────────┐
                    │  NotNotes   │ → Compiles BRIDGE validation
                    └─────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │  Books OS    │ → Stores deliverable
                    └─────────────┘
```

---

## Domain Strategy

| Domain | Purpose | Status |
|--------|---------|--------|
| itsyouonline.com | Main hub, landing, pricing | ✅ Live |
| oracle.itsyouonline.com | The Oracle interface | 🔄 Live |
| nexus.itsyouonline.com | Registry dashboard | ✅ Live |
| itsai.store | Squad/agent marketplace | 🔄 In Development |
| itsai.quest | Gamification + Shadow | 🔄 In Development |
| itsai.blog | AI news + affiliate | 🔄 In Development |
| itsai.website | Prompt packages | 🔄 In Development |

---

## Pricing Model (Canonical)

| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 1 Oracle chat, 1 NotNotes project |
| Node Uses Pack | $19 | 3 uses, any agent |
| Single Node Lifetime | $47 | One agent forever |
| Squad Access | $97 | Flat, one squad unlimited |
| Squad Monthly | $127/mo | With memory retention |
| Platoon | $297/mo or $1,997/yr | All 10 squads, all 67 nodes |

---

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla for portability)
- **PWAs**: Service Workers, Web App Manifest
- **Storage**: LocalStorage + Books OS backend
- **Chat**: WebSocket connection to Oracle
- **Orchestration**: Portals OS coordination layer

---

## Implementation Priority

1. ✅ Landing page (itsyouonline.com)
2. ✅ Registry dashboard (nexus.itsyouonline.com)
3. 🔄 Oracle chat integration in PortalsOS
4. 🔄 Agent PWA templates (167 agents)
5. 🔄 NotNotes compilation layer
6. 🔄 BooksOS storage integration

---

*Document Version: 1.0*
*Last Updated: 2025*