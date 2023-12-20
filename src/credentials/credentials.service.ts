import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CredentialsService {
  private logger: Logger;
  private credentialServiceURL: string | undefined;

  constructor() {
    this.logger = new Logger('Credentials Service');
  }

  setCredentialsServiceURL(url: string) {
    this.credentialServiceURL = url;
    console.log('set the credential successfully, the credential is:');
    console.log(this.credentialServiceURL);
  }

  async getCredentials(
    tags: string,
    page: string,
    limit: string,
  ): Promise<any> {
    console.log('this is get credentials method and the value of the link is:');
    console.log(this.credentialServiceURL);
    try {
      const response = await axios.get(this.credentialServiceURL, {
        params: {
          tags: tags.split(','),
          page: isNaN(parseInt(page)) ? 1 : parseInt(page),
          limit: isNaN(parseInt(limit)) ? 10 : parseInt(limit),
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error('Error while fetching credentials', error);
      throw new InternalServerErrorException('Could not fetch credentials');
    }
  }

  async getCredentialsBySubject(
    subject_id: string,
    page: string,
    limit: string,
  ) {
    try {
      const response = await axios.post(
        `${this.credentialServiceURL}/search`,
        subject_id,
        {
          params: { page, limit },
        },
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error while getting credentials by subject', error);
      throw new InternalServerErrorException(
        'Could not get credentials by subject',
      );
    }
  }

  async getCredentialsById(
    id: string,
    templateId: string | undefined,
    acceptHeader: string | null,
  ): Promise<any> {
    if (acceptHeader == null) {
      acceptHeader = 'application/json';
    }

    try {
      if (!templateId && acceptHeader !== 'application/json') {
        throw new BadRequestException('Template id is required');
      }

      const link = this.credentialServiceURL + id;
      const response = await axios.get(link, {
        headers: {
          Accept: acceptHeader,
          templateid: templateId || '',
        },
      });

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        throw new BadRequestException('Bad request');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    } catch (error) {
      console.error('Error while fetching credential by ID', error);
      throw new InternalServerErrorException(
        'Could not fetch credential by ID',
      );
    }
  }

  async issueCredentials(issueRequest: LocalIssueCredentialDTO) {
    try {
      const response = await axios.post(
        `${this.credentialServiceURL}/issue`,
        issueRequest,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error in issuing credential', error);
      throw new InternalServerErrorException('Could not issue credential');
    }
  }

  async deleteCredential(id: string) {
    try {
      const url = `${this.credentialServiceURL}/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      this.logger.error('Error in deleting credential', error);
      throw new InternalServerErrorException('Could not delete credential');
    }
  }

  async verifyCredential(credId: string) {
    try {
      const url = `${this.credentialServiceURL}/${credId}/verify`;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

interface LocalIssueCredentialDTO {
  credential: any;
  credentialSchemaId: string;
  credentialSchemaVersion: string;
  tags: string[];
  method?: string;
}

interface CredentialsServiceAPI {
  setCredentialsServiceURL(url: string);

  getCredentials(tags: string, page: string, limit: string): Promise<any>;

  getCredentialsBySubject(
    subject_id: string,
    page: string,
    limit: string,
  ): Promise<any>;

  getCredentialsById(
    id: string,
    templateId: string | undefined,
    acceptHeader: string | null,
  ): Promise<any>;

  issueCredentials(issueRequest: LocalIssueCredentialDTO): Promise<any>;

  deleteCredential(id: string): Promise<any>;

  verifyCredential(credId: string): Promise<any>;
}

export { CredentialsServiceAPI };
