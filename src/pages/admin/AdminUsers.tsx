import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Shield, ShieldOff, Users, Search } from "lucide-react";
import { toast } from "sonner";

const AdminUsers = () => {
  const qc = useQueryClient();
  const [q, setQ] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_list_users");
      if (error) throw error;
      return data || [];
    },
  });

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      if (!confirm("سحب صلاحية الأدمن من هذا المستخدم؟")) return;
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) toast.error("فشل التحديث");
      else toast.success("تم سحب الصلاحية");
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
      if (error) toast.error("فشل التحديث: " + error.message);
      else toast.success("تم منح صلاحية الأدمن");
    }
    qc.invalidateQueries({ queryKey: ["admin-users"] });
  };

  const filtered = (users || []).filter((u: any) => {
    if (!q) return true;
    const t = q.toLowerCase();
    return (u.email || "").toLowerCase().includes(t)
      || (u.first_name || "").toLowerCase().includes(t)
      || (u.last_name || "").toLowerCase().includes(t)
      || (u.phone || "").includes(t);
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">الأعضاء</p>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
          <span className="italic">المستخدمون</span>
        </h1>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث بالاسم، الإيميل، أو الجوال..."
          className="w-full bg-transparent border border-border/30 focus:border-accent pr-9 pl-3 py-2.5 text-sm font-body outline-none"
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : filtered.length > 0 ? (
        <div className="border border-border/20 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-border/20">
              <tr className="text-[10px] tracking-wide text-muted-foreground font-body">
                <th className="p-4 text-right">الاسم</th>
                <th className="p-4 text-right">البريد</th>
                <th className="p-4 text-right">الجوال</th>
                <th className="p-4 text-right">انضم في</th>
                <th className="p-4 text-right">آخر دخول</th>
                <th className="p-4 text-right">الصلاحية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/15">
              {filtered.map((u: any) => (
                <tr key={u.user_id} className="hover:bg-card/30 transition-colors">
                  <td className="p-4 text-sm text-foreground font-body">
                    {u.first_name || u.last_name ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : "—"}
                  </td>
                  <td className="p-4 text-xs text-foreground/70 font-body" dir="ltr">{u.email}</td>
                  <td className="p-4 text-xs text-muted-foreground font-body" dir="ltr">{u.phone || "—"}</td>
                  <td className="p-4 text-[10px] text-muted-foreground font-body">
                    {new Date(u.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="p-4 text-[10px] text-muted-foreground font-body">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString("ar-EG") : "—"}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAdmin(u.user_id, u.is_admin)}
                      className={`flex items-center gap-1.5 text-[10px] tracking-wide font-body px-3 py-1.5 border ${u.is_admin ? "border-accent text-accent bg-accent/5" : "border-border/30 text-muted-foreground hover:border-foreground/40"}`}
                    >
                      {u.is_admin ? <Shield size={11} strokeWidth={1.5} /> : <ShieldOff size={11} strokeWidth={1.5} />}
                      {u.is_admin ? "أدمن" : "عضو"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/30">
          <Users size={32} strokeWidth={1} className="text-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
