/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/appConfig/Context';
// import App from './src/screens/HomeScreen/index'
// import App from './src/screens/CovidTestKitScanScreen/index'
// import App from './src/screens/test'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
