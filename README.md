# Pumpipumpe

A React Native mobile application for community-based item sharing, built with Expo. Pumpipumpe allows neighbors to lend and borrow items from each other, promoting sustainable consumption and community connection.

## Features

- **Item Catalog**: Browse available items in your neighborhood with predefined categories
- **Smart Search**: Find items by name, description, or tags
- **Location-Based**: Connect with people nearby for easy item exchange  
- **Category Organization**: Items organized into categories like Tools, Electronics, Kitchen, Garden, Sports, and more
- **Borrowing System**: Request to borrow items with integrated messaging
- **User Profiles**: Manage your items and borrowing history

## Categories

The app includes pre-populated items across multiple categories:
- **Tools** - Drills, hammers, screwdrivers, ladders
- **Garden** - Lawnmowers, pruning shears, wheelbarrows
- **Kitchen** - Stand mixers, food processors, pressure cookers
- **Sports** - Bicycles, tennis rackets, yoga mats
- **Electronics** - Projectors, speakers, cameras
- **Household** - Vacuum cleaners, sewing machines, steamers
- **Automotive** - Car jacks, jumper cables, tire gauges
- **Books** - Cookbooks, travel guides, language books
- **Other** - Camping gear, baby items, musical instruments

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with typed routes
- **Language**: TypeScript
- **UI**: Custom themed components with iOS/Android adaptations
- **State Management**: React hooks and context
- **Icons**: Expo Symbols and Vector Icons

## Getting Started

### Prerequisites
- Node.js
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/spabst/pretAppPorter.git
cd Pumpipumpe

# Install dependencies
npm install

# Start the development server
npm start
```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator  
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint

## Project Structure

```
Pumpipumpe/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── add-item.tsx       # Add new item screen
│   └── custom-item.tsx    # Custom item creation
├── components/            # Reusable UI components
├── data/                  # Static data and mock APIs
├── types/                 # TypeScript type definitions
├── constants/             # App constants and colors
├── hooks/                 # Custom React hooks
└── services/             # API services and utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.