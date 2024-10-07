import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {  BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';


export const appConfig: ApplicationConfig = {
  providers: [ BrowserAnimationsModule, NgxSpinnerModule , provideAnimations(), provideAnimationsAsync() , provideClientHydration() ,provideToastr({timeOut:4000,positionClass: 'toast-bottom-center' , preventDuplicates: false ,closeButton: true,progressBar: true,progressAnimation: 'decreasing'}) , provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideHttpClient(withFetch()),]
  
};
