# MultiKick

MultiKick is a web application that lets you watch multiple Kick.com streamers simultaneously in a customizable grid layout with integrated chat.

## Purpose

Kick.com's native interface only allows viewing one stream at a time. MultiKick solves this by:

- **Multi-stream viewing**: Watch as many streamers as you want in an optimized grid layout
- **Integrated chat**: Switch between streamer chats in a dedicated sidebar
- **Shareable layouts**: Generate URLs to share your exact streamer configuration with friends
- **Persistent state**: Your streamer list is saved locally and can be bookmarked via URL parameters

Perfect for keeping up with multiple streamers during events, comparing perspectives, or following your favorite creators simultaneously.

## Tech Stack

Built with the [T3 Stack](https://create.t3.gg/):

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS v4](https://tailwindcss.com) - Styling with custom theme

Additional dependencies:

- `@react-hook/size` - Responsive layout calculations
- `react-draggable` - Draggable modal windows
- `@vercel/analytics` - Usage analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/QiyuanChen02/multikick.git
cd multikick
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Adding Streamers

1. Click "Add Streamer" button at the bottom
2. Enter the Kick.com username (e.g., "xqc")
3. Click "Add" or press Enter

### Managing Your Layout

- **Remove Streamers**: Hover over a player or chat tab and click the X button
- **Toggle Chat**: Click "Show/Hide Chat" at the bottom
- **Share Layout**: Click "Share Layout" to get a shareable URL

### URL Parameters

Access a specific layout directly:
```
https://yourdomain.com/?streamers=xqc,shroud,trainwreckstv
```

The first streamer in the list becomes the active chat by default.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- Streams and chat powered by [Kick.com](https://kick.com)
