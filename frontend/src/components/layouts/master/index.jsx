export default function MasterLayout({ component: Component, ...rest }) {
  return (
    <div className="container-scroller">
      <div className="main-panel">{Component && <Component />}</div>
    </div>
  );
}
