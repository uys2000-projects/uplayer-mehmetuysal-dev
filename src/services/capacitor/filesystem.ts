import {
  Filesystem,
  Directory,
  Encoding,
  type ProgressStatus,
} from "@capacitor/filesystem";

export const checkPermissions = async () => {
  const { publicStorage } = await Filesystem.checkPermissions();
  return publicStorage != "denied";
};
export const requestPermissions = async () => {
  const { publicStorage } = await Filesystem.requestPermissions();
  return publicStorage != "denied";
};

export const createDir = async (path: string) => {
  await Filesystem.mkdir({
    path: path,
    directory: Directory.Data,
  });
  return true;
};

export const readDir = async (path: string) => {
  const readdirResult = await Filesystem.readdir({
    path: path,
    directory: Directory.Data,
  });
  return readdirResult.files;
};

export const deleteDir = async (path: string) => {
  await Filesystem.rmdir({
    path: path,
    directory: Directory.Data,
    recursive: true,
  });
  return true;
};

export const writeFile = async (path: string, data: string) => {
  const writeFileResult = await Filesystem.writeFile({
    path: path,
    data: data,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    recursive: true,
  });
  return writeFileResult.uri;
};

export const writeFileObject = async (path: string, data: object) => {
  const writeFileResult = await Filesystem.writeFile({
    path: path,
    data: JSON.stringify(data),
    directory: Directory.Data,
    encoding: Encoding.UTF8,
    recursive: true,
  });
  return writeFileResult.uri;
};

export const readFile = async (path: string) => {
  const readFileResult = await Filesystem.readFile({
    path: path,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
  return readFileResult.data as string;
};

export const readFileObject = async <T>(path: string) => {
  const readFileResult = await Filesystem.readFile({
    path: path,
    directory: Directory.Data,
    encoding: Encoding.UTF8,
  });
  return JSON.parse(readFileResult.data as string) as T;
};

export const deleteFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: path,
    directory: Directory.Data,
  });
};

export const downloadFile = async (url: string, path: string) => {
  await Filesystem.downloadFile({
    method: "get",
    url: url,
    path: path,
    directory: Directory.Documents,
    progress: true,
    recursive: true,
  });
};

export const listen = async (callback: (progress: ProgressStatus) => void) => {
  return Filesystem.addListener("progress", callback);
};

export const removeListeners = async () => {
  return Filesystem.removeAllListeners();
};
