import json
import boto3

def lambda_handler(event, context):
    try:
        email=event['email']
        
        
        # Connect to the DynamoDB table
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('user')
        
        # Retrieve the user data based on the email
        response = table.get_item(
            Key={
                'email': email
               
            }
        )
        updatekey={
        'email': email}
        update_expression = 'SET userstatus = :status'
        expression_attribute_values = {':status': 'false'
                                        
        }
        if 'Item' in response:
            response = table.update_item(
                        
                        Key=updatekey,
                        UpdateExpression=update_expression,
                        ExpressionAttributeValues=expression_attribute_values
                        )
            return {
                            'statusCode': 200,
                            'body': 'successful'
                            
            }
        else:
            return {
                            'statusCode': 400,
                            'body': 'email address not found'
                        }
    except Exception as e:
        return {
            'status':400,
            'message':'bad request',
            'EXCEPTION':f"{e}"
        }