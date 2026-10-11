import { Info, LayoutGrid, Link2 } from "lucide-react";
import { DEFAULT_SKILLS } from "../../lib/defaultContent";
import { SKILL_ICON_OPTIONS } from "../../lib/skillIcons";

// Describes the fields of skills / experience / education / certifications.
// To add or change a field in one of those tabs, edit it here.

/*
  Field types: text | textarea | paragraphs | number | image | tags | list | select | date | projects | gallery | toggle
  Each section below only describes its fields; ItemForm does the rest.
*/
export const SECTIONS = {
    skills: {
        singular: "skill",
        titleKey: "name",
        subtitleKey: "category",
        groups: [
            {
                title: "Skill",
                icon: Info,
                fields: [
                    { key: "name", label: "Name", type: "text", placeholder: "Python" },
                    {
                        key: "category",
                        label: "Category",
                        type: "text",
                        suggestions: [...new Set(DEFAULT_SKILLS.map((s) => s.category))],
                        hint: "Skills with the same category are grouped in one column. Type a new name to start a new column.",
                    },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first (inside their column)." },
                    { key: "iconKey", label: "Built-in icon", type: "select", options: SKILL_ICON_OPTIONS, hint: "Pick a logo, or upload your own below. An uploaded image wins." },
                    { key: "icon", label: "Uploaded icon or logo", type: "image" },
                ],
            },
        ],
    },

    experience: {
        singular: "experience",
        titleKey: "role",
        subtitleKey: "company",
        groups: [
            {
                title: "Details",
                icon: Info,
                fields: [
                    {
                        key: "visible",
                        label: "Visibility",
                        type: "toggle",
                        toggleLabel: "Show this experience on the site",
                        hint: "Untick to hide it from the site without deleting it. You can show it again any time.",
                        wide: true,
                    },
                    { key: "role", label: "Role", type: "text", placeholder: "Data Engineering Intern" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "location", label: "Location", type: "text" },
                    { key: "color", label: "Accent color", type: "select", options: ["primary", "secondary", "accent", "purple", "rose"] },
                    { key: "startDate", label: "Start date", type: "date" },
                    { key: "endDate", label: "End date", type: "date", hint: "Leave empty if it is still ongoing." },
                    { key: "tags", label: "Stack / skills used", type: "tags", hint: "Separate with commas: Python, SQL, Flask" },
                    { key: "projectSlugs", label: "Projects done here", type: "projects", hint: "Tick the projects you built during this experience. They show in the drawer with a View work link." },
                    { key: "photos", label: "Internship photos", type: "gallery", hint: "Photos you took during this experience. The first one is the cover. You can select several at once, add captions and reorder them." },
                ],
            },
            {
                title: "Description",
                icon: LayoutGrid,
                fields: [
                    {
                        key: "descriptionTitle",
                        label: "Title",
                        type: "text",
                        wide: true,
                        placeholder: "What I did",
                        hint: "Heading shown above the description. Leave empty to use the default.",
                    },
                    {
                        key: "description",
                        label: "What I did",
                        type: "paragraphs",
                        rows: 12,
                        placeholder: "Write freely. Press Enter for a new line, and leave an empty line between paragraphs.",
                        hint: "Write as much as you want. An empty line starts a new paragraph, and normal line breaks are kept.",
                    },
                ],
            },
        ],
    },

    education: {
        singular: "education",
        titleKey: "degree",
        subtitleKey: "school",
        groups: [
            {
                title: "Basics",
                icon: Info,
                fields: [
                    { key: "degree", label: "Degree or program", type: "text" },
                    { key: "school", label: "School", type: "text" },
                    { key: "location", label: "Location", type: "text" },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first." },
                    { key: "startYear", label: "Start year", type: "text", placeholder: "2024", hint: "Leave empty for a single graduation year (shows \"Graduated 2022\")." },
                    { key: "endYear", label: "End year", type: "text", placeholder: "2027", hint: "Leave empty if ongoing (shows \"2024 - Present\")." },
                    { key: "color", label: "Accent color", type: "select", options: ["primary", "accent", "purple", "secondary", "rose"] },
                    { key: "description", label: "Short description", type: "textarea" },
                ],
            },
            {
                title: "Extras",
                icon: Link2,
                fields: [{ key: "logo", label: "School logo", type: "image" }],
            },
        ],
    },

    certifications: {
        singular: "certification",
        titleKey: "name",
        subtitleKey: "issuer",
        groups: [
            {
                title: "Certification",
                icon: Info,
                fields: [
                    { key: "name", label: "Name", type: "text" },
                    { key: "issuer", label: "Issued by", type: "text", placeholder: "Microsoft" },
                    { key: "date", label: "Date", type: "text", placeholder: "Mar 2026" },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first." },
                    { key: "credentialUrl", label: "Credential link", type: "text", hint: "Empty hides the Verify Certificate link." },
                    { key: "description", label: "Short description", type: "textarea" },
                    { key: "image", label: "Badge or certificate image", type: "image" },
                ],
            },
        ],
    },
};