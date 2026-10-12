// A template, not a layout: templates remount on every navigation, so the
// entrance animation below re-runs each time a page is entered. A layout
// would persist and the fade would only ever play once.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade flex min-h-full flex-1 flex-col">{children}</div>;
}
