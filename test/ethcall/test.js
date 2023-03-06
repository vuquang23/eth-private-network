const loadtest = require('loadtest');

async function main() {
  const options = {
    url: 'http://127.0.0.1:8652',
    // concurrency: 11,
    maxSeconds: 10,
    maxRequests: 10000,
    body: {
      "method": "eth_call",
      "params": [
        {
          "from": "0xeF6C8159B8F4749bc858578Be32173Ff31e5d8F0",
          "to": "0x11B56d92cEaFCB3Fb0B9eFA42e2768d01F9d77dC",
          "data": "0x022c0d9f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000ef6c8159b8f4749bc858578be32173ff31e5d8f000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000"
        },
        "latest"
      ],
      "id": 1,
      "jsonrpc": "2.0"
    },
    method: 'POST',
    contentType: "application/json",
    // headers: {
    //   "Content-Type": 
    // },
    // requestsPerSecond: 1000
  };
  loadtest.loadTest(options, (err, result) => {
    if (err) {
      console.log(`got err: ${err}`);
    }

    console.log(result);

    process.exit(0);
  });
}

main().catch(console.log);
