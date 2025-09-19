import { Card } from "./ui/card";

interface BudgetOverviewProps {
  totalBudget: number;
  allocated: number;
  spent: number;
  remaining: number;
}

export function BudgetOverview({ totalBudget, allocated, spent, remaining }: BudgetOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const getPercentage = (amount: number) => {
    return ((amount / totalBudget) * 100).toFixed(1);
  };

  return (
    <div className="px-4 lg:px-8 pt-6 pb-4 lg:py-8">
      <div className="lg:max-w-6xl lg:mx-auto">
        <div className="mb-4 lg:mb-6 lg:flex lg:items-end lg:justify-between">
          <div>
            <h1 className="text-white/80 text-sm lg:text-base uppercase tracking-wide mb-1">
              National Budget 2025
            </h1>
            <div className="text-white text-3xl lg:text-4xl font-medium">
              {formatCurrency(totalBudget)}
            </div>
          </div>
          <div className="hidden lg:block text-white/60">
            <div className="text-sm">Last updated: November 19, 2024</div>
          </div>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          <Card className="p-3 lg:p-4 bg-white/95 border-0 lg:col-span-2">
            <div className="text-center">
              <div className="text-xs lg:text-sm text-muted-foreground mb-1">Allocated</div>
              <div className="text-sm lg:text-base font-medium text-[#1A3E73]">
                {formatCurrency(allocated)}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">
                {getPercentage(allocated)}%
              </div>
            </div>
          </Card>

          <Card className="p-3 lg:p-4 bg-white/95 border-0 lg:col-span-2">
            <div className="text-center">
              <div className="text-xs lg:text-sm text-muted-foreground mb-1">Spent</div>
              <div className="text-sm lg:text-base font-medium text-[#BF4226]">
                {formatCurrency(spent)}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">
                {getPercentage(spent)}%
              </div>
            </div>
          </Card>

          <Card className="p-3 lg:p-4 bg-white/95 border-0 lg:col-span-2">
            <div className="text-center">
              <div className="text-xs lg:text-sm text-muted-foreground mb-1">Remaining</div>
              <div className="text-sm lg:text-base font-medium text-[#F2C063]">
                {formatCurrency(remaining)}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">
                {getPercentage(remaining)}%
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}