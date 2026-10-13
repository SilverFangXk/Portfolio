import { useEffect, useState } from 'react';
import PandaMascot from './PandaMascot';
import ResumeChat from './ResumeChat';

export default function ChatWidget({
  apiUrl,
  ownerName = 'Doja',
  demo = false,
  onExpandedChange
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const full = open && expanded;

  // Tell the page when the chat takes the left side, so it can make room.
  useEffect(() => {
    onExpandedChange?.(full);
  }, [full]);

  return (
    <div
      className={
        full
          ? 'fixed inset-y-0 right-0 z-50 w-full sm:w-[420px]'
          : 'fixed bottom-4 right-4 z-50 flex flex-col items-end'
      }
    >
      <div className={open ? (expanded ? 'block h-full' : 'block w-[calc(100vw-2rem)] max-w-sm') : 'hidden'}>
        <ResumeChat
          apiUrl={apiUrl}
          ownerName={ownerName}
          pandaSize={120}
          demo={demo}
          expanded={expanded}
          onToggleExpand={() => setExpanded((e) => !e)}
          onClose={() => {
            setOpen(false);
            setExpanded(false);
          }}
        />
      </div>

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open resume chat"
          className="flex items-end gap-1 focus:outline-none"
        >
          <span className="mb-10 rounded-2xl rounded-br-sm border border-border/60 bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-lg">
            Ask my resume 👋
          </span>
          <PandaMascot mood="idle" size={96} follow />
        </button>
      )}
    </div>
  );
}