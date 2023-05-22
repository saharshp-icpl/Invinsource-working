import json
import boto3
import json
from decimal import Decimal
dynamodb = boto3.resource('dynamodb')
client = boto3.client('dynamodb')
table = dynamodb.Table('User')
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)
def lambda_handler(event, context):
    try:
        identifier=event['identifier']
        try:
            token=event['token']
            key = {'Email': {'S': identifier}}
            response = dynamodb.get_item(
            TableName='User',Key=key)
            if 'Item' in response:
                item = response['Item']
                expected_token = item.get('logintoken', {}).get('S')
                if expected_token == token:
            
                    return {'message': 'Login successful'}
                return {'message': 'Login Fail'}
        except Exception as e:
            return {'statusCode': 400,'body': 'Provide token','exception':f'{e}'}
    
    except Exception as e:
        return 400
    