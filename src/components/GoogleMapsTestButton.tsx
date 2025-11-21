import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getGoogleMapsApiKey, loadGoogleMapsScript } from '../utils/googleMapsConfig';
import { toast } from 'sonner@2.0.3';

interface GoogleMapsTestButtonProps {
  language?: 'bn' | 'en';
}

export function GoogleMapsTestButton({ language = 'bn' }: GoogleMapsTestButtonProps) {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    apiKeyExists: boolean;
    apiKey: string;
    scriptLoaded: boolean;
    error?: string;
  } | null>(null);

  const testGoogleMaps = async () => {
    setTesting(true);
    setResult(null);

    try {
      // Test 1: Check API key
      const apiKey = getGoogleMapsApiKey();
      const apiKeyExists = !!apiKey && apiKey.length > 0;

      if (!apiKeyExists) {
        setResult({
          apiKeyExists: false,
          apiKey: 'Not found',
          scriptLoaded: false,
          error: 'Google Maps API key not configured'
        });
        toast.error(
          language === 'bn'
            ? 'Google Maps API key পাওয়া যায়নি'
            : 'Google Maps API key not found'
        );
        setTesting(false);
        return;
      }

      // Test 2: Load script
      try {
        await loadGoogleMapsScript();
        
        // Test 3: Verify google object exists
        const scriptLoaded = !!(window.google && window.google.maps);

        setResult({
          apiKeyExists: true,
          apiKey: apiKey.substring(0, 20) + '...',
          scriptLoaded: scriptLoaded,
        });

        if (scriptLoaded) {
          toast.success(
            language === 'bn'
              ? '✅ Google Maps সফলভাবে লোড হয়েছে!'
              : '✅ Google Maps loaded successfully!',
            { duration: 3000 }
          );
        } else {
          toast.error(
            language === 'bn'
              ? 'Google Maps লোড হয়নি'
              : 'Google Maps failed to load'
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setResult({
          apiKeyExists: true,
          apiKey: apiKey.substring(0, 20) + '...',
          scriptLoaded: false,
          error: errorMessage
        });
        toast.error(
          language === 'bn'
            ? `Google Maps লোড করতে সমস্যা: ${errorMessage}`
            : `Failed to load Google Maps: ${errorMessage}`,
          { duration: 5000 }
        );
      }
    } catch (error) {
      console.error('Test error:', error);
      toast.error(
        language === 'bn'
          ? 'টেস্ট করতে সমস্যা হয়েছে'
          : 'Test failed'
      );
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {language === 'bn' ? 'Google Maps কনফিগারেশন টেস্ট' : 'Google Maps Configuration Test'}
          </h3>
          <Button
            onClick={testGoogleMaps}
            disabled={testing}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {testing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {language === 'bn' ? 'টেস্ট চলছে...' : 'Testing...'}
              </>
            ) : (
              language === 'bn' ? 'টেস্ট করুন' : 'Run Test'
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-2 pt-3 border-t">
            <div className="flex items-center gap-2">
              {result.apiKeyExists ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="text-sm text-gray-700">
                API Key: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{result.apiKey}</code>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {result.scriptLoaded ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="text-sm text-gray-700">
                {language === 'bn' ? 'স্ক্রিপ্ট লোড স্ট্যাটাস' : 'Script Load Status'}: 
                <Badge className={`ml-2 ${result.scriptLoaded ? 'bg-green-600' : 'bg-red-600'}`}>
                  {result.scriptLoaded 
                    ? (language === 'bn' ? 'লোডেড' : 'Loaded')
                    : (language === 'bn' ? 'ব্যর্থ' : 'Failed')
                  }
                </Badge>
              </span>
            </div>

            {result.error && (
              <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className={`font-medium mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'এরর' : 'Error'}:
                  </p>
                  <p className="text-xs">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!result && !testing && (
          <div className="text-sm text-gray-600 text-center py-2">
            {language === 'bn' 
              ? '"টেস্ট করুন" বাটনে ক্লিক করে Google Maps কনফিগারেশন যাচাই করুন'
              : 'Click "Run Test" to verify Google Maps configuration'
            }
          </div>
        )}
      </div>
    </Card>
  );
}
