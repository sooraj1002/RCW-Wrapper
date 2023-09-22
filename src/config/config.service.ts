import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  credentialsServiceURL: string | undefined;

  setCredentialsServiceURL(url: string) {
    this.credentialsServiceURL = url;
    console.log('set the credential successfully, the credential is:');
    console.log(this.credentialsServiceURL);
  }

  getCredentialsServiceURL(): string | undefined {
    return this.credentialsServiceURL;
  }
}
