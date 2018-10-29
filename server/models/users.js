import pg from 'pg';

/*** ************DB Connect string ***************/
const connect = process.env.DATABASE_URL || 'postgres://adminstore:compt@localhost:5432/storemanagerdb';