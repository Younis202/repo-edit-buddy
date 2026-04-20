import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X, Loader2, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader = ({ images, onChange, maxImages }: Props) => {
  const remaining = typeof maxImages === "number" ? Math.max(0, maxImages - images.length) : Infinity;
  const atLimit = remaining === 0;
  const [uploading, setUploading] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const upload = async (files: FileList) => {
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `products/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast.error("فشل رفع: " + file.name);
        continue;
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
    if (uploaded.length) {
      onChange([...images, ...uploaded]);
      toast.success(`تم رفع ${uploaded.length} صورة`);
    }
    setUploading(false);
  };

  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const onDrop = (toIdx: number) => {
    if (dragIdx === null || dragIdx === toIdx) return;
    const next = [...images];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(toIdx, 0, moved);
    onChange(next);
    setDragIdx(null);
  };

  return (
    <div className="space-y-3">
      <label className="block">
        <div className="border border-dashed border-border/40 hover:border-accent/60 transition-colors p-6 text-center cursor-pointer bg-card/20">
          {uploading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs font-body">جاري الرفع...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload size={20} strokeWidth={1.5} />
              <span className="text-xs font-body">اسحب أو انقر لرفع الصور</span>
              <span className="text-[10px] font-body opacity-60">JPG, PNG, WebP — متعدد</span>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files && upload(e.target.files)}
          />
        </div>
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div
              key={url + i}
              draggable
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className={`relative group border ${dragIdx === i ? "border-accent" : "border-border/20"} bg-card/30 aspect-[3/4] overflow-hidden`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-1 left-1 bg-background/80 px-1.5 py-0.5 text-[9px] font-body">
                {i === 0 ? "غلاف" : i + 1}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-destructive/90 text-destructive-foreground p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={11} />
              </button>
              <div className="absolute bottom-1 right-1 bg-background/80 p-1 cursor-grab opacity-0 group-hover:opacity-100">
                <GripVertical size={11} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
