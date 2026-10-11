import { listProjects, removeProject } from "../../lib/projectsDb";
import { listItems, removeItem, saveItem } from "../../lib/contentDb";
import {
    DEFAULT_CERTIFICATIONS,
    DEFAULT_EDUCATION,
    DEFAULT_EXPERIENCE,
    DEFAULT_PROJECTS,
    DEFAULT_SKILLS,
} from "../../lib/defaultContent";
import { SECTIONS } from "./sections";
import { ItemForm } from "./ItemForm";
import { ProjectForm } from "./ProjectForm";
import { SiteForm } from "./SiteForm";
import { NextForm } from "./NextForm";
import { ContactForm } from "./ContactForm";
import { prepareCertifications, prepareProjects } from "./importHelpers";

// The admin tabs. To add a new tab, add one entry to TABS.

// One entry per tab. Everything the dashboard needs to list, edit and delete is here.
const sectionTab = (key, label, defaults, prepare) => {
    const def = SECTIONS[key];
    return {
        key,
        label,
        defaults,
        prepare,
        singular: def.singular,
        list: () => listItems(key),
        remove: (it) => removeItem(key, it.id),
        idOf: (it) => it.id,
        titleOf: (it) => it[def.titleKey] || "Untitled",
        subtitleOf: (it) => (it.visible === false ? "Hidden · " : "") + (it[def.subtitleKey] || ""),
        Form: (props) => <ItemForm def={def} save={(d) => saveItem(key, d)} {...props} />,
    };
};

export const TABS = [
    {
        key: "projects",
        label: "Projects",
        defaults: DEFAULT_PROJECTS,
        prepare: prepareProjects,
        singular: "project",
        list: listProjects,
        remove: (p) => removeProject(p.slug),
        idOf: (p) => p.slug,
        titleOf: (p) => p.title,
        subtitleOf: (p) => (p.visible === false ? "Hidden · " : "") + `/projects/${p.slug}`,
        viewTo: (p) => `/projects/${p.slug}`,
        Form: ProjectForm,
    },
    sectionTab("skills", "Skills", DEFAULT_SKILLS),
    sectionTab("experience", "Experience", DEFAULT_EXPERIENCE),
    sectionTab("education", "Education", DEFAULT_EDUCATION),
    sectionTab("certifications", "Certifications", DEFAULT_CERTIFICATIONS, prepareCertifications),
    { key: "site", label: "Site", single: true, Form: SiteForm },
    { key: "next", label: "What's next", single: true, Form: NextForm },
    { key: "contact", label: "Contact", single: true, Form: ContactForm },
];