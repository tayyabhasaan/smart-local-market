import BusinessLayout from "../../components/business/BusinessLayout";
import {
  TrendingUp, TrendingDown, ShoppingBag,
  Users, Package, DollarSign
} from "lucide-react";

// Static data
const monthlySales = [
  { month: "Nov", revenue: 28000, orders: 45 },
  { month: "Dec", revenue: 35000, orders: 62 },
  { month: "Jan", revenue: 31000, orders: 54 },
  { month: "Feb", revenue: 42000, orders: 78 },
  { month: "Mar", revenue: 38000, orders: 69 },
  { month: "Apr", revenue: 54200, orders: 128 },
];

const topProducts = [
  { name: "Basmati Rice 5kg",      sales: 38, revenue: 36100, emoji: "🍚", percent: 92 },
  { name: "Surf Excel 1kg",        sales: 29, revenue: 13050, emoji: "🧺", percent: 74 },
  { name: "Nestle Milk Pack 1L",   sales: 45, revenue: 8100,  emoji: "🥛", percent: 100 },
  { name: "Dettol Handwash 250ml", sales: 22, revenue: 4840,  emoji: "🧴", percent: 56 },
  { name: "Panadol Extra",         sales: 18, revenue: 1530,  emoji: "💊", percent: 46 },
];

const categoryBreakdown = [
  { label: "Grocery",   percent: 35, color: "bg-olive" },
  { label: "Household", percent: 25, color: "bg-purple" },
  { label: "Dairy",     percent: 18, color: "bg-blue-400" },
  { label: "Pharmacy",  percent: 12, color: "bg-orange-400" },
  { label: "Others",    percent: 10, color: "bg-lavender" },
];

const recentActivity = [
  { text: "New order from Ali Hassan",      time: "5 min ago",  type: "order" },
  { text: "Surf Excel stock running low",   time: "1 hr ago",   type: "alert" },
  { text: "Order #DK10232 delivered",       time: "2 hr ago",   type: "success" },
  { text: "New order from Zara Sheikh",     time: "5 hr ago",   type: "order" },
  { text: "Dettol Handwash stock critical", time: "8 hr ago",   type: "alert" },
];

const activityConfig = {
  order:   { color: "bg-blue-100 text-blue-600",   icon: "🛒" },
  alert:   { color: "bg-orange-100 text-orange-600", icon: "⚠️" },
  success: { color: "bg-green-100 text-green-600", icon: "✅" },
};

const maxRevenue = Math.max(...monthlySales.map((m) => m.revenue));

export default function BusinessAnalytics() {
  const totalRevenue  = monthlySales.reduce((s, m) => s + m.revenue, 0);
  const totalOrders   = monthlySales.reduce((s, m) => s + m.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);
  const thisMonth     = monthlySales[monthlySales.length - 1];
  const lastMonth     = monthlySales[monthlySales.length - 2];
  const revenueGrowth = Math.round(
    ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100
  );

  return (
    <BusinessLayout
      title="Analytics"
      subtitle="Track your store performance"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Revenue",
            value: `Rs. ${totalRevenue.toLocaleString()}`,
            change: `+${revenueGrowth}% this month`,
            icon: <DollarSign size={20} />,
            positive: true,
          },
          {
            label: "Total Orders",
            value: totalOrders,
            change: "+12% this month",
            icon: <ShoppingBag size={20} />,
            positive: true,
          },
          {
            label: "Avg Order Value",
            value: `Rs. ${avgOrderValue}`,
            change: "+5% this month",
            icon: <TrendingUp size={20} />,
            positive: true,
          },
          {
            label: "Total Customers",
            value: "48",
            change: "+8 new this month",
            icon: <Users size={20} />,
            positive: true,
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-olive/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-lavender rounded-xl flex items-center justify-center text-purple">
                {kpi.icon}
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${
                kpi.positive ? "text-green-600" : "text-red-500"
              }`}>
                {kpi.positive
                  ? <TrendingUp size={12} />
                  : <TrendingDown size={12} />
                }
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-olive">{kpi.value}</p>
            <p className="text-xs text-olive/50 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-olive">Monthly Revenue</h2>
              <p className="text-xs text-olive/40 mt-0.5">Last 6 months performance</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={11} /> +{revenueGrowth}%
            </span>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-44">
            {monthlySales.map((m, i) => {
              const isLast = i === monthlySales.length - 1;
              const height = Math.round((m.revenue / maxRevenue) * 160);
              return (
                <div
                  key={m.month}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  {/* Revenue label */}
                  <span className="text-xs text-olive/50 hidden sm:block">
                    {Math.round(m.revenue / 1000)}k
                  </span>
                  {/* Bar */}
                  <div className="w-full flex items-end justify-center">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        isLast ? "bg-purple" : "bg-lavender"
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  </div>
                  {/* Month label */}
                  <span className={`text-xs font-medium ${
                    isLast ? "text-purple" : "text-olive/50"
                  }`}>
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-olive/10">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-purple rounded-sm" />
              <span className="text-xs text-olive/50">Current Month</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-lavender rounded-sm" />
              <span className="text-xs text-olive/50">Previous Months</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <h2 className="text-base font-bold text-olive mb-1">Sales by Category</h2>
          <p className="text-xs text-olive/40 mb-5">Revenue distribution</p>

          <div className="flex flex-col gap-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-olive">{cat.label}</span>
                  <span className="text-xs font-bold text-olive">{cat.percent}%</span>
                </div>
                <div className="h-2 bg-olive/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.color} transition-all`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-5 pt-4 border-t border-olive/10">
            <p className="text-xs text-olive/40 mb-1">Total Revenue</p>
            <p className="text-xl font-bold text-olive">
              Rs. {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Top Products + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Products */}
        <div className="lg:col-span-2 bg-white border border-olive/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-olive">Top Products</h2>
              <p className="text-xs text-olive/40 mt-0.5">Best performing this month</p>
            </div>
            <Package size={18} className="text-olive/30" />
          </div>

          {/* Header */}
          <div className="grid grid-cols-4 text-xs font-semibold text-olive/40 uppercase tracking-wide pb-2 border-b border-olive/10 mb-2">
            <span className="col-span-2">Product</span>
            <span className="text-center">Sales</span>
            <span className="text-right">Revenue</span>
          </div>

          <div className="flex flex-col gap-1">
            {topProducts.map((product, i) => (
              <div
                key={product.name}
                className="grid grid-cols-4 py-3 items-center hover:bg-cream rounded-xl px-2 transition-colors"
              >
                {/* Product */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 bg-lavender rounded-lg flex items-center justify-center text-lg shrink-0">
                    {product.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-olive truncate">
                      {product.name}
                    </p>
                    {/* Mini bar */}
                    <div className="h-1 bg-olive/10 rounded-full mt-1 w-full">
                      <div
                        className="h-full bg-purple rounded-full"
                        style={{ width: `${product.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sales */}
                <span className="text-sm text-olive/60 text-center">
                  {product.sales}
                </span>

                {/* Revenue */}
                <span className="text-sm font-bold text-olive text-right">
                  Rs. {product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-olive/10 rounded-2xl p-5">
          <h2 className="text-base font-bold text-olive mb-4">Recent Activity</h2>

          <div className="flex flex-col gap-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${activityConfig[activity.type].color}`}>
                  {activityConfig[activity.type].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-olive leading-tight">
                    {activity.text}
                  </p>
                  <p className="text-xs text-olive/40 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Summary */}
          <div className="mt-5 pt-4 border-t border-olive/10 bg-lavender rounded-xl p-4">
            <p className="text-xs font-semibold text-olive mb-3">This Month</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Revenue",  value: `Rs. ${thisMonth.revenue.toLocaleString()}` },
                { label: "Orders",   value: thisMonth.orders },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-base font-bold text-olive">{s.value}</p>
                  <p className="text-xs text-olive/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </BusinessLayout>
  );
}