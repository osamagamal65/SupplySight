import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Mock the server dependencies
vi.mock('@apollo/server');
vi.mock('@apollo/server/standalone');
vi.mock('fs');
vi.mock('path', async () => {
  const actual = await vi.importActual('path');
  return {
    ...actual,
    join: vi.fn().mockImplementation((...args) => args.join('/')),
    dirname: vi.fn().mockReturnValue('/mock/dir')
  };
});
vi.mock('url', () => ({
  fileURLToPath: vi.fn().mockReturnValue('/mock/path/index.ts')
}));

// Mock the resolvers
vi.mock('../../../src/modules/products/product.resolvers.js', () => ({
  productResolvers: {
    Query: {
      products: vi.fn()
    },
    Mutation: {
      updateDemand: vi.fn(),
      transferStock: vi.fn()
    }
  }
}));

vi.mock('../../../src/modules/kpis/kpi.resolvers.js', () => ({
  kpiResolvers: {
    Query: {
      kpis: vi.fn()
    }
  }
}));

describe('Server Setup', () => {
  const mockReadFileSync = vi.mocked(readFileSync);
  const mockApolloServer = vi.mocked(ApolloServer);
  const mockStartStandaloneServer = vi.mocked(startStandaloneServer);

  beforeAll(async () => {
    // Setup mocks
    mockReadFileSync.mockReturnValue('type Query { test: String }');
    
    // Mock server instance
    const mockServerInstance = {
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn().mockResolvedValue(undefined)
    };
    mockApolloServer.mockImplementation(() => mockServerInstance as any);
    
    // Mock standalone server
    mockStartStandaloneServer.mockResolvedValue({
      url: 'http://localhost:4000',
    });
    
    // Import the server after setting up mocks
    await import('../../src/index.ts');
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should create an Apollo server with correct configuration', () => {
    expect(mockApolloServer).toHaveBeenCalledWith({
      typeDefs: expect.any(String),
      resolvers: expect.objectContaining({
        Query: expect.any(Object),
        Mutation: expect.any(Object)
      })
    });
  });

  it('should start the server on port 4000', () => {
    expect(mockStartStandaloneServer).toHaveBeenCalledWith(
      expect.any(Object),
      {
        listen: { port: 4000 }
      }
    );
  });

  it('should read schema file from correct path', () => {
    expect(mockReadFileSync).toHaveBeenCalledWith(
      expect.stringContaining('schema/schema.graphql'),
      'utf-8'
    );
  });

  it('should combine all resolvers correctly', () => {
    const serverConfig = mockApolloServer.mock.calls[0][0];
    expect(serverConfig.resolvers).toMatchObject({
      Query: {
        products: expect.any(Function),
        kpis: expect.any(Function)
      },
      Mutation: {
        updateDemand: expect.any(Function),
        transferStock: expect.any(Function)
      }
    });
  });
});
