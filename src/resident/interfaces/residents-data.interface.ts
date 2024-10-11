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

export interface IResidentsData {
  cities_population: ICityPopulationCount[];
  city_members: ICityMembersCount[];
}
