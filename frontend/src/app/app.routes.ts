import { Routes } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [

    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'posts/create/:type', component: CreatePostComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "profile/:id", component: UserProfileComponent },
    { path: '**', redirectTo: '/home' }
];
