import { useEffect, useState } from "react";
import Resource from "../../model/resource";

async function getResourceAndUpdate<T>(getResource: () => Promise<T>, setState: [Resource<T>, React.Dispatch<React.SetStateAction<Resource<T>>>][1]): Promise<void>{
  try {
    const resource = await getResource();
    console.log("Got resource");
    setState(new Resource<T>(resource));
  } catch (err) {
    console.error(`An error has occurred: ${err}`);
    setState(new Resource<T>(undefined, true));
  }
}

export function UseGetResource<T> (getResource: () => Promise<T>): Resource<T> {
  const [state, setState] = useState(new Resource<T>());
  
  useEffect(() => {
    getResourceAndUpdate(getResource, setState)
  }, [getResource])

  return state;
}
