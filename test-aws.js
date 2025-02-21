import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

async function testAWS() {
  const stsClient = new STSClient({
    region: "ap-south-1", // Ensure this matches your DynamoDB table's region
  });

  try {
    const identity = await stsClient.send(new GetCallerIdentityCommand({}));
    console.log("Authenticated as:", identity);
  } catch (error) {
    console.error("Failed to authenticate:", error);
  }
}

testAWS();
