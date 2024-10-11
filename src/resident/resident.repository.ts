import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  ICityMembersCount,
  ICityPopulationCount,
} from './interfaces/residents-data.interface';

@Injectable()
export class ResidentRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCitiesPopulation(
    city: string,
    skip: number,
    take: number,
  ): Promise<ICityPopulationCount[]> {
    const citiesLikeQuery = `
      SELECT name as city, COUNT(r.id) as count
      FROM cities c
      LEFT JOIN residents r
      ON r.city_id = c.id
      WHERE name LIKE $1 
      GROUP BY name
      ORDER BY name DESC
      OFFSET $2
      LIMIT $3;
    `;

    const citiesLikeQueryValues = [`${city}%`, skip, take];

    const cities = await this.databaseService.executeQuery(
      citiesLikeQuery,
      citiesLikeQueryValues,
    );

    return cities as ICityPopulationCount[];
  }

  async countMembersWithSameName(city: string): Promise<ICityMembersCount[]> {
    const countMembersQuery = `
      SELECT r.first_name, COUNT(r.first_name)
      FROM residents r 
      LEFT JOIN cities c
      ON r.city_id = c.id
      where c.name = $1
      GROUP BY r.first_name, c.name
      ORDER BY c.name DESC;
    `;

    const countMembersQueryValues = [city];

    const cityMembersCount = await this.databaseService.executeQuery(
      countMembersQuery,
      countMembersQueryValues,
    );

    return cityMembersCount as ICityMembersCount[];
  }
}
