import {
  Activity,
  Package,
  ShoppingCart,
  DollarSign,
  Sun,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OverviewChart from "./overview-chart";

export const metadata = {
  title: "Dashboard",
};

const CustomerDashboard = ({ orders, recommendedProducts }) => {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>Download Purchase Report</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-sidebar">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&#8358;12,300</div>
              <p className="text-xs text-muted-foreground">
                +15.4% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-sidebar">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products Bought
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">27</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-sidebar">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">500 Points</div>
              <p className="text-xs text-muted-foreground">
                Redeemable for discounts
              </p>
            </CardContent>
          </Card>
          <Card className="bg-sidebar">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Orders
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 arriving this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart />
            </CardContent>
          </Card>
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Review your previous purchases</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              {orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4">
                      <Package className="h-6 w-6 text-gray-400" />
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{order.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Ordered on: {order.orderDate}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        &#8358;{order.total}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-6">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    No orders yet. Start shopping now!
                  </p>
                  <Button className="mt-4" href="/products">
                    Go to Products
                  </Button>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>
                Plan your next grocery trip accordingly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Sun className="h-10 w-10 text-yellow-500" />
                <div className="space-y-1">
                  <p className="text-xl font-medium">Sunny</p>
                  <p className="text-sm text-muted-foreground">
                    High: 28°C | Low: 18°C
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Tomorrow: Sunny, 27°C</span>
                </div>
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Day 3: Sunny, 29°C</span>
                </div>
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm">Day 4: Clear, 28°C</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
              <CardDescription>
                Based on your previous purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <img
                      src={product.imageUrl || "/images/placeholder.svg"}
                      className="rounded-md"
                      width={50}
                      height={50}
                      alt={product.name}
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        &#8358;{product.price}/{product.unit}
                      </p>
                    </div>
                    <Badge variant="secondary">{product.tag}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;