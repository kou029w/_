import msgpack from "msgpack-lite";
import fetch from "node-fetch";

const body = msgpack.encode({
  int: 1,
  float: 0.5,
  // date: new Date(),
  // error: new Error(),
  // num: new Number(0),
  buff: Buffer.from([1, 2]),
  // arrbuff: Uint32Array.from([3, 4]),
  // dataView: new ArrayBuffer([1]),
  array: [2, 3],
  object: { key: "val" },
  str: new String("hello"),
  // bool: new Boolean(true),
  // intArray: new Int8Array(),
  // bigInt: 1n,
});
const res = await fetch("http://localhost:24224/", {
  method: "POST",
  headers: { "Content-type": "application/msgpack" },
  body,
});
console.log(res);
