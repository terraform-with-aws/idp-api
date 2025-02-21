import { Request, Response } from "express";
import { Environment } from "../config/interfaces";
import { dynamoDb } from "../db/dynamodb";
import { DeleteItemCommand, PutItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import {
  formatDynamoDBEnvironmentForResponse,
  formatEnvironmentForDynamoDB,
  generateUpdateEnvironmentParams,
} from "../utils/util";


const tableName = process.env.AWS_DYNAMODB_TABLE_NAME!;

export async function getEnvironments(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const params = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME!,
    };
    const data = await dynamoDb.send(new ScanCommand(params));
    if (!data.Items) {
      res.status(404).json({ message: "No environments found" });
      return;
    }

    const formattedItems = data.Items.map(formatDynamoDBEnvironmentForResponse);
    res
      .status(200)
      .json({
        message: "Environments fetched successfully",
        data: formattedItems,
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching environments", error });
  }
}

export async function createEnvironment(req: Request, res: Response) {
  try {
    const environment: Environment = {
      ...req.body,
      status: "REGISTERED",
    };

    const params = {
      Item: formatEnvironmentForDynamoDB(environment),
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME!,
      ConditionExpression: "attribute_not_exists(environment)", // Ensures uniqueness
    };

    try {
      await dynamoDb.send(new PutItemCommand(params));
      res.status(202).json({ message: "Environment created successfully" });
      return;
    } catch (err: any) {
      if (err.name === "ConditionalCheckFailedException") {
        res.status(409).json({ message: "Environment already exists" });
        return;
      }
      console.log(err);
      res.status(500).json({ message: "failed", error: err.message });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating environment", error });
  }
}

export async function deleteEnvironment(req: Request, res: Response) {
    const { name } = req.params;
    try {
      const updateEnvironmentParams = generateUpdateEnvironmentParams(req.params.name, {
        status: 'MARKED',
        tableName: tableName,
      })
      await dynamoDb.send(new UpdateItemCommand(updateEnvironmentParams));
    } catch (err: any) {
      // Environment with the name does not exists
      if (err.name === 'ConditionalCheckFailedException') {
        res.status(404).end();
        return;
      }
      res.status(500).end();
      return;
    }
    res.status(202).end();

    const params = {
      Key: {
        "environment": {
          S: name,
        },
      },
      TableName: tableName,
      ConditionExpression: "attribute_exists(environment)", // Only delete if it exists
    }
    try {
      await dynamoDb.send(new DeleteItemCommand(params))
    } catch (err: any) {
      console.error(err);
      return;
    }
}
