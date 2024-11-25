import React, { useState } from 'react';
import { CreditCard, Building, Wallet, MoreVertical, Trash2 } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution: string;
  lastUpdated: string;
}

const accounts: Account[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 5420.50,
    institution: 'Chase Bank',
    lastUpdated: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'High Yield Savings',
    type: 'savings',
    balance: 25000.75,
    institution: 'Ally Bank',
    lastUpdated: '2024-03-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1250.25,
    institution: 'American Express',
    lastUpdated: '2024-03-15T10:30:00Z'
  },
  {
    id: '4',
    name: 'Investment Account',
    type: 'investment',
    balance: 150000.00,
    institution: 'Vanguard',
    lastUpdated: '2024-03-15T10:30:00Z'
  }
];

export default function Accounts() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return Wallet;
      case 'savings':
        return Building;
      case 'credit':
      case 'investment':
        return CreditCard;
      default:
        return Wallet;
    }
  };

  const groupedAccounts = accounts.reduce((acc, account) => {
    const group = acc[account.type] || [];
    acc[account.type] = [...group, account];
    return acc;
  }, {} as Record<string, Account[]>);

  const handleRemoveAccount = (accountId: string) => {
    // Handle account removal logic here
    setSelectedAccount(null);
  };

  const renderAccountGroup = (title: string, accounts: Account[]) => (
    <div key={title} className="space-y-4">
      <h2 className="text-lg font-semibold text-mint-300 capitalize">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          const isNegative = account.balance < 0;
          
          return (
            <div key={account.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-mint-50 rounded-lg">
                    <Icon className="h-6 w-6 text-mint-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.institution}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
                    className="p-1 hover:bg-mint-50 rounded-lg"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </button>
                  
                  {selectedAccount === account.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                      <button
                        onClick={() => handleRemoveAccount(account.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-mint-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className={`text-2xl font-bold ${
                  isNegative ? 'text-expense-300' : 'text-mint-300'
                }`}>
                  ${Math.abs(account.balance).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(account.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedAccounts).map(([type, accounts]) => 
        renderAccountGroup(type, accounts)
      )}
    </div>
  );
}