import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Settings } from "lucide-react";
import { auth } from "../lib/firebaseCloudinaryConfig";

export const AdminShortcut = () => {
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (!user) return null;

  return (
    <Link
      to="/admin"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-border/40 bg-background px-4 py-2.5 text-xs font-semibold shadow-lg transition-transform hover:scale-105"
    >
      <Settings size={14} />
      Admin
    </Link>
  );
};