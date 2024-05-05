import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "studentData";

export const handler = async (event, context) => {
   let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              studentid: event.studentid,
              name: event.name,
              student_class: event.student_class,
              age: event.age
            },
          })
        );
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

