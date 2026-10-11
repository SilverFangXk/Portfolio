import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebaseCloudinaryConfig";
import { Background } from "../components/Background";
import { Login } from "../components/admin/Login";
import { Dashboard } from "../components/admin/Dashboard";

// The admin page only decides: still checking / logged in / logged out.
// Everything else lives in components/admin/ (one file per piece).

export const Admin = () => {
    const [user, setUser] = useState(undefined); // undefined = still checking

    useEffect(() => onAuthStateChanged(auth, setUser), []);

    return (
        <div className="relative min-h-screen text-foreground">
            <Background />
            <div className="relative z-10">
                {user === undefined ? (
                    <p className="p-8 text-sm text-foreground/60">Loading...</p>
                ) : user ? (
                    <Dashboard user={user} />
                ) : (
                    <Login />
                )}
            </div>
        </div>
    );
};
