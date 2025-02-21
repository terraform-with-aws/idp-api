import { AttributeValue, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { AttributeValueObjectMap, Dictionary, Environment, EnvironmentStatus, UpdateEnvironmentStateOptions } from "../config/interfaces";

function convertDictionaryToAttributeValueObjectMap(obj: Record<string, any>): Record<string, AttributeValue> {
  const map: Record<string, AttributeValue> = {};
  
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      map[key] = { S: obj[key] };
    } else if (typeof obj[key] === "number") {
      map[key] = { N: obj[key].toString() };
    } else if (typeof obj[key] === "boolean") {
      map[key] = { BOOL: obj[key] };
    } else if (Array.isArray(obj[key])) {
      map[key] = { L: obj[key].map((item) => ({ S: item.toString() })) };
    } else if (typeof obj[key] === "object") {
      map[key] = { M: convertDictionaryToAttributeValueObjectMap(obj[key]) };
    }
  }

  return map;
}

export function formatEnvironmentForDynamoDB(environment: Environment) {
    return {
      environment: { S: environment.environment },
      stack: { S: environment.stack },
      status: { S: environment.status },
      config: { M: convertDictionaryToAttributeValueObjectMap(environment.config) },
      note: { S: environment.note || "" },
    };
  }
  

  export function formatDynamoDBEnvironmentForResponse(item: { [key: string]: AttributeValue }): Environment {
    return {
      environment: item.environment.S!,
      stack: item.stack.S!,
      status: item.status.S as EnvironmentStatus,
      config: convertAttributeValueObjectMapToDictionary(item.config.M),
      note: item.note?.S || '',
    }
  }

  export function convertAttributeValueObjectMapToDictionary(objectMap?: AttributeValueObjectMap): Dictionary {
    const output: Dictionary = {};
    if (typeof objectMap === "object" && objectMap !== null) {
      Object.entries(objectMap).map(([key, val]) => {
        output[key] = val.S || ''
      })
    }
    return output;
  }



export function generateUpdateEnvironmentParams(environment: string, options: UpdateEnvironmentStateOptions): UpdateItemCommandInput {
  return {
    ExpressionAttributeNames: {
      "#S": "status",
      "#N": "note",
    }, 
    ExpressionAttributeValues: {
      ":s": {
        S: options.status
      },
      ":n": {
        S: options.note || ''
      }
    }, 
    Key: {
      "environment": {
        S: environment,
      }
    },
    TableName: options.tableName,
    UpdateExpression: "SET #S = :s, #N = :n",
    ConditionExpression: "attribute_exists(environment)",
    ReturnValues: 'ALL_NEW',
  }
}