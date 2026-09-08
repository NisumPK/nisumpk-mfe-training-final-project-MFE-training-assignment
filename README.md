# 🚀 Final Project — Build a Production-Ready Micro Frontend Platform

## 📌 Overview

This is the **Final Project for the Micro Frontend (MFE) Training**.

In this project, you will design and build a complete Micro Frontend-based application that demonstrates the concepts covered throughout the training.

The goal is to move beyond building individual MFEs and demonstrate how multiple independently developed applications can work together as a **complete, scalable, and maintainable application**.

Your solution must demonstrate:

- Micro Frontend architecture
- Module Federation
- Monorepo architecture
- Gateway / Shell application
- Multiple independently structured MFEs
- Shared/global state
- Event-driven communication
- Browser-based event listeners and emitters
- Data sharing between MFEs
- Server-side/backend integration
- CI/CD pipeline
- Testing
- Documentation
- Production-oriented architecture

> **Important:** This is a final project. You are expected to make architectural decisions yourself and explain why you chose them.

The objective is not only to make the application work, but to demonstrate that you understand **how and why Micro Frontends should communicate, share state, and be independently developed and deployed.**

---

# 🎯 Learning Objectives

By completing this project, you should be able to:

1. Design a complete Micro Frontend architecture.
2. Build multiple independent MFEs.
3. Implement a Gateway/Shell application.
4. Configure and use Module Federation.
5. Build an Nx or equivalent monorepo architecture.
6. Create reusable shared libraries.
7. Implement global state management.
8. Implement event-driven communication between MFEs.
9. Use browser-based events for cross-MFE communication.
10. Implement a reusable event emitter/listener abstraction.
11. Share data between independent MFEs.
12. Build and integrate a server-side/backend application.
13. Handle communication between frontend and backend services.
14. Implement automated testing.
15. Create a CI/CD pipeline.
16. Understand the trade-offs of shared state versus event-driven communication.
17. Design an architecture that can scale beyond two MFEs.
18. Document architectural decisions and technical challenges.

---

# 🏗️ Project Requirements

Your project must contain **at least two Micro Frontends** and **one Gateway/Shell application**.

You may create additional MFEs if your chosen business scenario requires them.

### Minimum Architecture

```text
                         ┌──────────────────────┐
                         │    Gateway / Shell   │
                         │       (Host)         │
                         └───────────┬──────────┘
                                     │
                          Module Federation
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
             ┌──────▼──────┐                   ┌──────▼──────┐
             │    MFE 1    │                   │    MFE 2    │
             │             │                   │             │
             │  Provider  │                   │  Provider   │
             └─────────────┘                   └─────────────┘
```

### Minimum Requirements

You must have:

- **1 Gateway/Shell**
- **At least 2 MFEs**
- **1 server-side/backend application**
- **1 monorepo/workspace**
- **Module Federation**
- **Global state**
- **Event-driven communication**
- **Data-sharing mechanisms**
- **CI/CD pipeline**

---

# 💡 Part 1 — Choose Your Application Scenario

You may choose any meaningful business domain.

Your application should represent a realistic system where Micro Frontends provide a meaningful architectural advantage.

---

## 🛒 Example Scenario 1 — E-Commerce

```text
                    E-Commerce Gateway
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          Product        Cart         Checkout
           MFE            MFE            MFE
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                      Backend API
```

Possible MFEs:

- Product Catalog
- Shopping Cart
- Checkout
- User Profile
- Order Management
- Payments

---

# 🏦 Example Scenario 2 — Banking Application

```text
                      Banking Gateway
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           Accounts     Transactions    Payments
              MFE           MFE            MFE
              │             │              │
              └─────────────┼──────────────┘
                            │
                            ▼
                       Banking API
```

Possible MFEs:

- Account Dashboard
- Transactions
- Payments
- Beneficiaries
- Profile

---

# 🎓 Example Scenario 3 — Learning Platform

```text
                       LMS Gateway
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
           Courses      Assignments     Grades
              MFE           MFE            MFE
              │             │              │
              └─────────────┼──────────────┘
                            │
                            ▼
                         LMS API
```

---

# 📊 Example Scenario 4 — Enterprise Dashboard

```text
                    Enterprise Gateway
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
          Analytics        Users         Reports
             MFE            MFE            MFE
```

---

# 🧩 Part 2 — Gateway / Shell Application

The Gateway/Shell is the main entry point of your application.

It must:

- Act as the Module Federation Host.
- Load the remote MFEs.
- Provide the overall application layout.
- Provide navigation.
- Handle loading states.
- Handle remote loading failures.
- Display the appropriate MFE based on navigation.
- Provide access to global/shared state where appropriate.
- Provide a consistent application shell.

Example:

```text
┌─────────────────────────────────────────────┐
│                 Application                  │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Dashboard    │                              │
│ Products     │       Remote MFE             │
│ Cart         │                              │
│ Orders       │                              │
│ Profile      │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

---

# 🧩 Part 3 — Micro Frontends

You must create at least **two independent MFEs**.

Each MFE should have a clearly defined business responsibility.

For example:

```text
MFE 1 → Product Management
MFE 2 → Shopping Cart
```

or:

```text
MFE 1 → Accounts
MFE 2 → Transactions
```

### Each MFE should:

- Have its own application boundary.
- Have clearly defined responsibilities.
- Be independently runnable.
- Be consumed by the Gateway.
- Communicate with other MFEs only through defined mechanisms.
- Avoid unnecessary direct dependencies on other MFEs.

---

# 🔗 Part 4 — Module Federation

Module Federation is a **mandatory requirement**.

The Gateway must consume the MFEs through Module Federation.

Expected architecture:

```text
                    Gateway / Host
                          │
                          │
                Module Federation
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
          Remote MFE 1            Remote MFE 2
```

### Requirements

- Gateway must be the Host.
- MFEs must be Remotes.
- MFEs must expose modules/components/pages.
- Gateway must consume the exposed modules.
- Remote applications must remain independently runnable.
- MFEs must not simply be copied into the Gateway.
- Remote modules must be loaded at runtime.

---

# 🗂️ Part 5 — Monorepo Architecture

The complete project must exist inside a **single workspace/monorepo**.

Nx is recommended.

Example:

```text
final-mfe-project/
│
├── apps/
│   ├── gateway/
│   ├── mfe-product/
│   ├── mfe-cart/
│   └── api/
│
├── libs/
│   ├── shared-types/
│   ├── shared-ui/
│   ├── state/
│   ├── events/
│   └── utilities/
│
├── .github/
│   └── workflows/
│
├── package.json
├── nx.json
├── tsconfig.base.json
└── README.md
```

You may use a different structure if you clearly document your architecture.

---

# 📦 Part 6 — Shared Libraries

Create reusable libraries where appropriate.

At minimum, you should consider creating:

```text
shared-types
shared-ui
state
events
```

### Shared Types

Define common interfaces/types in one place.

Example:

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}
```

Avoid duplicating common types across MFEs.

---

# 🎨 Shared UI

Create reusable components where appropriate.

Examples:

```text
Button
Card
Modal
Input
Loader
ErrorBoundary
```

Shared UI should contain generic/reusable components rather than business-specific components.

---

# 🌐 Part 7 — Global Event System

Your application must implement a reusable global event system using the browser `window` object.

The goal is to allow MFEs to communicate without directly importing each other's internal implementation.

The expected API should look similar to:

```typescript
NISUM.listener("eventName", handler);

NISUM.emit("eventName", {
  // event data
});
```

You may implement this using a custom event system built on top of:

```text
window
CustomEvent
addEventListener
dispatchEvent
```

---

# 📡 Required Event API

Your implementation must provide functionality similar to:

```typescript
NISUM.emit("cart:item-added", {
  productId: "123",
  quantity: 1,
});
```

and:

```typescript
NISUM.listener("cart:item-added", (data) => {
  console.log(data);
});
```

You may choose the exact implementation, but the API should be:

- Reusable
- Type-safe where possible
- Accessible across MFEs
- Attached to the global `window` object
- Properly documented

---

# 🔄 Event-Driven Communication

Demonstrate actual communication between at least **two MFEs using the event system**.

Example:

```text
Product MFE
     │
     │ NISUM.emit()
     ▼
   Window
     │
     │ Custom Event
     ▼
 Cart MFE
     │
     │ NISUM.listener()
     ▼
 Update Cart
```

Example event:

```text
cart:item-added
```

Possible events include:

```text
user:login
user:logout
cart:item-added
cart:item-removed
cart:updated
product:selected
order:created
notification:show
```

You should choose events that make sense for your application.

---

# 🧠 Part 8 — Global State

Your application must implement a **global/shared state** mechanism.

You may use a suitable state management solution such as:

- Redux Toolkit
- Zustand
- Another justified solution

The state should contain meaningful application-level information.

For example:

```typescript
{
  user: {
    id: "123",
    name: "John"
  },

  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0
  }
}
```

---

# 🔄 State Sharing

Demonstrate actual state sharing between MFEs.

Example:

```text
                   Global State
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
        Product MFE          Cart MFE
             │                   │
          dispatch()         selector()
```

The shared state must represent a real application requirement.

Do not create global state simply for demonstration purposes without using it meaningfully.

---

# ⚖️ Part 9 — State Sharing vs Event Sharing

Your project must demonstrate **both**:

### Global/Shared State

Use shared state when multiple MFEs need access to persistent application state.

Example:

```text
Current User
Cart State
Application Preferences
```

### Event-Driven Sharing

Use events for communication where one MFE needs to notify another MFE that something happened.

Example:

```text
Product Added
Order Created
User Logged Out
Notification Requested
```

---

# 📊 Data-Sharing Requirements

Your application must demonstrate different data-sharing approaches.

At minimum, explain and demonstrate where appropriate:

```text
1. Global / Shared State
2. Event-Driven Communication
3. Module Federation Shared Modules
4. Browser APIs / Storage where applicable
5. Backend/API communication
```

You do not need to force every mechanism into the application.

Instead, explain:

- Why you selected a mechanism.
- Where you used it.
- Why it was appropriate.
- What alternatives you considered.
- What limitations it has.

---

# 🖥️ Part 10 — Server-Side / Backend Application

Your final project must include a **server-side application**.

The frontend MFEs should communicate with the backend through APIs.

Example:

```text
                    Gateway
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          Product MFE       Cart MFE
              │                 │
              └────────┬────────┘
                       │
                       ▼
                   Backend API
                       │
                       ▼
                    Database
```

The backend may be implemented using a technology appropriate to your project.

Examples:

- Node.js
- Express
- NestJS
- Spring Boot
- Another justified backend technology

---

# 🔌 Backend Requirements

The backend should expose meaningful APIs.

For example:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

Your actual APIs will depend on your selected application scenario.

At minimum:

- Frontend must communicate with the backend.
- Backend must return meaningful data.
- API errors must be handled.
- Loading states must be handled.
- Environment-specific configuration should be supported.

---

# 🔐 Part 11 — Environment Configuration

Do not hardcode environment-specific URLs.

Use environment variables/configuration for values such as:

```text
API_URL
REMOTE_MFE_URL
AUTH_URL
```

For example:

```text
.env
.env.development
.env.production
```

Do not commit secrets or credentials to the repository.

---

# 🧪 Part 12 — Testing

Your project must contain automated tests.

At minimum, include tests for:

### Gateway

- Gateway renders.
- Navigation works.
- Remote MFE loading works.
- Loading state is displayed.
- Error state is handled.

### MFE 1

- Main functionality works.
- Components render correctly.
- API interaction works.
- Required events are emitted.

### MFE 2

- Main functionality works.
- Components render correctly.
- Required events are received.
- State updates correctly.

### Global Event System

Test:

```text
NISUM.emit()
NISUM.listener()
```

Verify that:

- Events are emitted.
- Events are received.
- Payloads are passed correctly.
- Listeners can be registered.
- Listeners can be removed/unsubscribed.

### Global State

Test:

- State initialization.
- State updates.
- State consumption from MFEs.

---

# 🚦 Part 13 — Error Handling

Your application must handle common failure scenarios.

At minimum demonstrate:

- Remote MFE unavailable.
- Backend unavailable.
- API error.
- Loading state.
- Invalid data.
- Event listener cleanup.

Example:

```text
Gateway
   │
   ├── Remote Available
   │       ↓
   │    Render MFE
   │
   └── Remote Unavailable
           ↓
      Error Boundary
           ↓
    "Unable to load module"
```

---

# 🔄 Part 14 — CI/CD Pipeline

Implement a CI/CD pipeline for your project.

GitHub Actions is recommended.

Your pipeline should automatically run when code is pushed or a Pull Request is created.

Minimum pipeline stages:

```text
Git Push / Pull Request
          │
          ▼
     Install Dependencies
          │
          ▼
       Lint / Check
          │
          ▼
       Run Tests
          │
          ▼
        Build Apps
          │
          ▼
     Deployment
```

---

# ⚙️ CI Requirements

Your CI pipeline should perform at least:

- Dependency installation.
- Linting.
- Type checking where applicable.
- Automated tests.
- Production build.

Example:

```text
.github/
└── workflows/
    └── ci.yml
```

---

# 🚀 CD Requirements

Implement deployment automation where possible.

You may deploy your applications using any suitable platform.

For example:

```text
Gateway
   ↓
Production Hosting

MFE 1
   ↓
Production Hosting

MFE 2
   ↓
Production Hosting

Backend
   ↓
Cloud / Server
```

The Gateway should be configured to consume the deployed Remote MFEs.

If deployment is not possible, your README must clearly document how the CD pipeline would work in a production environment.

---

# 📈 Part 15 — Independent Deployment

Your architecture should support the idea that MFEs can be deployed independently.

For example:

```text
Gateway       → Version 1.0
Product MFE   → Version 1.4
Cart MFE      → Version 2.1
Backend       → Version 3.0
```

Explain:

- How Remote URLs are configured.
- How the Gateway discovers Remotes.
- What happens when a Remote is unavailable.
- How you would handle version compatibility.

---

# 🔍 Part 16 — Architecture Documentation

Your README must contain:

```text
## Architecture
```

Include an architecture diagram showing:

```text
Gateway
   │
   ├── MFE 1
   │
   ├── MFE 2
   │
   ├── Shared State
   │
   ├── Event System
   │
   └── Backend
```

Explain the responsibility of every major application and library.

---

# 📊 Part 17 — Data-Sharing Comparison

Create a section:

```text
## Data-Sharing Strategy
```

Compare the approaches used in your project.

Example:

| Mechanism | Used For | Coupling | Persistence | Advantages | Limitations |
|---|---|---|---|---|---|
| Shared State | Application state | Higher | Runtime | Easy state access | Increased coupling |
| Events | Cross-MFE communication | Low | Runtime | Loosely coupled | Harder to trace |
| Module Federation | Runtime modules | Medium | Runtime | Independent deployment | Configuration complexity |
| Browser Storage | Persistent client data | Low | Persistent | Survives refresh | Browser-specific |
| Backend API | Server data | Low | Server | Central source of truth | Network dependency |

Expand this table with your own implementation decisions.

---

# 🧪 Part 18 — Application Demonstration

Your final demonstration must show the complete application working.

At minimum demonstrate:

### 1. Gateway

```text
Gateway starts
       ↓
Loads MFEs
       ↓
Application is usable
```

### 2. Module Federation

Show that the Gateway is consuming Remote MFEs.

### 3. Global State

Show:

```text
MFE 1
 ↓
Global State
 ↓
MFE 2
```

### 4. Event System

Show:

```text
NISUM.emit()
      ↓
window
      ↓
NISUM.listener()
      ↓
Other MFE
```

### 5. Backend

Show frontend → API → backend communication.

### 6. CI/CD

Show the CI/CD pipeline successfully running.

---

# 📸 Part 19 — Screenshots / Demo Video

Include screenshots or a short demo video showing:

- Overall application.
- Gateway/Shell.
- MFE 1.
- MFE 2.
- Module Federation configuration.
- Monorepo structure.
- Global state.
- Event emitter/listener.
- Backend/API communication.
- CI pipeline.
- Deployment/CD pipeline if available.

---

# 📁 Expected Repository Structure

A recommended repository structure is:

```text
final-mfe-project/
│
├── apps/
│   ├── gateway/
│   ├── mfe-one/
│   ├── mfe-two/
│   └── api/
│
├── libs/
│   ├── shared-ui/
│   ├── shared-types/
│   ├── state/
│   ├── events/
│   └── utilities/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── README.md
├── package.json
├── nx.json
├── tsconfig.base.json
└── ...
```

You may change the structure based on your architecture.

---

# ▶️ Part 20 — Running the Application

The entire project must be easy to start.

The preferred requirement is:

```bash
npm install
npm run dev
```

or:

```bash
npx nx run-many --target=serve --all
```

The goal is to allow the complete application to start with **a single command**.

If your architecture requires another command, document it clearly.

For example:

```bash
npm run dev
```

should start:

```text
Gateway
MFE 1
MFE 2
Backend
```

Example:

```text
Starting applications...

✓ Gateway       http://localhost:4200
✓ MFE One       http://localhost:4201
✓ MFE Two       http://localhost:4202
✓ Backend       http://localhost:3000

Application ready.
```

---

# 📦 Part 21 — Expected Deliverables

Your GitHub repository must contain:

- [ ] Gateway/Shell application.
- [ ] Minimum 2 Micro Frontends.
- [ ] Backend/server-side application.
- [ ] Monorepo/workspace configuration.
- [ ] Module Federation configuration.
- [ ] Runtime MFE composition.
- [ ] Shared/global state.
- [ ] Event emitter/listener system.
- [ ] `window.NISUM` implementation.
- [ ] Event-driven communication between MFEs.
- [ ] Shared types where appropriate.
- [ ] Shared libraries where appropriate.
- [ ] Backend API integration.
- [ ] Error handling.
- [ ] Loading states.
- [ ] Automated tests.
- [ ] CI pipeline.
- [ ] CD/deployment configuration or documented deployment strategy.
- [ ] Complete README.
- [ ] Architecture diagram.
- [ ] Data-sharing strategy.
- [ ] Architecture decisions.
- [ ] Screenshots/demo.

---

# 📝 README Requirements

Your project README must contain the following sections:

```text
# Project Title

## Overview

## Business Scenario

## Architecture

## Architecture Diagram

## Technologies Used

## Project Structure

## Applications

### Gateway

### MFE 1

### MFE 2

### Backend

## Module Federation

## Monorepo Architecture

## Shared Libraries

## Global State

## Event-Driven Architecture

## NISUM Event System

## Data-Sharing Strategy

## Backend/API

## Error Handling

## Testing

## CI/CD

## Environment Configuration

## Running the Application

## Deployment

## Architecture Decisions

## Challenges & Solutions

## Screenshots / Demo

## Future Improvements

## Conclusion
```

---

# 🚨 Important Rules

1. The project must contain at least **2 MFEs**.
2. The project must contain a **Gateway/Shell**.
3. Module Federation is mandatory.
4. MFEs must be independently structured.
5. MFEs must be composed at runtime.
6. The entire project must exist inside a single monorepo/workspace.
7. The application must be startable with a single command.
8. A server-side/backend application is mandatory.
9. Global/shared state must be implemented.
10. Event-driven communication must be implemented.
11. The event system must be accessible through the global `window` object.
12. The implementation must provide functionality similar to:
   ```text
   NISUM.emit("eventName", data)
   NISUM.listener("eventName", handler)
   ```
13. At least two MFEs must communicate using the event system.
14. At least two MFEs must demonstrate meaningful shared/global state usage.
15. Do not directly access another MFE's internal implementation.
16. Do not copy remote MFE source code into the Gateway.
17. API URLs and environment-specific configuration must not be hardcoded.
18. Do not commit secrets or credentials.
19. Automated tests are mandatory.
20. CI pipeline is mandatory.
21. Code should be clean, modular, and maintainable.
22. Architectural decisions must be documented.
23. The project must include a working demonstration.
24. Any deviations from these requirements must be clearly documented.

---

# ⭐ Bonus Requirements

The following features can earn additional credit.

## Bonus 1 — Third MFE

Create a third MFE with a meaningful business responsibility.

```text
Gateway
 ├── MFE 1
 ├── MFE 2
 └── MFE 3
```

---

## Bonus 2 — Authentication

Implement authentication and demonstrate how authentication information is shared between MFEs.

---

## Bonus 3 — Independent Deployment

Deploy:

```text
Gateway
MFE 1
MFE 2
Backend
```

independently.

---

## Bonus 4 — Docker

Containerize the applications.

```text
docker-compose.yml
```

should be able to start the complete system.

---

## Bonus 5 — Cross-Tab Communication

Use browser APIs to synchronize information between browser tabs.

---

## Bonus 6 — Observability

Add meaningful:

- Logging
- Error tracking
- Application health checks

---

## Bonus 7 — Feature Flags

Implement feature flags that control MFE functionality.

---

## Bonus 8 — Automated Deployment

Configure the CI/CD pipeline to automatically deploy successful builds to a hosting environment.

---

# 📊 Evaluation Criteria

| Category | Marks |
|---|---:|
| MFE Architecture | 10 |
| Gateway / Shell | 5 |
| Module Federation | 15 |
| Monorepo Architecture | 10 |
| MFE 1 | 5 |
| MFE 2 | 5 |
| Global / Shared State | 10 |
| Event-Driven Communication | 10 |
| NISUM Event System | 5 |
| Backend / Server-Side | 10 |
| Testing | 5 |
| CI/CD | 5 |
| Documentation & Architecture Decisions | 5 |
| **Total** | **100** |

### Bonus

Additional bonus marks may be awarded for:

- Third MFE
- Independent deployment
- Authentication
- Docker
- Observability
- Feature flags
- Automated deployment
- Other well-justified production-oriented improvements

---

# 📝 Final Submission Checklist

Before submitting your project, verify:

### Architecture

- [ ] Gateway/Shell exists.
- [ ] At least 2 MFEs exist.
- [ ] MFEs have clearly defined responsibilities.
- [ ] Architecture diagram is included.
- [ ] Monorepo is configured.

### Module Federation

- [ ] Gateway is the Host.
- [ ] MFEs are Remotes.
- [ ] Remote modules are exposed.
- [ ] Gateway consumes Remote modules.
- [ ] Runtime composition works.

### Shared State

- [ ] Global/shared state is implemented.
- [ ] Multiple MFEs consume shared state.
- [ ] State updates work correctly.
- [ ] Shared state is used meaningfully.

### Event System

- [ ] Global event system is implemented.
- [ ] Event system is attached to `window`.
- [ ] `NISUM.emit()` works.
- [ ] `NISUM.listener()` works.
- [ ] Events contain meaningful payloads.
- [ ] Multiple MFEs communicate through events.
- [ ] Event listeners are cleaned up appropriately.

### Backend

- [ ] Backend application exists.
- [ ] Frontend communicates with backend.
- [ ] APIs return meaningful data.
- [ ] API errors are handled.
- [ ] Loading states are handled.
- [ ] Environment configuration is implemented.

### Testing

- [ ] Unit/component tests exist.
- [ ] Event system is tested.
- [ ] Shared state is tested.
- [ ] Important MFE functionality is tested.

### CI/CD

- [ ] CI pipeline exists.
- [ ] Dependencies are installed automatically.
- [ ] Lint/type checks run.
- [ ] Tests run automatically.
- [ ] Applications build successfully.
- [ ] CD/deployment strategy is documented or implemented.

### Documentation

- [ ] README is complete.
- [ ] Architecture is documented.
- [ ] Data-sharing strategy is documented.
- [ ] Architecture decisions are documented.
- [ ] Challenges and solutions are documented.
- [ ] Screenshots/demo are included.
- [ ] Running instructions are documented.

---

# 🎓 Final Goal

The purpose of this project is **not simply to build another web application**.

The objective is to demonstrate that you can design and implement a complete application using **Micro Frontend architecture**.

Your final application should demonstrate the complete journey:

```text
                     ┌──────────────────────┐
                     │    Gateway / Shell   │
                     │        Host          │
                     └──────────┬───────────┘
                                │
                         Module Federation
                                │
                ┌───────────────┼───────────────┐
                │               │               │
                ▼               ▼               ▼
             MFE 1           MFE 2           MFE 3
                │               │               │
                └───────────────┼───────────────┘
                                │
                   ┌────────────┴────────────┐
                   │                         │
                   ▼                         ▼
             Global State              Event System
                   │                         │
                   │                    window.NISUM
                   │                         │
                   └────────────┬────────────┘
                                │
                                ▼
                         Backend / APIs
                                │
                                ▼
                           Data Layer
```

You should be able to explain:

> **How can multiple independently developed Micro Frontends work together as one complete application while sharing data, state, events, UI, and backend services without becoming tightly coupled?**

You should also be able to justify when to use:

```text
Module Federation
        ↓
Shared Libraries
        ↓
Global State
        ↓
Event-Driven Communication
        ↓
Browser Data Sharing
        ↓
Backend APIs
        ↓
CI/CD
```

based on:

- Coupling
- Scalability
- Maintainability
- Performance
- Deployment independence
- Security
- Communication requirements
- Application complexity

---

# 🚀 Final Challenge

Design your application as if it were going to be maintained by **multiple engineering teams**.

Think about:

```text
Team A → MFE 1
Team B → MFE 2
Team C → Gateway
Team D → Backend
Team E → Shared Libraries
```

Your architecture should make it possible for these teams to work independently while still producing **one cohesive application**.

The final project should demonstrate not only **how to build Micro Frontends**, but also **how to architect, communicate, test, deploy, and maintain them at scale**.

---

# 💡 Tips

- Start with the architecture before writing code.
- Clearly define the responsibility of every MFE.
- Keep MFEs focused on their business domains.
- Keep shared libraries generic.
- Avoid unnecessary global state.
- Prefer events when you only need to notify another MFE that something happened.
- Use shared state when multiple MFEs genuinely need the same application state.
- Keep backend responsibilities separate from frontend responsibilities.
- Handle Remote loading failures gracefully.
- Test communication between MFEs.
- Test your application with one Remote intentionally stopped.
- Keep environment configuration separate from source code.
- Make your CI pipeline run on every Pull Request.
- Document your architectural decisions.

---

# 🏁 Conclusion

This final project is your opportunity to demonstrate everything you have learned during the MFE training.

Build a system that is:

**Modular → Scalable → Testable → Maintainable → Independently Deployable**

Most importantly:

> **Don't just make the MFEs work. Be able to explain why your architecture works.**

# 🚀 Good Luck!

Build something meaningful, make thoughtful architectural decisions, and demonstrate that you are ready to design and work with Micro Frontend systems in a real-world engineering environment.
