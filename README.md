### Express TypeORM setup Scripts

##### To make migrations file

```
yarn run typeorm migration:create  ./migration/EntityFileName
```

##### For example if Entity file name is User.ts then script will be

```
yarn run typeorm migration:create  ./migration/User
```

##### To run all migrations

```
yarn run typeorm migration:run  -d  ./config/data-source.ts
```

##### To generate migration

```
yarn run typeorm  -d ./config/data-source.ts migration:generate ./migrations/Shopkeeper
```
