# Linear Telegram Bot 🤖

A powerful Telegram bot for seamless ticket management in [Linear](https://linear.app). Create, edit, assign, and track issues directly from Telegram with AI-powered natural language processing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)

## ✨ Features

- **🎫 Ticket Creation**: Create Linear tickets directly from Telegram with natural language
- **🤖 AI-Powered Parsing**: Uses OpenAI to understand your intent and extract ticket details
- **👤 Smart Assignee Matching**: Mention team members by name, alias, or Telegram username
- **📊 Status Updates**: Change ticket status with simple commands
- **✏️ Edit Tickets**: Modify title, description, assignee, or status
- **🔔 Real-time Webhooks**: Receive updates when tickets change in Linear
- **🔐 Access Control**: Whitelist authorized users
- **💾 Redis Persistence**: Track ticket history per chat

## 🚀 Quick Start

### Prerequisites

- Node.js v20+
- Redis server
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Linear API Key
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Flotapponnier/Linear---Telegram-Agent-.git
   cd Linear---Telegram-Agent-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Configure team mappings** (optional but recommended)
   
   Edit `src/config/userMappings.ts` to map your team's Telegram usernames to Linear accounts:
   ```typescript
   export const USER_MAPPINGS: UserMapping[] = [
     {
       telegramUsername: 'john_doe',
       linearName: 'john',
       linearEmail: 'john@yourcompany.com',
       aliases: ['john', 'johnny', 'jd'],
     },
     // Add more team members...
   ];
   ```

5. **Start the bot**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | ✅ | Your Telegram bot token |
| `TELEGRAM_ALLOWED_USERNAMES` | ✅ | Comma-separated list of allowed usernames |
| `LINEAR_API_KEY` | ✅ | Your Linear API key |
| `LINEAR_TEAM_ID` | ✅ | Your Linear team ID |
| `LINEAR_WORKSPACE_SLUG` | ✅ | Your Linear workspace slug |
| `LINEAR_TICKET_PREFIX` | ❌ | Ticket prefix (default: "TEAM") |
| `OPENAI_API_KEY` | ✅ | OpenAI API key for AI parsing |
| `REDIS_URL` | ❌ | Redis connection URL (default: localhost:6379) |
| `BOT_BRAND_NAME` | ❌ | Custom bot name (default: "Linear Tracker") |
| `PORT` | ❌ | Server port (default: 4000) |

### Linear Webhook (Optional)

To receive real-time updates when tickets change:

1. Go to Linear Settings → API → Webhooks
2. Create a new webhook pointing to `https://your-domain.com/linear-webhook`
3. Set `LINEAR_SIGNING_SECRETS` in your `.env`

## 📖 Usage

### Basic Commands

```
/ticket <title> | <description>  - Create a new ticket
/help                            - Show help message
```

### AI-Powered Commands

Mention the bot in any chat to use natural language:

```
@yourbot create a ticket for John to fix the login bug

@yourbot assign TEAM-1234 to Alice

@yourbot set TEAM-567 to In Progress

@yourbot edit TEAM-890

@yourbot cancel TEAM-123
```

### Examples

**Create a ticket:**
```
@yourbot create a ticket for the backend team to optimize database queries
```

**Assign to someone:**
```
@yourbot assign this ticket to john
@yourbot give alice the API integration task
```

**Update status:**
```
@yourbot set TEAM-1234 to Done
@yourbot mark this as In Review
```

## 🏗️ Architecture

```
src/
├── config/
│   ├── LinearBotConfig.ts    # Environment configuration schema
│   └── userMappings.ts       # Team member mappings
├── controller/
│   └── LinearWebhookController.ts  # Linear webhook handler
├── guard/
│   └── LinearAuthGuard.ts    # Webhook signature verification
├── services/
│   ├── AIService.ts          # OpenAI integration for NLP
│   └── LinearBotService.ts   # Main bot logic
├── redis/
│   └── redisModule.ts        # Redis connection
├── AppModule.ts              # NestJS app module
└── main.ts                   # Application entry point
```

## 🐳 Docker

```bash
# Build
docker build -t linear-telegram-bot .

# Run
docker run -d \
  --env-file .env \
  -p 4000:4000 \
  linear-telegram-bot
```

## 🛠️ Development

```bash
# Run in development mode with hot reload
npm run start:dev

# Run linting
npm run lint

# Run tests
npm run test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Telegram integration via [Telegraf](https://telegraf.js.org/)
- AI powered by [OpenAI](https://openai.com/)

---

Made with ❤️ by [Florent Tapponnier](https://github.com/Flotapponnier)
