const API = process.env.API_URL;

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};


export const getCops = async () => {
  return get("/cops");
};

export const getCopsById = async (id : string) => {
  return get("/cops/" + id);
}
