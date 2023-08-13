export default function (url: string): string | Error {
  const tweetIdRegex = /\/status\/(\d+)/;
  const match = url.match(tweetIdRegex);

  if (match && match[1]) {
    return match[1];
  }

  throw new Error();
}
