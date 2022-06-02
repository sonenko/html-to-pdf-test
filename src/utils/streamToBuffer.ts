export default function streamToBuffer(streamObjectToRead): Promise<Buffer> {
  const chunks = [];
  return new Promise<Buffer>((resolve, reject) => {
    streamObjectToRead
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', (err) => reject(err));
  });
}
