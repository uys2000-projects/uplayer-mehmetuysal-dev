import { CapacitorHttp } from "@capacitor/core";

export const header = {
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export const get = (url: string, params: Record<string, string>) => {
  const options = {
    url: url,
    headers: header,
    params: params,
  };

  return CapacitorHttp.get(options);
};

export const post = (
  url: string,
  params: Record<string, string>,
  body: object
) => {
  return CapacitorHttp.post({
    url: url,
    headers: header,
    params: params,
    data: body,
  });
};
