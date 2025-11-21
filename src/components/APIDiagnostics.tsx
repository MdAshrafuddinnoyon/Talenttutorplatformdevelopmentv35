import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Server, 
  Database,
  AlertTriangle 
} from 'lucide-react';
import { API_BASE_URL, getApiHeaders, projectId, publicAnonKey } from '../utils/apiConfig';

interface DiagnosticResult {
  name: string;
  success: boolean;
  message: string;
  details?: any;
  error?: string;
}

export function APIDiagnostics() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);
    const diagnosticResults: DiagnosticResult[] = [];

    // Test 1: Check Environment Variables
    console.log('🔍 Test 1: Checking environment variables...');
    const envTest: DiagnosticResult = {
      name: 'Environment Variables',
      success: !!(projectId && publicAnonKey),
      message: projectId && publicAnonKey 
        ? 'Project ID and API key are configured' 
        : 'Missing environment variables',
      details: {
        projectId: projectId || 'MISSING',
        hasApiKey: !!publicAnonKey
      }
    };
    diagnosticResults.push(envTest);
    setResults([...diagnosticResults]);

    // Test 2: Check API URL Construction
    console.log('🔍 Test 2: Checking API URL construction...');
    const urlTest: DiagnosticResult = {
      name: 'API URL Construction',
      success: true,
      message: 'API URL is properly constructed',
      details: {
        baseUrl: API_BASE_URL,
        healthEndpoint: `${API_BASE_URL}/health`,
        loginEndpoint: `${API_BASE_URL}/auth/login`
      }
    };
    diagnosticResults.push(urlTest);
    setResults([...diagnosticResults]);

    // Test 3: Test Health Endpoint
    console.log('🔍 Test 3: Testing health endpoint...');
    try {
      const healthUrl = `${API_BASE_URL}/health`;
      console.log('📡 Health URL:', healthUrl);
      
      const healthResponse = await fetch(healthUrl, {
        method: 'GET',
        headers: getApiHeaders()
      });

      const healthData = await healthResponse.json();
      console.log('📦 Health response:', healthData);

      const healthTest: DiagnosticResult = {
        name: 'Health Endpoint',
        success: healthResponse.ok,
        message: healthResponse.ok 
          ? 'Server is responding to health checks' 
          : `Server returned status ${healthResponse.status}`,
        details: {
          status: healthResponse.status,
          statusText: healthResponse.statusText,
          data: healthData
        }
      };
      diagnosticResults.push(healthTest);
    } catch (error) {
      const healthTest: DiagnosticResult = {
        name: 'Health Endpoint',
        success: false,
        message: 'Failed to connect to health endpoint',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: {
          url: `${API_BASE_URL}/health`
        }
      };
      diagnosticResults.push(healthTest);
    }
    setResults([...diagnosticResults]);

    // Test 4: Test Root Endpoint
    console.log('🔍 Test 4: Testing root endpoint...');
    try {
      const rootUrl = `${API_BASE_URL}/`;
      console.log('📡 Root URL:', rootUrl);
      
      const rootResponse = await fetch(rootUrl, {
        method: 'GET',
        headers: getApiHeaders()
      });

      const rootData = await rootResponse.json();
      console.log('📦 Root response:', rootData);

      const rootTest: DiagnosticResult = {
        name: 'Root Endpoint',
        success: rootResponse.ok,
        message: rootResponse.ok 
          ? 'API root is accessible' 
          : `Root returned status ${rootResponse.status}`,
        details: {
          status: rootResponse.status,
          data: rootData
        }
      };
      diagnosticResults.push(rootTest);
    } catch (error) {
      const rootTest: DiagnosticResult = {
        name: 'Root Endpoint',
        success: false,
        message: 'Failed to connect to root endpoint',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      diagnosticResults.push(rootTest);
    }
    setResults([...diagnosticResults]);

    // Test 5: Test CORS
    console.log('🔍 Test 5: Testing CORS configuration...');
    try {
      const corsUrl = `${API_BASE_URL}/health`;
      const corsResponse = await fetch(corsUrl, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type,Authorization'
        }
      });

      const corsTest: DiagnosticResult = {
        name: 'CORS Configuration',
        success: corsResponse.ok || corsResponse.status === 204,
        message: (corsResponse.ok || corsResponse.status === 204)
          ? 'CORS is properly configured' 
          : 'CORS might not be configured correctly',
        details: {
          status: corsResponse.status,
          headers: {
            'Access-Control-Allow-Origin': corsResponse.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': corsResponse.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': corsResponse.headers.get('Access-Control-Allow-Headers')
          }
        }
      };
      diagnosticResults.push(corsTest);
    } catch (error) {
      const corsTest: DiagnosticResult = {
        name: 'CORS Configuration',
        success: false,
        message: 'Failed to test CORS',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      diagnosticResults.push(corsTest);
    }
    setResults([...diagnosticResults]);

    setIsRunning(false);

    // Show summary toast
    const passedTests = diagnosticResults.filter(r => r.success).length;
    const totalTests = diagnosticResults.length;
    
    if (passedTests === totalTests) {
      toast.success(`✅ All ${totalTests} diagnostic tests passed!`);
    } else {
      toast.error(`❌ ${totalTests - passedTests} of ${totalTests} tests failed`);
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle2 className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Server className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">API Diagnostics</h2>
          <p className="text-sm text-gray-600">Run comprehensive API connectivity tests</p>
        </div>
      </div>

      {/* Configuration Info */}
      <Alert className="mb-4 bg-white">
        <AlertDescription>
          <div className="space-y-1 text-sm">
            <div><strong>Project ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{projectId}</code></div>
            <div><strong>API Base URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded break-all">{API_BASE_URL}</code></div>
            <div><strong>Auth Key:</strong> <code className="bg-gray-100 px-2 py-1 rounded">
              {publicAnonKey ? `${publicAnonKey.substring(0, 20)}...` : 'MISSING'}
            </code></div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Run Button */}
      <Button
        onClick={runDiagnostics}
        disabled={isRunning}
        className="w-full mb-4 bg-purple-600 hover:bg-purple-700"
      >
        {isRunning ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Running Diagnostics...
          </>
        ) : (
          <>
            <Database className="w-4 h-4 mr-2" />
            Run Diagnostics
          </>
        )}
      </Button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Test Results ({results.filter(r => r.success).length}/{results.length} passed)
          </h3>
          
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {getStatusIcon(result.success)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{result.name}</span>
                    <Badge variant={result.success ? 'default' : 'destructive'}>
                      {result.success ? 'Pass' : 'Fail'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{result.message}</p>
                  
                  {result.error && (
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Error:</strong> {result.error}
                    </div>
                  )}
                  
                  {result.details && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                        Show Details
                      </summary>
                      <pre className="mt-2 p-2 bg-white rounded overflow-auto max-h-40">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
