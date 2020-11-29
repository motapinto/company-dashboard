import { useEffect, useState } from "react";
import Resource from "../../model/resource";

async function GetResourceAndUpdate (getResource, setState) {
  try {
    const resource = await getResource();
    console.log("Got resource");
    setState(new Resource(resource));
  } catch (reason) {
    console.error(`An error has occurred: ${reason}`);
    setState(new Resource(null, true));
  }
}

export function UseGetResource (getResource) {
  const promise = new Resource();
  const [state, setState] = useState(promise);
  useEffect(() => {
    GetResourceAndUpdate(getResource, setState);
  }, []);
  return state;
}
