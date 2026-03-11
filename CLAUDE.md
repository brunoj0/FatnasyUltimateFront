# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start              # Start dev server at http://localhost:4200
npm run build          # Production build to dist/fantasy-ultimate-front

# Testing
npm test               # Run all tests via Karma
ng test --include=**/my-team.component.spec.ts  # Run single test file

# Code formatting (runs automatically via husky pre-commit hook)
npx prettier --write "**/*.{js,css,md,ts}"
```

## Architecture

This is an Angular 19 fantasy sports application (Ultimate Frisbee themed) using:

- **NgRx Signals** for state management (not traditional NgRx Store/Effects)
- **Angular Material** for UI components
- **SCSS** for styling

### State Management Pattern

The app uses NgRx Signal Stores with a two-store architecture:

- **PlayerStore** (`src/app/core/player.store.ts`): Manages player entities, loading state, and WebSocket real-time stat updates. Uses `withEntities<Player>()` for entity management.

- **LeagueStore** (`src/app/core/league.store.ts`): Manages user team composition, formations, and player positions. Injects PlayerStore for computed selectors that combine league and player data.

Key pattern: LeagueStore computes derived data like `playersWithPosition` and `playerWithAvailability` from PlayerStore entities.

### Domain Model

- **Formation**: Team formations (VerticalStack, HorizontalStack, Hex) determine player positions (Handler, Cutter, Flex)
- **Player availability**: `SAME_TEAM` | `TRANSFER` | `AVAILABLE` - controls which players can be acquired
- Mock data is in `src/mocks/players.ts`

### Component Structure

- **MainDashboardComponent**: Root authenticated view, provides LeagueStore, contains tabs for MyTeam and PlayersList
- **GenericGridComponentComponent**: Reusable table component used across player lists with position-based fantasy point calculations
- Standalone components are preferred (most components use `standalone: true`)

### Routing

Two routes protected by `authGuard`:

- `/login` - LoginComponent
- `/` - MainDashboardComponent (protected)
