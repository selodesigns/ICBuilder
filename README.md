# Idle City Builder

Idle City Builder is a modern incremental/idle game where you build a digital metropolis on a motherboard. Place components, earn DigiCoins, unlock new buildings, and optimize your city for maximum efficiency!

## Features
- Isometric grid-based city building
- Strategic placement with adjacency/synergy bonuses
- Resource management (DigiCoins, Programs, Maintenance)
- Prestige/ascension system for permanent upgrades
- Missions, milestones, and crisis events
- Persistent game state (auto-saves to your browser)
- Interactive onboarding/tutorial and reset progress button
- Polished UI/UX with animations and feedback

## Getting Started

### Prerequisites
- Node.js (16+ recommended)
- npm

### Install dependencies
```bash
npm install
```

### Run the game in development mode
```bash
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Run unit tests
```bash
npm test
```

### Build for production
```bash
npm run build
```

## Project Structure
- `src/components/` — Main UI components and panels
- `src/context/` — React context providers for game state
- `src/utils/` — Game logic utilities and tests
- `src/constants/` — Game constants and building data
- `src/types/` — TypeScript type definitions
- `src/styles/` — Custom CSS and animations

## Contributing
Pull requests and feedback are welcome! Please open an issue to discuss major changes first.

## License
MIT


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
