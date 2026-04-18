import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Tag, Star, ArrowRight, BarChart3, Users, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import AdminNotifications from "@/components/admin/AdminNotifications";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, end: true },
  { to: "/admin/analytics", label: "التحليلات", icon: BarChart3, end: false },
  { to: "/admin/products", label: "المنتجات", icon: Package, end: false },
  { to: "/admin/orders", label: "الطلبات", icon: ShoppingBag, end: false },
  { to: "/admin/coupons", label: "الكوبونات", icon: Tag, end: false },
  { to: "/admin/reviews", label: "التقييمات", icon: Star, end: false },
  { to: "/admin/users", label: "المستخدمون", icon: Users, end: false },
  { to: "/admin/settings", label: "الإعدادات", icon: Settings, end: false },
];

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useIsAdmin();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground font-body">جاري التحقق...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-4xl text-foreground mb-4">غير مصرح</h1>
          <p className="text-sm text-muted-foreground font-body mb-8">
            هذه الصفحة للمشرفين فقط. تواصل مع مالك الموقع لمنحك الصلاحيات.
          </p>
          <Link to="/" className="text-[11px] tracking-wide font-body border border-border/30 px-8 py-3 hover:border-accent hover:text-accent transition-all">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      <aside className="w-64 border-l border-border/20 bg-card/30 hidden lg:flex flex-col">
        <div className="p-6 border-b border-border/20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="شذايا" className="h-8 w-auto brightness-0 invert opacity-90" />
            <div>
              <p className="font-display text-sm text-foreground">لوحة التحكم</p>
              <p className="text-[10px] text-muted-foreground font-body">شذايا</p>
            </div>
          </Link>
          <AdminNotifications />
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-body transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent border-r-2 border-accent"
                    : "text-foreground/60 hover:text-foreground hover:bg-card/50"
                }`
              }
            >
              <item.icon size={16} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border/20">
          <Link
            to="/"
            className="flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground hover:text-foreground transition-colors font-body"
          >
            <ArrowRight size={12} />
            عودة للموقع
          </Link>
        </div>
      </aside>

      {/* Mobile bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border/20 flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="شذايا" className="h-6 w-auto brightness-0 invert opacity-90" />
          <p className="font-display text-xs text-foreground">لوحة التحكم</p>
        </Link>
        <AdminNotifications />
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/20">
        <nav className="flex overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex-shrink-0 min-w-[72px] flex flex-col items-center gap-1 py-2.5 text-[9px] font-body ${
                  isActive ? "text-accent" : "text-foreground/60"
                }`
              }
            >
              <item.icon size={15} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <main className="flex-1 overflow-auto pt-12 pb-20 lg:pt-0 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
