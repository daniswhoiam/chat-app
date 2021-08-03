# chat-app

The chat-app is a chatting application for mobile devices using React Native. Users can chat, share images, and share their location.
![chat-app start screen](https://daniswhoiam.github.io/portfolio-website/img/chatapp.png)
#### Table of Contents

- [Objective](#Objective)
- [User Goals](#User-Goals)
- [Key Features](#Key-Features)
- [Stack](#Stack)
- [How to Use](#How-to-Use)

## Objective
The goal was to become familiar with development for mobile devices and React Native as an efficient way of doing so. Using Google Firestore as a backend service allowed to learn how to spin up an app quickly.

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## Stack

 - React Native
 - Expo
 - Google Firestore Database
 - Google Firebase Authentication
 - Google Firebase Cloud Storage
 - Gifted Chat (library for Chat applications)

## How to Use

### Installation
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

### Usage
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
