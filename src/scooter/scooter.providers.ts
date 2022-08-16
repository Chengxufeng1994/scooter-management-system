import { DataSource } from 'typeorm';

import { Scooter } from './entities/scooter.entity';

export const scooterProviders = [
  {
    provide: 'SCOOTER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Scooter),
    inject: ['DATA_SOURCE'],
  },
];
