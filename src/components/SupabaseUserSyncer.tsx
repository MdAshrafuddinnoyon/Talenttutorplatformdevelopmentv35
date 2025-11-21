import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SupabaseUserSyncerProps {
  language: 'bn' | 'en';
}

export function SupabaseUserSyncer({ language }: SupabaseUserSyncerProps) {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already synced in this session
    const alreadySynced = sessionStorage.getItem('users_synced');
    if (alreadySynced === 'true') {
      setSynced(true);
      return;
    }

    // Auto-sync users on component mount
    syncUsers();
  }, []);

  const syncUsers = async () => {
    if (syncing || synced) return;

    setSyncing(true);
    setError(null);

    try {
      console.log('🔄 Starting user synchronization...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/sync-users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed');
      }

      console.log('✅ User synchronization completed:', data);
      
      // Mark as synced in session storage
      sessionStorage.setItem('users_synced', 'true');
      setSynced(true);
      
    } catch (err) {
      console.error('❌ User sync error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSyncing(false);
    }
  };

  // Silent component - no UI, just background sync
  return null;
}
