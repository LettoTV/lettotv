export default function StatusBadge({
  isLive,
  loading = false,
}) {
  let label = "OFFLINE";
  let className = "status-badge offline";

  if (loading) {
    label = "CHECKING STATUS";
    className = "status-badge checking";
  }

  if (isLive && !loading) {
    label = "LIVE NOW";
    className = "status-badge live";
  }

  return (
    <div className={className}>
      <span className="status-dot" />

      {label}
    </div>
  );
}