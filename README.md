## Take Home Assignment
This repository is a minimal version of our existing web application.

We'd like you to **spend up to 2 hours** setting up and digging into this repository to answer either or both of these two questions:

**1. What is a feature that you think could improve our "cases per user" metric**
- What other metrics would be impacted by your feature?
- How would you A/B test it?

**2. What would you improve abour our frontend dev infrastructure?**
- Why would you invest in improving there? What is the problem that it solves?
- What alternatives have you considered?

There are a few bugs that were introduced into this repository, but consider them "extra credit" if you find them. A good answer to the above questions is more important than bug identification.


## Prerequisites

- Bun v1.2+

## Development

```bash
# Install dependencies
bun install

# Start dev server (http://localhost:3000)
bun dev
```

## Testing & Linting

```bash
# Run tests
bun test

# Run E2E tests
bun test:e2e
bun test:e2e:ui  # with UI

# Lint code
bun run lint
```

## Project Structure

```
src/
├── app/             # Next.js App Router pages and layouts
├── components/      # Shared UI components
├── features/        # Feature-specific code 
│   ├── cases/       # Case management features
│   └── landing/     # Landing page features
├── store/           # Global state management
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

# Disabled CI/CD and Infrastructure for Take-Home Test

## Branching Strategy
- **main**: Production - deploys to production after tests pass
- **staging**: Staging - deploys to staging environment
- **feature/***:  Feature branches - create PRs against staging

## CI/CD Flow
1. **PR** → Preview env at `https://pr-<number>.preview.website.com`
2. **staging branch** → Deploys to `https://staging.website.com`
3. **main branch** → Deploys to staging → Tests on staging → Deploys to `https://website.com`

## Environments
- **Production**: `https://website.com`
- **Staging**: `https://staging.website.com`
- **PR Previews**: `https://pr-<number>.preview.website.com`
