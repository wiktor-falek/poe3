module.exports = {
  apps: [
    {
      script: "dist/worker.js",
      instances: "4",
      exec_mode: "cluster",
    },
  ],
};
