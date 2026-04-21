// شنطة الهدية الذهبية — تطفو في كل صفحات الموقع (ما عدا checkout/admin/essentials نفسها)
import { useLocation } from "react-router-dom";
import SalePopup from "./SalePopup";

const HIDDEN_PATHS = ["/checkout", "/admin", "/essentials", "/auth"];

const GlobalSalePopup = () => {
  const { pathname } = useLocation();
  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));
  if (hidden) return null;
  return <SalePopup />;
};

export default GlobalSalePopup;
