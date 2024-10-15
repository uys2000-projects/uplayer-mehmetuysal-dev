import { parse as parser } from "iptv-playlist-parser";

export const parse = (data: string) => {
  return parser(data);
};
