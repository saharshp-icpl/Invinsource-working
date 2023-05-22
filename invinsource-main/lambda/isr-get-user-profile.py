import json
import boto3
import json
import time
from decimal import Decimal
# Dynamodb connection
dynamodb = boto3.resource('dynamodb')
client = boto3.client('dynamodb')
table = dynamodb.Table('user')
# for fatch decimal number form database
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
            # Get item using email
            response = table.get_item(
            Key={
                'email': identifier
               
                }
            )
            # if item is there 
            if 'Item' in response:
                item = response['Item']
                expected_token = item['logintoken']
                if expected_token == token:
                    if(int(item['expirationtime'])>int(time.time())):
                        try:
                            email=event['email']
                            response = table.get_item(Key={'email': email})
                            if 'Item' in response:
                                user_data = response['Item']
                                if user_data['email'] == email:
                                    # store item data in item dictionary
                                    item={
                                        'email':user_data['email'],
                                        'account-create':user_data['currentdate'],
                                        'apt_test':user_data['apt_test'],
                                        'bg_test':user_data['bg_test'],
                                        'meta':user_data['meta'],
                                        'nda':user_data['nda'],
                                        'phone':user_data['phone'],
                                        'technical_experience':user_data['technical_experience'],
                                        'updatedate':user_data['updatedate'],
                                        'name':user_data['username'],
                                        'role':user_data['userrole'],
                                        'status':user_data['userstatus'],
                                        'work_exprience':user_data['work_exprience']
                                    }
                                    return {
                                        'statusCode': 200,
                                        'body': f'{item}'
                                            }
                                # if email is not in database for searching 
                                else:
                                    return {
                                        'statusCode': 200,
                                        'body': 'Email Not Found'
                                            }
                        # without filter get all data 
                        except Exception as e:
                            # response = table.scan()
                            response = client.scan(TableName='user')
                            items = response['Items']
                            for item in items:
                                if 'password' in item:
                                    del item['password']
                                    del item['logintoken']
                            return {
                            'statusCode': 200,
                            'body': items,
                            'exception':f"{e}"
                            
                            }
                        return {'message': 'Login successful'}
                    # if login token expire
                    else:
                        return {'message':'token expire'}
                # if login token not valid
                return {'message': 'Invalid token'}
            # email address not avalible in database
            else:
                return {'message': 'Invalid Email Address'}
        #token is not provided
        except Exception as e:
            return {'statusCode': 400,'body': 'Provide token','exception':f'{e}'}
    # if token or email not provided
    except Exception as e:
        return {'statusCode': 400,'body': 'bad request'}
    