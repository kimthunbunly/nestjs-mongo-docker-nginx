import { Routes } from '@nestjs/core';
import { UserModule } from './module/user/user.module';

const AppRoutes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/v1',
        children: [
          {
            path: '/user',
            module: UserModule,
          },
        ],
      },
    ],
  },
];

export default AppRoutes;
