module.exports = {
  apps : [{
    script    : "dist/worker.js",
    instances : "3",
    exec_mode : "cluster"
  }]
};
