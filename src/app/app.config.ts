
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyDQbUQVMrHNOUTo1duvJMy76_OJAO0oX-M",//
  authDomain: "tp-labo4-lamas-2024.firebaseapp.com",//
  databaseURL: "https://tp-labo4-lamas-2024-default-rtdb.firebaseio.com",
  projectId: "tp-labo4-lamas-2024",//
  storageBucket: "tp-labo4-lamas-2024.appspot.com",//
  messagingSenderId: "731525438780",//
  appId: "1:731525438780:web:89e3b03b71e4b28a7f5239"//
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(()=> getAuth()),
      provideFirestore(() => getFirestore()),
      provideDatabase(() => getDatabase())
    ),
  provideAnimations()]
};
