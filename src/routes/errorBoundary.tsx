import {useRouteError} from "react-router-dom";

export default function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    return <div>This page does not exist</div>;
  }