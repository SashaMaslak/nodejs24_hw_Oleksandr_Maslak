import { Inject, Injectable } from '@nestjs/common';
import { ResidentRepository } from './resident.repository';
import {
  ICityPopulationCount,
  IResidentsData,
} from './interfaces/residents-data.interface';
import { IAbstractDatabaseService } from 'src/database-abstraction/types/database-abstract-service.interface';
import { PostgresEntityMapEnum } from 'src/database-abstraction/types/enums/postgres-entity-map.enum';

@Injectable()
export class ResidentService {
  constructor(
    private readonly residentRepository: ResidentRepository, // variant for static db service
    @Inject('DATABASE_CONNECTION') private dbService: IAbstractDatabaseService, // our dynamoc abstract variant
  ) {}

  async findOne(city: string, skip: number): Promise<IResidentsData> {
    return await this.dbService.findOne(PostgresEntityMapEnum.USER, {
      city,
      skip,
    });
  }

  async getResidentsData(
    city: string,
    skip: number,
    take: number,
  ): Promise<IResidentsData> {
    const cityMembersMapped = [];

    const cityPopulationCount: ICityPopulationCount[] =
      await this.residentRepository.getCitiesPopulation(city, skip, take);

    for (const mappedCity of cityPopulationCount) {
      const members = await this.residentRepository.countMembersWithSameName(
        mappedCity.city,
      );

      cityMembersMapped.push({
        city: mappedCity,
        members,
      });
    }

    return {
      cities_population: cityPopulationCount,
      city_members: cityMembersMapped,
    };
  }
}
