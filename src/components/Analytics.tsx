import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Calendar
} from "lucide-react";

// Mock data for analytics
const sectorBudgetData = [
  { name: "Transportation", budget: 1250000000000, percentage: 23.1, color: "#1A3E73" },
  { name: "Infrastructure", budget: 980000000000, percentage: 18.1, color: "#F2C063" },
  { name: "Healthcare", budget: 720000000000, percentage: 13.3, color: "#BF4226" },
  { name: "Education", budget: 650000000000, percentage: 12.0, color: "#2A4E83" },
  { name: "Utilities", budget: 580000000000, percentage: 10.7, color: "#D4A373" }
];

const delayedProjectsData = [
  { 
    name: "National Broadband Program", 
    delay: 8, 
    budget: 45000000000,
    originalEnd: "Jun 2024",
    newEnd: "Feb 2025"
  },
  { 
    name: "Palawan Airport Upgrade", 
    delay: 6, 
    budget: 5600000000,
    originalEnd: "May 2024",
    newEnd: "Nov 2024"
  },
  { 
    name: "Mindanao Grid Expansion", 
    delay: 4, 
    budget: 12500000000,
    originalEnd: "Sep 2024",
    newEnd: "Jan 2025"
  },
  { 
    name: "Metro Cebu BRT Phase 2", 
    delay: 3, 
    budget: 8900000000,
    originalEnd: "Dec 2024",
    newEnd: "Mar 2025"
  },
  { 
    name: "Ilocos Solar Farm", 
    delay: 2, 
    budget: 6800000000,
    originalEnd: "Oct 2024",
    newEnd: "Dec 2024"
  }
];

const spendingTrendsData = [
  { month: "Jan", allocated: 420, spent: 380, efficiency: 90.5 },
  { month: "Feb", allocated: 440, spent: 385, efficiency: 87.5 },
  { month: "Mar", allocated: 460, spent: 425, efficiency: 92.4 },
  { month: "Apr", allocated: 480, spent: 445, efficiency: 92.7 },
  { month: "May", allocated: 500, spent: 465, efficiency: 93.0 },
  { month: "Jun", allocated: 520, spent: 480, efficiency: 92.3 },
  { month: "Jul", allocated: 540, spent: 495, efficiency: 91.7 },
  { month: "Aug", allocated: 560, spent: 515, efficiency: 92.0 },
  { month: "Sep", allocated: 580, spent: 535, efficiency: 92.2 },
  { month: "Oct", allocated: 600, spent: 555, efficiency: 92.5 },
  { month: "Nov", allocated: 620, spent: 575, efficiency: 92.7 }
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000000) {
    return `₱${(value / 1000000000000).toFixed(1)}T`;
  } else if (value >= 1000000000) {
    return `₱${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `₱${(value / 1000000).toFixed(1)}M`;
  }
  return `₱${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-[#1A3E73]">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.dataKey === 'allocated' || entry.dataKey === 'spent' ? '₱' + entry.value + 'B' : entry.value + '%'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const totalDelayMonths = delayedProjectsData.reduce((sum, project) => sum + project.delay, 0);
  const avgDelay = (totalDelayMonths / delayedProjectsData.length).toFixed(1);
  
  const currentSpending = spendingTrendsData[spendingTrendsData.length - 1];
  const previousSpending = spendingTrendsData[spendingTrendsData.length - 2];
  const spendingChange = ((currentSpending.spent - previousSpending.spent) / previousSpending.spent * 100).toFixed(1);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A3E73] to-[#2A4E83] text-white p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium mb-2">Analytics & Trends</h1>
        <p className="text-sm lg:text-base xl:text-lg opacity-90">Government spending insights and project performance</p>
      </div>

      {/* Key Metrics */}
      <div className="p-4 lg:p-6 xl:p-8 space-y-4 lg:space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Card className="p-3 lg:p-4 xl:p-5">
            <div className="flex items-center gap-2 mb-1 lg:mb-2">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-green-600" />
              <span className="text-xs lg:text-sm xl:text-base text-muted-foreground">Monthly Spending</span>
            </div>
            <div className="text-lg lg:text-xl xl:text-2xl font-medium text-[#1A3E73]">₱575B</div>
            <div className="flex items-center gap-1 text-xs lg:text-sm xl:text-base">
              <span className="text-green-600">+{spendingChange}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </Card>

          <Card className="p-3 lg:p-4 xl:p-5">
            <div className="flex items-center gap-2 mb-1 lg:mb-2">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-orange-600" />
              <span className="text-xs lg:text-sm xl:text-base text-muted-foreground">Avg Delay</span>
            </div>
            <div className="text-lg lg:text-xl xl:text-2xl font-medium text-[#1A3E73]">{avgDelay} mo</div>
            <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">5 delayed projects</div>
          </Card>
        </div>

        {/* Top 5 Sectors by Budget */}
        <Card className="p-4 lg:p-5 xl:p-6">
          <h3 className="font-medium text-[#1A3E73] mb-3 lg:mb-4 text-base lg:text-lg xl:text-xl">Top 5 Sectors by Budget</h3>
          <div className="h-48 lg:h-64 xl:h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorBudgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="budget"
                >
                  {sectorBudgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), 'Budget']}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 lg:space-y-3">
            {sectorBudgetData.map((sector, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div 
                    className="w-3 h-3 lg:w-4 lg:h-4 rounded-full" 
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="text-sm lg:text-base xl:text-lg">{sector.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm lg:text-base xl:text-lg font-medium">{formatCurrency(sector.budget)}</div>
                  <div className="text-xs lg:text-sm xl:text-base text-muted-foreground">{sector.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top 5 Delayed Projects */}
        <Card className="p-4 lg:p-5 xl:p-6">
          <h3 className="font-medium text-[#1A3E73] mb-3 lg:mb-4 text-base lg:text-lg xl:text-xl">Top 5 Delayed Projects</h3>
          <div className="space-y-3 lg:space-y-4">
            {delayedProjectsData.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 lg:p-4">
                <div className="flex justify-between items-start mb-2 lg:mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm lg:text-base xl:text-lg text-[#1A3E73] mb-1">{project.name}</h4>
                    <div className="text-xs lg:text-sm xl:text-base text-muted-foreground mb-1">
                      Budget: {formatCurrency(project.budget)}
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-xs lg:text-sm">
                    <AlertTriangle className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                    {project.delay} mo
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:gap-3 text-xs lg:text-sm xl:text-base">
                  <div>
                    <span className="text-muted-foreground">Original: </span>
                    <span>{project.originalEnd}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">New: </span>
                    <span className="text-[#BF4226]">{project.newEnd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Spending Trends Over Time */}
        <Card className="p-4 lg:p-5 xl:p-6">
          <h3 className="font-medium text-[#1A3E73] mb-3 lg:mb-4 text-base lg:text-lg xl:text-xl">Monthly Spending Trends</h3>
          <div className="h-48 lg:h-64 xl:h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `₱${value}B`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="allocated" 
                  stroke="#1A3E73" 
                  strokeWidth={2}
                  dot={{ fill: '#1A3E73', strokeWidth: 2, r: 4 }}
                  name="Allocated"
                />
                <Line 
                  type="monotone" 
                  dataKey="spent" 
                  stroke="#F2C063" 
                  strokeWidth={2}
                  dot={{ fill: '#F2C063', strokeWidth: 2, r: 4 }}
                  name="Spent"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-[#1A3E73] rounded-full" />
              <span className="text-sm lg:text-base xl:text-lg">Allocated</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 lg:w-4 lg:h-4 bg-[#F2C063] rounded-full" />
              <span className="text-sm lg:text-base xl:text-lg">Spent</span>
            </div>
          </div>
        </Card>

        {/* Efficiency Trends */}
        <Card className="p-4 lg:p-5 xl:p-6">
          <h3 className="font-medium text-[#1A3E73] mb-3 lg:mb-4 text-base lg:text-lg xl:text-xl">Spending Efficiency Trends</h3>
          <div className="h-32 lg:h-40 xl:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingTrendsData.slice(-6)}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  domain={[85, 95]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Efficiency']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar 
                  dataKey="efficiency" 
                  fill="#1A3E73"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1 lg:mb-2">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-blue-600" />
              <span className="text-sm lg:text-base xl:text-lg font-medium text-blue-800">Current Efficiency</span>
            </div>
            <div className="text-lg lg:text-xl xl:text-2xl font-medium text-blue-800">
              {currentSpending.efficiency}%
            </div>
            <div className="text-xs lg:text-sm xl:text-base text-blue-600">
              Optimal range: 90-95%
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}