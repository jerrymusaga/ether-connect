import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  // use clientId for client side usage
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id", // replace this with your actual client ID
  // use secretKey for server side usage
  secretKey: process.env.NEXT_ThirdWeb_API_SECRET, // replace this with full secret key
});

export default client;
