// because it won't get imported from socket.io/dist/namespace.d.ts for some reason 
interface ExtendedError extends Error {
  data?: any;
}