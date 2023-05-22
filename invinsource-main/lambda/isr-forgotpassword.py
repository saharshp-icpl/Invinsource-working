import json
import boto3
client = boto3.client('pinpoint')
def lambda_handler(event, context):
    # TODO implement
    try:
        email=event['email']
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('user')
        response = table.get_item(
            Key={
                'email': email
               
            }
        )
        if 'Item' in response:
            user_data = response['Item']
            response = client.send_messages(
                ApplicationId="cc53a84ada96479eb00cffdabf417441",
                MessageRequest={
                    'Addresses': {
                        email: {
                            'ChannelType': 'EMAIL'
                        }
                    },
                    'MessageConfiguration': {
                        'EmailMessage': {
                            'FromAddress': 'bhavikp@infopercept.com',
                            'SimpleEmail': {
                                'Subject': {
                                    'Data': 'password'
                                },
                                'HtmlPart': {
                                    'Data': f"<p>Your Password is: {user_data['password']}</p><br><a href='https://invinsource.com/login'>Login please!</a>"
                                }
                            }
                        }
                    }
                }
            )
            return "Password Sent in Mail"
        else:
            return "Something wrong"
            
    except Exception as e:
        return {
            'statuscode':400,
            'Error':f"{e}"
        }
    
