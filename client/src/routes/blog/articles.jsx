import BaseLayout from "../../layouts/BaseLayout";
import { Link } from "react-router-dom";

export default function Articles() {
  return (
    <BaseLayout>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img />

            <div className="card-body">
              <h3 className="card-title">Card with left side image</h3>

              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam deleniti fugit incidunt, iste, itaque minima neque
                pariatur perferendis sed suscipit velit vitae voluptatem.
              </p>
            </div>

            <div className="card-footer">
              <div className="d-flex justify-content-between align-items-center">
                <div>Created "time"</div>
                <Link to="/blog/articles/1" className="btn">
                  Читать
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
