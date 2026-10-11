import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "../../lib/firebaseCloudinaryConfig";
import { PandaPeek } from "../Pandapeek";
import { Field, TerminalBar, btnMain, inp } from "./ui";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [sass, setSass] = useState(false);
    const [slow, setSlow] = useState(false);

    // login taking too long: she rolls her eyes until it finishes
    useEffect(() => {
        if (!busy) return;
        const t = setTimeout(() => setSlow(true), 2500);
        return () => {
            clearTimeout(t);
            setSlow(false);
        };
    }, [busy]);

    // tapping the eye to hide the password: she gets sassy for a moment
    const toggleEye = () => {
        const next = !showPw;
        setShowPw(next);
        if (!next) {
            setSass(true);
            setTimeout(() => setSass(false), 2500);
        }
    };

    // eye roll beats pout, pout beats sass, otherwise she follows the cursor
    const mood = slow ? "roll" : err ? "hmph" : sass ? "sass" : "idle";

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setErr("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setErr("Wrong email or password.");
        }
        setBusy(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <PandaPeek className="mx-auto w-full max-w-sm" mood={mood}>
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lg"
                >
                    <TerminalBar title="khadija@portfolio: ~/admin" />
                    <div className="space-y-4 p-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
                            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
                            admin.login()
                        </span>
                        <div>
                            <h1 className="text-xl font-black">Log in to edit</h1>
                            <p className="mt-1 text-sm text-foreground/60">
                                Only the owner of this portfolio can sign in.
                            </p>
                        </div>
                        <Field label="Email">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inp}
                            />
                        </Field>
                        <Field label="Password">
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${inp} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={toggleEye}
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-foreground/50 hover:text-primary"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </Field>
                        {err && <p className="text-sm text-rose">{err}</p>}
                        <button type="submit" disabled={busy} className={`${btnMain} w-full`}>
                            {busy ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </form>
            </PandaPeek>
        </div>
    );
};
