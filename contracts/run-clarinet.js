// run-clarinet.js
import { exec } from "child_process";

exec("clarinet test", (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Clarinet tests failed:");
    console.error(stderr);
    process.exit(1);
  }
  console.log("✅ Clarinet tests finished:");
  console.log(stdout);
});
