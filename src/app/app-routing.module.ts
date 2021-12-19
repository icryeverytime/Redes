import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublishedarticleComponent } from './publishedarticle/publishedarticle.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubidaPostsComponent } from './subida-posts/subida-posts.component';
import { TagsComponent } from './tags/tags.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  {path: 'signup',component: SignUpComponent},
  {path: 'login',component: LoginComponent},
  {path: 'user/:user',component:UserComponent},
  {path: 'articles',component:SubidaPostsComponent},
  {path: 'publishedarticles/:id',component: PublishedarticleComponent},
  {path: 'search/:search',component: SearchComponent},
  {path: 'tags/:tags',component: TagsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomeComponent,LoginComponent,SignUpComponent]