/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import Index from './app/Index';
import { default as Index } from './app/router/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Index);
