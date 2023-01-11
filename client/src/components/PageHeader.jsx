export default function PageHeader({
  pretitle,
  title = "Default title",
  content,
}) {
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col">
          {pretitle && <div className="page-pretitle">{pretitle}</div>}
          <h2 className="page-title">{title}</h2>
        </div>

        {content && <div className="col-auto ms-auto">{content}</div>}
      </div>
    </div>
  );
}
