import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { productResolvers } from './modules/products/product.resolvers.js';
import { warehouseResolvers } from './modules/warehouses/warehouse.resolvers.js';
import { kpiResolvers } from './modules/kpis/kpi.resolvers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read schema
const typeDefs = readFileSync(
  join(__dirname, 'schema/schema.graphql'),
  'utf-8'
);

// Merge all resolvers
const resolvers = {
    Query: {
      ...productResolvers.Query,
      ...warehouseResolvers.Query,
      ...kpiResolvers.Query,
    },
    Mutation: {
      ...productResolvers.Mutation,
    },
  };
  
  // Create server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Start server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀 Server ready at ${url}`);