import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { jwtInterceptor } from './app/shared/interceptors/jwt.interceptor';
import { errorInterceptor } from './app/shared/interceptors/error.interceptor';

const config = mergeApplicationConfig(appConfig, {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor]))
  ]
});

bootstrapApplication(AppComponent, config).catch(err => console.error(err));
