"use client";

import { Progress } from "@heroui/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import { api } from "~/utils/api";

const BudgetProgress = () => {
  const params = useParams<{ bookId: string }>();
  const { data } = api.budget.getCurrentBudget.useQuery(params?.bookId);

  const categories = data?.progress || [];

  return (
    <div className="space-y-6">
      {categories.map(({ category, allocated, spent }, index) => {
        const percentage = Math.round((spent / allocated) * 100);
        const remaining = allocated - spent;

        return (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon={category?.icon || "mynaui:book-check"} width={24} />
                {/* <span className="text-lg">{category.}</span> */}
                <p className="font-medium">{category?.name || "Otros"}</p>
              </div>
              <div className="text-muted-foreground text-sm">
                ${spent.toLocaleString()} / ${allocated.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                aria-label="Progreso de categoría"
                value={percentage}
                className="h-2"
                color="primary"
              />
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
