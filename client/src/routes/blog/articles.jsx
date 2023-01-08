import { Container, Grid } from "@mantine/core";
import { ArticleCard } from "../../features/articles";
import BaseLayout from "../../layouts/BaseLayout";

export default function Articles() {
  return (
    <BaseLayout>
      <Container my="md">
        <Grid>
          <Grid.Col xs={4}>
            <ArticleCard
              category="Technology"
              title="Simple title"
              footer="created in 00:00"
              author={{
                name: "Pavel",
                description: "imdeveloper",
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </BaseLayout>
  );
}
