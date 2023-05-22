import boto3
import random
import time
import string
def get_random_string():
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(8))
    return result_str
def lambda_handler(event, context):
    # Retrieve the email and password from the event payload
    try:
        email = event['email']
        password = event['password']
        key =event['email']
        # Connect to the DynamoDB table
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('user')
        
        # Retrieve the user data based on the email
        response = table.get_item(
            Key={
                'email': email
               
            }
        )
        # generate token and default expire time
        token=get_random_string()
        default_ttl=1800
        updatekey={
        'email': email}
        update_expression = 'SET logintoken = :logintoken,expirationtime= :expirationtime'
        expression_attribute_values = {':logintoken': token,
                                        ':expirationtime':int(time.time()) + default_ttl
        }
        # Verify the password
        if 'Item' in response:
            user_data = response['Item']
            if user_data['userstatus']=='true':
                if user_data['password'] == password:
                    
                        response = table.update_item(
                        
                        Key=updatekey,
                        UpdateExpression=update_expression,
                        ExpressionAttributeValues=expression_attribute_values
                        )
                        return {
                            'statusCode': 200,
                            'body': 'Login successful',
                            'token':token
                        }
                
                return {
                    'statusCode': 401,
                    'body': 'Invalid email or password'
                }
            else:
                return {
                    'statusCode': 401,
                    'body': 'user disable by admin'
                }
                
    except Exception as e:
        return {
            
            'statusCode': 400,
            'body': 'Bad request',
            'exception': f"{e}"
        }
    
    """{
    "email":"tanksandip778@gmail.com",
    "password":"pmpgymhy"
}"""