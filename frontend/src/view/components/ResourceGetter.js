import { UseGetResource } from "../../viewmodel/hooks/getResource";
import React from "react";

function ResourceGetter({ func, componentToRender }) {
  const resource = UseGetResource(func);

  if (resource.isFilled) {
    return componentToRender(resource.data);
  }
  if (resource.failed) {
    return <span> An error has happened, please try again later </span>;
  } else {
    return <span> Loading... </span>;
  }
}

export default ResourceGetter;
