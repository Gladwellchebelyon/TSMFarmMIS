import app from "./app";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Three Sisters FarmMIS API is running on port ${PORT}`);
});