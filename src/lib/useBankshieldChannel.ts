import { useEffect, useState, useCallback } from 'react';
import { Transaction, TransactionStatus } from './types';

const CHANNEL_NAME = 'bankshield_channel';
const STORAGE_KEY = 'bankshield_transactions_store';

type BroadcastMessage =
  | { type: 'ADD_TRANSACTION'; transaction: Transaction }
  | { type: 'RESOLVE_TRANSACTION'; id: string; status: TransactionStatus }
  | { type: 'CLEAR_ALL' };

export function useBankshieldChannel() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load stored transactions', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save transactions to localStorage
  const saveTransactions = useCallback((txs: Transaction[]) => {
    setTransactions(txs);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
      } catch (e) {
        console.error('Failed to save transactions to localStorage', e);
      }
    }
  }, []);

  // Broadcast channel setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let bc: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        const msg = event.data;
        if (!msg) return;

        if (msg.type === 'ADD_TRANSACTION') {
          setTransactions(prev => {
            const exists = prev.some(t => t.id === msg.transaction.id);
            if (exists) return prev;
            const updated = [msg.transaction, ...prev];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        } else if (msg.type === 'RESOLVE_TRANSACTION') {
          setTransactions(prev => {
            const updated = prev.map(t =>
              t.id === msg.id ? { ...t, status: msg.status } : t
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        } else if (msg.type === 'CLEAR_ALL') {
          setTransactions([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      };
    }

    // Fallback: Listen for localStorage storage events across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setTransactions(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to parse storage event data', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions(prev => {
      const updated = [tx, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel(CHANNEL_NAME);
          bc.postMessage({ type: 'ADD_TRANSACTION', transaction: tx });
          bc.close();
        }
      }
      return updated;
    });
  }, []);

  const resolveTransaction = useCallback((id: string, status: TransactionStatus) => {
    setTransactions(prev => {
      const updated = prev.map(t => (t.id === id ? { ...t, status } : t));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel(CHANNEL_NAME);
          bc.postMessage({ type: 'RESOLVE_TRANSACTION', id, status });
          bc.close();
        }
      }
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setTransactions([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel(CHANNEL_NAME);
        bc.postMessage({ type: 'CLEAR_ALL' });
        bc.close();
      }
    }
  }, []);

  return {
    transactions,
    isLoaded,
    addTransaction,
    resolveTransaction,
    clearAll,
  };
}
