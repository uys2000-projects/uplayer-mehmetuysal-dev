export const match = (regex: RegExp, text: string) => {
  let results: RegExpExecArray[] = [];
  let execResult: RegExpExecArray | null;
  do {
    execResult = regex.exec(text);
    if (execResult) {
      results.push(execResult);
    }
  } while (execResult);
  return results;
};
