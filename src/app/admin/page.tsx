import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, Truck } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'New Users',
    value: '+2,350',
    change: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Total Sales',
    value: '+12,234',
    change: '+19% from last month',
    icon: ShoppingBag,
  },
  {
    title: 'Pending Orders',
    value: '72',
    change: '+5 since last hour',
    icon: Truck,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Placeholder for charts and recent activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Chart would be here</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Recent sales list would be here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
