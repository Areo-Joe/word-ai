# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tauri + React application called "word-ai" that creates vocabulary stories for words. The app combines a Rust backend with a React frontend to provide AI-powered word explanations through streaming responses.

## Development Commands

### Primary Development
- `just dev` - Start the development server (uses dotenvx for environment variables)
- `bun tauri dev` - Alternative dev command without dotenvx
- `npm run build` - Build the application (runs TypeScript compilation first)
- `npm run tauri` - Run Tauri commands

### Available Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Compile TypeScript and build with Vite
- `npm run preview` - Preview production build
- `npm run tauri` - Tauri CLI commands

## Architecture

### Frontend (React)
- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router with file-based routing in `src/routes/`
- **Styling**: Tailwind CSS 4 with Vite plugin
- **Build**: Vite with React Compiler enabled
- **Key Components**:
  - `LinkMaker` - Creates clickable word links from text
  - Routes are defined in `src/routes/` with automatic code splitting

### Backend (Rust/Tauri)
- **Framework**: Tauri 2 for desktop application
- **AI Integration**: Uses external AI service (currently configured for GLM-4.5-flash)
- **Streaming**: Real-time AI responses via Server-Sent Events
- **Key Files**:
  - `src-tauri/src/ai.rs` - AI streaming functionality
  - `src-tauri/src/main.rs` - Application entry point

### Environment Configuration
- Uses dotenvx for environment variable management
- Required environment variables:
  - `API_KEY` - AI service authentication
  - `AI_URL` - AI service endpoint
- Cloud configuration in `cloudbaserc.json`

## Key Features

1. **Word Linking**: Automatically converts words in text to clickable links
2. **AI Stories**: Generates 50-100 word stories explaining vocabulary
3. **Streaming Responses**: Real-time AI response streaming
4. **Desktop App**: Native desktop application using Tauri

## Development Setup

The project uses:
- Bun as package manager (evidenced by bun.lock)
- Just for command execution
- TypeScript with strict mode enabled
- React Compiler for optimized performance

## File Structure Notes

- `src/routes/` - File-based routing with TanStack Router
- `src-tauri/` - Rust backend code and Tauri configuration
- `public/` - Static assets
- Component patterns follow React functional components with TypeScript

## Development Guidelines

### Code Length Principle
When writing code, keep implementations concise and focused for easy user review. Prioritize clarity and brevity over complex solutions.