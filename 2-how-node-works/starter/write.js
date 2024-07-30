const fs = require('fs');
const path = `test-file2.txt`;
const totalLines = 10000;
const chunkSize = 1000000;
const line = 'Koss OM el Sessy\n';

function writeLinesToFile() {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(path, { flags: 'w' });
        let linesWritten = 0;

        function writeChunk() {
            let ok = true;
            while (ok && linesWritten < totalLines) {
                linesWritten += chunkSize;
                if (linesWritten >= totalLines) {
                    // Write the remaining lines if chunk exceeds the total lines
                    ok = stream.write(line.repeat(totalLines - (linesWritten - chunkSize)), 'utf8', () => {
                        console.log(`${totalLines} lines written to ${path}`);
                        stream.end();
                        resolve();
                    });
                } else {
                    // Write the full chunk
                    ok = stream.write(line.repeat(chunkSize));
                }
            }
            if (linesWritten < totalLines) {
                stream.once('drain', writeChunk);
            }
        }

        stream.on('error', reject);
        writeChunk();
    });
}

writeLinesToFile().then(() => {
    console.log('File writing completed.');
}).catch((error) => {
    console.error('Error writing to file:', error);
});
