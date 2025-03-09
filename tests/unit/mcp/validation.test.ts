import { validateMCPRequest } from '../../../src/mcp/validation';
import { MCPRequest } from '../../../src/types';
import { AppError } from '../../../src/utils/errors';

describe('MCP Request Validation', () => {
  it('should validate a valid MCP request', () => {
    const validRequest: MCPRequest = {
      id: '123',
      method: 'n8n_list_workflows',
      params: { filter: 'test' }
    };
    
    expect(() => validateMCPRequest(validRequest)).not.toThrow();
  });
  
  it('should throw an error for a non-object request', () => {
    expect(() => validateMCPRequest(null as unknown as MCPRequest)).toThrow();
  });
  
  it('should throw an error for a request without an ID', () => {
    const invalidRequest = {
      method: 'n8n_list_workflows',
      params: {}
    } as MCPRequest;
    
    expect(() => validateMCPRequest(invalidRequest)).toThrow();
  });
  
  it('should throw an error for a request without a method', () => {
    const invalidRequest = {
      id: '123',
      params: {}
    } as MCPRequest;
    
    expect(() => validateMCPRequest(invalidRequest)).toThrow();
  });
  
  it('should throw an error for a request with non-string ID', () => {
    const invalidRequest = {
      id: 123,
      method: 'n8n_list_workflows',
      params: {}
    } as unknown as MCPRequest;
    
    expect(() => validateMCPRequest(invalidRequest)).toThrow();
  });
  
  it('should throw an error for a request with non-string method', () => {
    const invalidRequest = {
      id: '123',
      method: 123,
      params: {}
    } as unknown as MCPRequest;
    
    expect(() => validateMCPRequest(invalidRequest)).toThrow();
  });
  
  it('should throw an error for a request with non-object params', () => {
    const invalidRequest = {
      id: '123',
      method: 'n8n_list_workflows',
      params: 'invalid'
    } as unknown as MCPRequest;
    
    expect(() => validateMCPRequest(invalidRequest)).toThrow();
  });
}); 