import { afterAll, afterEach, beforeAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../src/schema';
import { resolvers } from '../src/resolvers';

export const testServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Add any global test setup/teardown here
beforeAll(async () => {
  // Setup test database or any other global setup
});

afterEach(() => {
  // Clean up test data after each test
});

afterAll(async () => {
  // Clean up any test resources
  await testServer.stop();
});

export const executeOperation = async (query: string, variables?: any) => {
  const response = await testServer.executeOperation({
    query,
    variables,
  });
  
  if (response.body.kind === 'single' && response.body.singleResult.errors) {
    throw new Error(response.body.singleResult.errors[0].message);
  }
  
  return response;
};
