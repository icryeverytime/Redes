import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SubidaPostsComponent } from './subida-posts/subida-posts.component';
import { PublishedarticleComponent } from './publishedarticle/publishedarticle.component';
import { SearchComponent } from './search/search.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    UserComponent,
    SubidaPostsComponent,
    PublishedarticleComponent,
    SearchComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }