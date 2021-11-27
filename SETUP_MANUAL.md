# ENVIRONMENT

Setting up environment for react native project divide in two part. First part is `js layer`
second part is `native layer`.

`js layer` handled by `env` directory of the app and
`/sripts/set-env.js` script. In `native layer` we need additional setup that we tackle them in `Android` and `Ios`
section. At the end we have four script for each `android` and `ios`

## `Package.json`

```json
{
  "scripts": {
    "set:env:dev": "node ./scripts/set-env.js --env dev",
    "set:env:prod": "node ./scripts/set-env.js --env prod",
    "android:dev:debug": "yarn set:env:dev && yarn android --variant devDebug",
    "android:dev:release": "yarn set:env:dev && yarn android --variant devRelease",
    "android:prod:debug": "yarn set:env:prod && yarn android --variant prodDebug",
    "android:prod:release": "yarn set:env:prod && yarn android --variant prodRelease",
    "ios:dev:debug": "yarn set:env:dev && yarn ios --configuration Debug --scheme Dev",
    "ios:dev:release": "yarn set:env:dev && yarn ios --configuration Dev.Release --scheme Dev --device",
    "ios:prod:debug": "yarn set:env:prod && yarn ios --configuration Debug --scheme Prod",
    "ios:prod:release": "yarn set:env:prod && yarn ios --configuration Prod.Release --scheme Prod --device"
  }
}
```

## Android

There is two important concept in android

- ### Build type
  Each android project start with two default build type, include `debug` and  `release`, of course we can add our build
  type.
- ### Build variant ( flavor )
  Flavor is a concept in gradle project for setting up different environment. for example if we have `dev` and `prod`
  environment in the project we should define two `productFlavors`
  in `android/app/build.gradle` like this:
  ```markdown
    flavorDimensions "default"

    productFlavors {
      dev {
        applicationIdSuffix ".dev"
        dimension "default"

      }
      prod {
        dimension "default"

      }
  ```

  On `productFlavors` object there is  `dev` and `prod`
  flavor. In these objects we overwrite our property.

  As an example we add .dev suffix to  `applicationId`. with this config in dev flavor, application id of project has
  .dev suffix at the end. thanks to this config now we can install both `dev` and `prod`
  flavor of the app on the same device. For each flavor there is two build type: `debug` and `release`

### Different files for each flavor

`android/app/`

- `/src`
  - `/dev`
  - `/main`
    - `/jave`
      - `...`
    - `/res`
    - `AndroidManifest.xml`
  - `/prod`

This can be our project structure in `src`
after adding our flavor into project. each of `/dev` and `/prod` is clone of the `main` folder, This values will
overwrite the corresponding value in `main`
folder.

Flavor files doesn't need to be cloned of all the `main` directory, just those files that flavor edit them.

### Resources

- [Environment for React native](https://blog.logicwind.com/adding-multiple-target/)

## Ios

The ios platform use `configurations` and `scheme`
for setting up environment.

### Configuration

Select the project in xcode, in `info` tab search for
`Configuration` and duplicate the  `release` configuration. suppose we want to create `dev` and `prod` environment, so
we should create `Dev.Release` and `Prod.Release` configuration.

For debug, we can't do the same thing because of
[React native debug configuration bug](https://zeemee.engineering/how-to-set-up-multiple-schemes-configurations-in-xcode-for-your-react-native-ios-app-7da4b5237966#:~:text=Step%204%E2%80%8A%E2%80%94%E2%80%8ATelling%20React%20Native%20to%20build%20in%20debug%20mode)

### Scheme

Now we create two scheme for `dev` and `prod` environment in xcode project.

Select each scheme and edit them. for `Run` `Test` and `Analyze` choose the `Debug` configuration. for `dev` scheme
set `Profile` and `Archive` to  `Dev.Release`
and for `prod` scheme set `Profile` and `Archive` to `Prod.Release`

for more detail
check [this link](https://blog.logicwind.com/adding-multiple-target/#:~:text=from%20Android%20section.-,iOS,-Adding%20new%20configurations)

# OTA UPDATE

## Android

### `build.gradle`

Add this line in `android/app/build.gradle` in `defaultConfig` section:

  ```json
manifestPlaceholders = [
  updateUrl
  :
  "https://otaUpdateUrl/android-index.json"
]
```

Now in `dev` flavor section add this line:

  ```json
manifestPlaceholders = [
  updateUrl
  :
  "https://DevOtaUpdateUrl/android-index.json"
]
```

In `prod` flavor section add this line:

```json
manifestPlaceholders = [
  updateUrl
  :
  "https://ProdOtaUpdateUrl/android-index.json"
]
```

### `AndroidManifest.xml`

Add this line into `AndroidManifest.xml`

  ```xml

<meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="${updateUrl}"/>
<meta-data android:name="expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH" android:value="NEVER"/>
```

## Ios

Add this files to ios project in this path:

- `/ios`
  - `/AppName`
    - `/Env`
      - `Expo`
        - `Expo.Debug.plist`
        - `Expo.Dev.Release.plist`
        - `Expo.Prod.Release.plist`
        - `Expo.Release.plist`

`Expo.Debug.plist` content:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>EXUpdatesSDKVersion</key>
    <string>40.0.0</string>
    <key>EXUpdatesURL</key>
    <string>https://otaUpateUrl.com/update/ios-index.json</string>
    <key>EXUpdatesEnabled</key>
    <true/>
    <key>EXUpdatesCheckOnLaunch</key>
    <string>ALWAYS</string>
    <key>EXUpdatesLaunchWaitMs</key>
    <integer>1</integer>
  </dict>
</plist>

  ```

`Expo.Dev.Release.plist` content:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>EXUpdatesSDKVersion</key>
    <string>40.0.0</string>
    <key>EXUpdatesURL</key>
    <string>https://DevOtaUpateUrl.com/update/ios-index.json</string>
    <key>EXUpdatesEnabled</key>
    <true/>
    <key>EXUpdatesCheckOnLaunch</key>
    <string>ALWAYS</string>
    <key>EXUpdatesLaunchWaitMs</key>
    <integer>1</integer>
  </dict>
</plist>
  ```

`Expo.Prod.Release.plist` content:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>EXUpdatesSDKVersion</key>
    <string>40.0.0</string>
    <key>EXUpdatesURL</key>
    <string>https://ProdOtaUpateUrl.com/update/ios-index.json</string>
    <key>EXUpdatesEnabled</key>
    <true/>
    <key>EXUpdatesCheckOnLaunch</key>
    <string>ALWAYS</string>
    <key>EXUpdatesLaunchWaitMs</key>
    <integer>1</integer>
  </dict>
</plist>
  ```

`Expo.Release.plist` content:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>EXUpdatesSDKVersion</key>
    <string>40.0.0</string>
    <key>EXUpdatesURL</key>
    <string>https://ProdOtaUpateUrl.com/update/ios-index.json</string>
    <key>EXUpdatesEnabled</key>
    <true/>
    <key>EXUpdatesCheckOnLaunch</key>
    <string>ALWAYS</string>
    <key>EXUpdatesLaunchWaitMs</key>
    <integer>1</integer>
  </dict>
</plist>

  ```

Now select your target from `Target` section of xcode go to `Build Phase`

Click on `+` button and select `New Run Script Phase`

Add this script to it:

  ```shell
# Type a script or drag a script file from your workspace to insert its path.
cp ${SRCROOT}/ProjectName/Env/Expo/Expo.$CONFIGURATION.plist ${SRCROOT}/ProjectName/Supporting/Expo.plist
```

Add this line to `Output Files`:

  ```shell
${SRCROOT}/ProjectName/Supporting/Expo.plist
```

Save script with name of `ChangeExpoUpdateUrl`

Move it on top of `Copy Bundle Resourses`

Done!

## Release OTA UPDATE

for  `prod` run commands:

`yarn export:prod`

for  `dev` run commands:

`yarn export:dev`

Result of those command is in `dist` directory in root path of project.

To release an update just ulpad content of `dist` directory in:

- `dev`:
  - `https://DevOtaUpateUrl.com/update`

- `prod`:
  - `https://ProdOtaUpateUrl.com/update`
