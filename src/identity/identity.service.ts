import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { User } from 'src/types/entities';
import { Observable } from 'rxjs';

@Injectable()
export class IdentityService {
  private logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('IdentityService');
  }

  createDID(user: User): Observable<AxiosResponse> {
    try {
      return this.httpService.post(
        `${process.env.IDENTITY_SERVICE_URL}/did/generate`,
        {
          content: [
            {
              alsoKnownAs: [user.name, user.email],
              method: 'samagra',
              services: [
                {
                  id: 'samagra',
                },
              ],
            },
          ],
        },
      );
    } catch (err) {
      this.logger.error('Error while getting DID', err);
      throw new InternalServerErrorException('Error while getting DID');
    }
  }
}
