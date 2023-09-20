import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class CredentialsService {
  private logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('CredentialsService');
  }

  async createCredentialSchema(
    author: string,
    version: string,
    schema: object,
  ) {
    try {
      const schemaResp: AxiosResponse = await this.httpService.post(
        `${process.env.CREDENTIALS_SERVICE_URL}/credential-schema`,
        {
          schema: {
            type: 'https://w3c-ccg.github.io/vc-json-schemas/',
            name: 'Proof of Academic Evaluation Credential',
            version: version,
            author: author,
            authored: new Date().toISOString(),
            schema: {
              $id: 'Proof-of-Academic-Evaluation-Credential-1.0',
              $schema: 'https://json-schema.org/draft/2019-09/schema',
              description:
                'The holder has secured the <PERCENTAGE/GRADE> in <PROGRAMME> from <ABC_Institute>.',
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
                grade: {
                  type: 'string',
                  description: 'Grade (%age, GPA, etc.) secured by the holder.',
                },
                programme: {
                  type: 'string',
                  description: 'Name of the programme pursed by the holder.',
                },
                certifyingInstitute: {
                  type: 'string',
                  description:
                    'Name of the instute which certified the said grade in the said skill',
                },
                evaluatingInstitute: {
                  type: 'string',
                  description:
                    'Name of the institute which ran the programme and evaluated the holder.',
                },
              },
              required: [
                'grade',
                'programme',
                'certifyingInstitute',
                'evaluatingInstitute',
              ],
              additionalProperties: true,
            },
          },
          tags: ['tag1', 'tag2'],
          status: 'DRAFT',
        },
      );
      return schemaResp.data;
    } catch (err) {
      this.logger.error('Error while creating schema', err);
      throw new InternalServerErrorException('Error while creating schema');
    }
  }
}
