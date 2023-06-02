interface Session {
  sessionId: string;
  username: string;
}

export default function getSession(): Session {
  // TODO: share session with socket server with httpOnly cookies
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
