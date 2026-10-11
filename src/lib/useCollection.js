import { useEffect, useState } from "react";
import { getSettings, listItems } from "./contentDb";
export const useCollection = (name, fallback) => {
    const [state, setState] = useState({ loaded: false, items: null });

    useEffect(() => {
        let alive = true;
        Promise.all([getSettings("imports"), listItems(name)])
            .then(([imports, items]) => {
                if (alive) setState({ loaded: true, items: imports[name] ? items : null });
            })
            .catch(() => {
                if (alive) setState({ loaded: true, items: null });
            });
        return () => {
            alive = false;
        };
    }, [name]);

    return { loaded: state.loaded, items: state.items ?? fallback };
};