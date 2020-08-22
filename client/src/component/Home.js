import React, { lazy, Suspense } from "react";
import { Container, CircularProgress } from "@material-ui/core";

const FileUpload = lazy(() => import("./FileUpload"));
const ShowResume = lazy(() => import("./ShowResume"));
const Home = () => {
  return (
    <Container fixed>
      <Suspense
        fallback={
          <Container className="my-5" align="center">
            <CircularProgress color="primary" />
          </Container>
        }
      >
        <FileUpload />
        <ShowResume />
      </Suspense>
    </Container>
  );
};

export default Home;
