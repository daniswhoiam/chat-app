# chat-app

This is a chat app for mobile devices using React Native. It will enable users to chat and share their images and locations.

## Used technologies
* React Native
* Expo
* Google Firestore Database
* Google Firebase Authentication
* Google Firebase Cloud Storage
* Gifted Chat (library)

## Installation
This project uses JavaScript (JS). To run JS on your machine, you need to have Node.js installed. It is also recommended that you use a package manager, e.g. npm.
For both of those, check [nodejs.org](https://nodejs.org/) and [npmjs.com](https://npmjs.com/).

Further, since this is a mobile app written in React Native, you need to use Expo, which you can install like this:
```
npm install expo-cli --global
```
Please note that this installs "expo-cli" as a global package, which means it will be available in projects outside this one as well.

In the next step, clone this repository to your local environment. One way to do this is via CLI.
```
git clone https://github.com/daniswhoiam/chat-app.git
```

The last step is to install all necessary dependencies:
```
npm install
```

## Usage
To start the app, run this command
```
expo start
```
This will start a window in your browser from which you can start the app on a simulator, an emulator or an actual mobile device.

**Please note**

To properly use Expo, you will need a free Expo account which you can set up at [expo.io](https://expo.io/)

You can then use the official Expo app on your device (please refer to to your device's respective App Store), or use a simulator/emulator:
*[Tutorial for Android](https://docs.expo.io/workflow/android-studio-emulator/)
*[Tutorial for iOS](https://docs.expo.io/workflow/ios-simulator/)

Fore more information on how to use the Expo UI and apps, please refer to [docs.expo.io](https://docs.expo.io)
