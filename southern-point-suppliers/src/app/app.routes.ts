import { Routes } from '@angular/router';
import { AboutPage } from './pages/about-page/about-page';
import { BrandsPage } from './pages/brands-page/brands-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { QuotePage } from './pages/quote-page/quote-page';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'about', pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutPage
    },
    {
        path: 'brands',
        component: BrandsPage
    },
    {
        path: 'contact',
        component: ContactPage
    },
    {
        path: 'quote',
        component: QuotePage
    },
    {
        path: '**',
        redirectTo: ''
    }

];
