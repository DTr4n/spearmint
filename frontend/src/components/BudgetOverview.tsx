import React from 'react';
import type { Budget } from '../types';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export default function BudgetOverview({ budgets }: BudgetOverviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Budget Overview</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;

          return (
            <div key={budget.category} className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">{budget.category}</h3>
                <span className="text-sm text-gray-500">
                  ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <p className={`text-sm mt-1 ${
                isOverBudget ? 'text-red-500' : 'text-gray-500'
              }`}>
                {percentage.toFixed(1)}% {isOverBudget ? 'Over budget!' : 'used'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}