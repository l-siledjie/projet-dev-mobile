import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wimengo.app',
  appName: 'Wimengo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
