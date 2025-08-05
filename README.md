# Word AI

A desktop application that generates contextual stories for vocabulary words using AI.

## Features

- **AI-Powered Stories**: Generates contextual narratives for any word
- **Interactive Word Links**: Click any word in the text to explore its story
- **Real-time Streaming**: Watch AI responses generate in real-time
- **Desktop Native**: Built with Tauri for cross-platform desktop performance

## Development

```bash
bun install
just dev
```

## Build

```bash
npm run build
```

## Configuration

The application requires environment variables for AI service integration:

- `API_KEY`: AI service authentication key
- `AI_URL`: AI service endpoint
- `MODEL` - AI model name

## License

MIT
