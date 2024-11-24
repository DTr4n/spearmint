import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income'
                  ? <ArrowUpRight size={20} />
                  : <ArrowDownRight size={20} />
                }
              </div>
              <div>
                <p className="font-medium text-gray-800">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}