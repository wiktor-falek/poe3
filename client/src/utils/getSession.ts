interface Session {
  sessionId: string;
  username: string;
}

export default function getSession(): Session {
  // there is a better way to share session with socket server with htppOnly cookies
  // TODO (Critical): safely share session with socket server 
  const session = {
    sessionId: document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1],
    username: document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1],
  };
  return session;
}
