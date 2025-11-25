# MultiKick - AI Agent Instructions

## Project Overview
MultiKick is a Next.js app that allows users to watch multiple Kick.com streamers simultaneously. Built with T3 Stack (Next.js + TypeScript + Tailwind CSS v4).

## Architecture & Data Flow

### State Management Pattern
- **No external state library** - uses React hooks exclusively
- `useLocalStorage` hook (`src/hooks/useLocalStorage.tsx`) syncs state with localStorage AND URL query params
  - URL param takes precedence: `?streamers=xqc,shroud` hydrates streamer list
  - Returns tuple: `[value, setValue, isLoading]` - always check loading state before render
- `useToggle` hook for boolean UI states (modals, chatroom visibility)

### Component Architecture
```
index.tsx (main page)
├── Players (grid of streamer iframes)
│   └── Player (individual iframe with delete button)
├── Chatroom (tabbed chat interface)
└── Modal Components (Card wrapper + Modal header)
    ├── AddStreamer (manage streamer list)
    └── ShareLayout (generate shareable URL)
```

### Key Files
- `src/pages/index.tsx` - Main page, state orchestration, layout logic
- `src/components/players.tsx` - **Box packing algorithm** (`packStreamers`) calculates optimal 16:9 grid layout
- `src/components/chatroom.tsx` - Tabbed chat with iframe height hack (`calc(100% + 118px)`)
- `src/components/helpers/modal.tsx` - Reusable modal with title + close button
- `src/components/helpers/card.tsx` - Draggable wrapper using `react-draggable`

## Styling Conventions

### Tailwind CSS v4
- Uses `@theme` directive in `globals.css` for custom colors: `--color-kick-green: #53FC18`
- Custom utility: `.center` class for absolute centering
- Responsive: `md:` breakpoint for chat sidebar (400px)
- Hover states: Use `group` + `group-hover:` for child elements (see Player delete button)

### Component Patterns
- **IconButton** (`src/components/helpers/iconbutton.tsx`): Highly configurable with:
  - `visibleOnParentHover` - shows only on parent hover
  - `eventPropagation={false}` - stops click bubbling
  - `hoverClasses` - custom hover styles
  - `extraClasses` - additional CSS classes
- **Modal wrapper**: `Card` component makes content draggable via `.drag-handle` class, `.no-drag` prevents drag on buttons

## External Dependencies

### Kick.com Integration
- **Player embeds**: `https://player.kick.com/${streamer}`
- **Chat embeds**: `https://kick.com/${streamer}/chatroom`
- Note: Chat iframe uses height hack to hide Kick's header/footer

### Critical Libraries
- `@react-hook/size` - Window size tracking for grid layout calculations
- `react-draggable` - Modal dragging (requires `nodeRef` to avoid findDOMNode warnings)
- `@vercel/analytics` - Analytics injected in `_app.tsx`

## Development Workflow

### Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint check
```

### Path Aliases
- `~/` maps to `src/` (configured in `tsconfig.json`)
- Example: `import Card from "~/components/helpers/card"`

### TypeScript Strictness
- `strict: true` + `noUncheckedIndexedAccess: true`
- All component props use explicit types (e.g., `type PlayerType = {...}`)
- Prefer `React.FC<PropsType>` pattern

## Important Patterns

### Streamer Management
- Deletion logic checks if deleted streamer is active chatroom → auto-switches to previous/next
- Share URLs encode streamers as comma-separated: `?streamers=streamer1,streamer2`

### Responsive Behavior
- Chat sidebar: Hidden on mobile (`invisible w-0`), shows on `sm:` (`visible`), fixed width on `md:` (`w-[400px]`)
- Players container adjusts width: `w-full` (no chat) vs `md:w-[calc(100%-400px)]` (with chat)

### Modal/Card Pattern
- `Card` controls visibility + dragging
- `Modal` provides consistent header with title + close icon
- Children render modal body content
- Use `.drag-handle` on header, `.no-drag` on interactive elements

## Gotchas
- `useLocalStorage` returns loading state as 3rd tuple element - prevents hydration mismatches
- Player grid uses custom packing algorithm - don't use CSS grid/flexbox alone
- Chatroom iframe needs `position: absolute` with overflow wrapper for height hack
- IconButton `onClick` with `eventPropagation={false}` required for nested clickable elements
