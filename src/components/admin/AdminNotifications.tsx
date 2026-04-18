import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminNotifications = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: notifs } = useQuery({
    queryKey: ["admin-notifications"],
    queryFn: async () => {
      const { data } = await supabase.from("admin_notifications").select("*").order("created_at", { ascending: false }).limit(20);
      return data || [];
    },
  });

  // Realtime subscription
  useEffect(() => {
    const ch = supabase
      .channel("admin-notifs")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_notifications" }, (payload) => {
        const n: any = payload.new;
        toast.success(n.title, { description: n.message });
        qc.invalidateQueries({ queryKey: ["admin-notifications"] });
        qc.invalidateQueries({ queryKey: ["admin-orders"] });
        qc.invalidateQueries({ queryKey: ["admin-stats"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);

  const unread = (notifs || []).filter((n: any) => !n.is_read).length;

  const markAllRead = async () => {
    await supabase.from("admin_notifications").update({ is_read: true }).eq("is_read", false);
    qc.invalidateQueries({ queryKey: ["admin-notifications"] });
  };

  const markRead = async (id: string) => {
    await supabase.from("admin_notifications").update({ is_read: true }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-notifications"] });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-foreground/70 hover:text-foreground transition-colors"
        aria-label="الإشعارات"
      >
        <Bell size={16} strokeWidth={1.5} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[9px] font-body min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-80 bg-card border border-border/30 shadow-xl z-50 max-h-[500px] overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border/20 flex items-center justify-between">
              <p className="font-display text-sm">الإشعارات</p>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-[10px] text-accent flex items-center gap-1 font-body">
                  <CheckCheck size={11} /> تعليم الكل كمقروء
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border/15">
              {(notifs || []).length === 0 ? (
                <p className="p-6 text-center text-xs text-muted-foreground font-body">لا توجد إشعارات</p>
              ) : (
                (notifs || []).map((n: any) => (
                  <Link
                    key={n.id}
                    to={n.link || "#"}
                    onClick={() => { markRead(n.id); setOpen(false); }}
                    className={`block p-3 hover:bg-card/50 transition-colors ${!n.is_read ? "bg-accent/5" : ""}`}
                  >
                    <div className="flex items-start gap-2">
                      {!n.is_read && <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-xs font-display text-foreground">{n.title}</p>
                        {n.message && <p className="text-[10px] text-muted-foreground font-body mt-0.5">{n.message}</p>}
                        <p className="text-[9px] text-muted-foreground font-body mt-1">
                          {new Date(n.created_at).toLocaleString("ar-EG")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminNotifications;
