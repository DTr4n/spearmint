import React from 'react';
import { CreditCard, Building, Wallet } from 'lucide-react';

const accounts = [
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
    name: 'Savings',
    type: 'savings',
    balance: 25000.75,
    institution: 'Chase Bank',
    lastUpdated: '2024-03-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1250.25,
    institution: 'American Express',
    lastUpdated: '2024-03-15T10:30:00Z'
  }
];

export default function Accounts() {
  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return Wallet;
      case 'savings':
        return Building;
      case 'credit':
        return CreditCard;
      default:
        return Wallet;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Accounts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = getAccountIcon(account.type);
          const isNegative = account.balance < 0;

          return (
            <div key={account.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.institution}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className={`text-2xl font-bold ${
                  isNegative ? 'text-red-600' : 'text-emerald-600'
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

      <div className="mt-8 p-6 bg-emerald-50 rounded-xl">
        <h2 className="text-lg font-semibold text-emerald-900 mb-2">
          Connect a New Account
        </h2>
        <p className="text-emerald-700 mb-4">
          Securely connect your bank accounts using Plaid to track your finances in one place.
        </p>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Connect Account
        </button>
      </div>
    </div>
  );
}