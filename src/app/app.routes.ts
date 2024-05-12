import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./componentes/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registro',
        loadComponent: () => import('./componentes/registro/registro.component').then(m => m.RegistroComponent)
    },
    {
        path:'about',
        loadComponent: () => import('./componentes/about/about.component').then(m => m.AboutComponent)
    },
    {
        path:'game',
        children:[
            {
                path: 'cardguess',
                loadComponent: () => import('./componentes/juegos/cardguess/cardguess.component').then(m => m.CardguessComponent)
            },
            {
                path: 'hangman',
                loadComponent: () => import('./componentes/juegos/hangman/hangman.component').then(m => m.HangmanComponent)
            },
            {
                path: 'trivia',
                loadComponent: () => import('./componentes/juegos/trivia/trivia.component').then(m => m.TriviaComponent)
            }
        ]
    },
    { 
        path: '**',
        loadComponent: () => import('./componentes/notfound/notfound.component').then(m => m.NotfoundComponent) 
    }
];
