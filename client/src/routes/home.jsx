import BaseLayout from "../layouts/BaseLayout";

export default function Home() {
  return (
    <BaseLayout>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            Blogger - небольшой движок для создания собственного блога
          </h3>

          <p className="text-muted">Сделано на React и FastAPI.</p>
        </div>
      </div>
    </BaseLayout>
  );
}
