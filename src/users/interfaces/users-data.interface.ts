export interface ICityPopulationCount {
  city: string;
  count: number;
}

export interface ICityMembersCount {
  city: string;
  members: ICityMember[];
}

export interface ICityMember {
  first_name: string;
  count: number;
}

export interface IUsersData {
  cities_population: ICityPopulationCount[];
  city_members: ICityMembersCount[];
}
