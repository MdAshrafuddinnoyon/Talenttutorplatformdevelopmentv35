import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import { CheckCircle2, XCircle, Loader2, Database, LogIn, Users } from 'lucide-react';
import { API_BASE_URL, getApiHeaders } from '../utils/apiConfig';

export function LoginDebugger() {
  const [email, setEmail] = useState('admin@talenttutor.com');
  const [password, setPassword] = useState('Admin@2025');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [healthCheck, setHealthCheck] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  const testLogin = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      console.log('🧪 Testing login with:', { email, password });
      console.log('🌐 API Base URL:', API_BASE_URL);
      
      const url = `${API_BASE_URL}/auth/login`;
      console.log('📡 Full URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          emailOrPhone: email,
          password: password
        })
      });

      console.log('📨 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Response data:', data);

      setResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: data
      });

      if (response.ok) {
        toast.success('✅ Login successful!');
      } else {
        toast.error('❌ Login failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      });
      toast.error('❌ Network error: ' + (error instanceof Error ? error.message : 'Unknown'));
    } finally {
      setIsLoading(false);
    }
  };

  const checkHealth = async () => {
    setIsCheckingHealth(true);
    setHealthCheck(null);
    
    try {
      const url = `${API_BASE_URL}/health`;
      console.log('🏥 Checking health at:', url);
      
      const response = await fetch(url, {
        headers: getApiHeaders()
      });

      const data = await response.json();
      console.log('🏥 Health check response:', data);

      setHealthCheck({
        success: response.ok,
        status: response.status,
        data: data
      });

      if (response.ok) {
        toast.success('✅ Server is healthy!');
      } else {
        toast.error('❌ Server health check failed');
      }
    } catch (error) {
      console.error('❌ Health check error:', error);
      setHealthCheck({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      toast.error('❌ Cannot connect to server: ' + (error instanceof Error ? error.message : 'Unknown'));
    } finally {
      setIsCheckingHealth(false);
    }
  };

  const loadAllUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: getApiHeaders()
      });

      const data = await response.json();
      console.log('👥 Users data:', data);

      if (data.success && data.users) {
        setAllUsers(data.users);
        toast.success(`✅ Loaded ${data.users.length} users`);
      } else {
        toast.error('❌ Failed to load users');
      }
    } catch (error) {
      console.error('❌ Load users error:', error);
      toast.error('❌ Failed to load users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const quickFillCredentials = (role: string) => {
    const credentials: Record<string, { email: string; password: string }> = {
      admin: { email: 'admin@talenttutor.com', password: 'Admin@2025' },
      teacher: { email: 'teacher1@talenttutor.com', password: 'Teacher@2025' },
      guardian: { email: 'guardian1@talenttutor.com', password: 'Guardian@2025' },
      student: { email: 'student1@talenttutor.com', password: 'Student@2025' },
      zakatDonor: { email: 'zakatdonor1@talenttutor.com', password: 'Donor@2025' },
      materialDonor: { email: 'materialdonor1@talenttutor.com', password: 'Donor@2025' }
    };

    const cred = credentials[role];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Login Debugger</h2>
            <p className="text-sm text-gray-600">Test login functionality and check database</p>
          </div>
        </div>

        {/* API Info */}
        <Alert className="mb-4 bg-white">
          <AlertDescription>
            <div className="space-y-1 text-sm">
              <div><strong>API Base:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{API_BASE_URL}</code></div>
              <div><strong>Login Endpoint:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{API_BASE_URL}/auth/login</code></div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Quick Fill Buttons */}
        <div className="mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Quick Fill Credentials:</Label>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('admin')}>
              Admin
            </Button>
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('teacher')}>
              Teacher
            </Button>
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('guardian')}>
              Guardian
            </Button>
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('student')}>
              Student
            </Button>
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('zakatDonor')}>
              Zakat Donor
            </Button>
            <Button size="sm" variant="outline" onClick={() => quickFillCredentials('materialDonor')}>
              Material Donor
            </Button>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4 mb-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@talenttutor.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin@2025"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            onClick={checkHealth}
            disabled={isCheckingHealth}
            variant="outline"
            className="border-green-600 text-green-600"
          >
            {isCheckingHealth ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Check Server Health
              </>
            )}
          </Button>

          <Button
            onClick={testLogin}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Test Login
              </>
            )}
          </Button>

          <Button
            onClick={loadAllUsers}
            disabled={isLoadingUsers}
            variant="outline"
            className="border-blue-600 text-blue-600"
          >
            {isLoadingUsers ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Users className="w-4 h-4 mr-2" />
                Load All Users
              </>
            )}
          </Button>
        </div>

        {/* Health Check Result */}
        {healthCheck && (
          <Alert className={healthCheck.success ? 'bg-green-50 border-green-200 mb-4' : 'bg-red-50 border-red-200 mb-4'}>
            <div className="flex items-start gap-3">
              {healthCheck.success ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <AlertDescription className="flex-1">
                <div className="space-y-2">
                  <div className="font-semibold">
                    {healthCheck.success ? '✅ Server Healthy' : '❌ Server Unreachable'}
                  </div>
                  {healthCheck.data && (
                    <div className="text-sm">
                      <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto">
                        {JSON.stringify(healthCheck.data, null, 2)}
                      </pre>
                    </div>
                  )}
                  {healthCheck.error && (
                    <div className="text-sm text-red-600">
                      <strong>Error:</strong> {healthCheck.error}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </div>
          </Alert>
        )}

        {/* Result */}
        {result && (
          <Alert className={result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <AlertDescription className="flex-1">
                <div className="space-y-2">
                  <div className="font-semibold">
                    {result.success ? '✅ Success' : '❌ Failed'}
                  </div>
                  <div className="text-sm space-y-1">
                    {result.status && (
                      <div><strong>Status:</strong> {result.status} {result.statusText}</div>
                    )}
                    {result.data && (
                      <div>
                        <strong>Response:</strong>
                        <pre className="mt-1 p-2 bg-white rounded text-xs overflow-auto max-h-40">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </div>
                    )}
                    {result.error && (
                      <div className="text-red-600"><strong>Error:</strong> {result.error}</div>
                    )}
                  </div>
                </div>
              </AlertDescription>
            </div>
          </Alert>
        )}

        {/* All Users */}
        {allUsers.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">All Users ({allUsers.length})</h3>
            <div className="bg-white rounded-lg border border-gray-200 max-h-80 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Role</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{user.name}</td>
                      <td className="px-3 py-2">{user.email}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'teacher' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'guardian' ? 'bg-green-100 text-green-700' :
                          user.role === 'student' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-pink-100 text-pink-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-3 py-2">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
