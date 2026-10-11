import { useEffect, useState } from "react";
import { getSettings } from "./contentDb";
export const useSiteSettings = (id = "site") => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        getSettings(id)
            .then(setSettings)
            .catch(() => setSettings({}));
    }, [id]);

    return { ...(settings ?? {}), loaded: settings !== null };
};