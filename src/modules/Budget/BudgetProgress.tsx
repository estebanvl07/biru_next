"use client";

import { Progress } from "@heroui/progress";

const categories = [
  {
    id: "housing",
    name: "Vivienda",
    allocated: 800000,
    spent: 800000,
    icon: "🏠",
    color: "bg-blue-500",
  },
  {
    id: "food",
    name: "Alimentación",
    allocated: 600000,
    spent: 350000,
    icon: "🍲",
    color: "bg-green-500",
  },
  {
    id: "transport",
    name: "Transporte",
    allocated: 200000,
    spent: 120000,
    icon: "🚗",
    color: "bg-amber-500",
  },
  {
    id: "utilities",
    name: "Servicios",
    allocated: 300000,
    spent: 280000,
    icon: "💡",
    color: "bg-purple-500",
  },
  {
    id: "entertainment",
    name: "Entretenimiento",
    allocated: 250000,
    spent: 180000,
    icon: "🎬",
    color: "bg-pink-500",
  },
  {
    id: "health",
    name: "Salud",
    allocated: 150000,
    spent: 0,
    icon: "⚕️",
    color: "bg-red-500",
  },
  {
    id: "other",
    name: "Otros",
    allocated: 200000,
    spent: 89000,
    icon: "📦",
    color: "bg-gray-500",
  },
];

const BudgetProgress = () => {
  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const percentage = Math.round(
          (category.spent / category.allocated) * 100,
        );
        const remaining = category.allocated - category.spent;

        return (
          <div key={category.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="text-muted-foreground text-sm">
                ${category.spent.toLocaleString()} / $
                {category.allocated.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={percentage} className="h-2" color="primary" />
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <div className="text-muted-foreground text-xs">
              {remaining > 0 ? (
                <span>Restante: ${remaining.toLocaleString()}</span>
              ) : (
                <span className="text-red-500">
                  Excedido por: ${Math.abs(remaining).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetProgress;
