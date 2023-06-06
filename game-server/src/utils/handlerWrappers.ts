/*
export const wrapper = (cb: (...args: any[]) => any) => {
  // check for condition
  if (false) {
    // return failure callback, empty or with socket.emit, logging etc
    return () => {
      console.log("Event prohibited")
    };
  }
  // if condition was not met simply handle the event as usual
  return cb;
  
USAGE:
function registerEventHandler(io: Io, socket: IoSocket, client: Client) {
  const handleEvent = (num: number) => {
    socket.emit("event", num + 1);
  }
  
  socket.on("event", wrapper(handleEvent));
};
*/

export const notInInstance = (
  cb: (...args: any[]) => any,
  client: undefined
) => {
  const isInInstance = false;
  if (isInInstance) {
    return () => {};
  }
  return cb;
};
