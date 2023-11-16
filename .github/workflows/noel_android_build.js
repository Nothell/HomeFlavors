name: Deploy-Android-TEST

on:
  workflow_dispatch:
    branches: [Development]
  push:
    tags:
      - 'v[0-9]+.[0-9]+.[0-9]+([0-9]+)'

env:
  APP_CENTER_TOKEN: ${{ secrets.APP_CENTER_TOKEN_MYAPP_ANDROID_TEST }}
  APP_NAME: ${{ 'MyApp-Android/ENV_TEST' }}
  TESTING_GROUP: ${{ 'ENV_TEST' }}
  UPLOAD_FILE: ${{ 'android/app/build/outputs/apk/app-release.apk' }}

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'

      - name: Install Dependencies
        run: |
          cd Home-Flavours-GIT
          npm install

      - name: Build Android Release APK
        run: |
          cd Home-Flavours-GIT
          npm install -g expo-cli
          npm install -g appcenter-cli
          expo install appcenter appcenter-analytics appcenter-crashes
          npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
          npx react-native run-android --variant=release

      - name: Upload to App Center
        uses: wzieba/AppCenter-Github-Action@v1
        with:
          appName: ${{ env.APP_NAME }}
          token: ${{ env.APP_CENTER_TOKEN }}
          group: ${{ env.TESTING_GROUP }}
          file: ${{ env.UPLOAD_FILE }}
          notifyTesters: true
          debug: false
