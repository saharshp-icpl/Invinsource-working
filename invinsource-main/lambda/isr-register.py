import boto3
import json
import random
import datetime
import time
import string

dynamodb = boto3.resource('dynamodb')
table_name = 'user'
client = boto3.client('pinpoint')

def get_random_string():
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(8))
    return result_str

def lambda_handler(event, context):
    
    try:
        name=event["name"]
        phone=event["phone"]
        email=event["email"]
        nda=event['nda']
        work_exprience=event['work_experience']
        bg_test=event['bg_test']
        apt_test=event['apt_test']
        technical_experience=event['technical_experience']
        meta=event['meta']
        table = dynamodb.Table(table_name)
        
        response = table.get_item(Key={'email': email})
        if 'Item' in response:
            user_data = response['Item']
            return  {
                'status':400,
                'message':'You have already account please login'
              }
        else:
            default_ttl=1800
            password=get_random_string()
            item = {
                'username': name,
                'phone': phone,
                'email': email,
                'password':password,
                'nda':nda,
                'work_exprience':work_exprience,
                'bg_test':bg_test,
                'apt_test':apt_test,
                'currentdate':f"{datetime.date.today()}",
                'updatedate':f"{datetime.date.today()}",
                'userstatus':True,
                'userrole':'user',
                'logintoken':'',
                'expirationtime': '',
                'technical_experience':technical_experience,
                'meta':meta
                
                
            }
            table.put_item(Item=item)
            # Send email using pinpoint
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
                                        'Data': f"<H1>Welcome to INVINSOURCE</H1><br><p>Your Password is: {password}</p><br><a href='https://invinsource.com/login'>Login please!</a> "
                                    }
                                }
                            }
                        }
                    }
                )
        # parse x:
            # y = event["body"]
            return {
                'name': name,
                'phone':phone,
                'email':email
              
            }
    except Exception as e:
        return {
            'status':400,
            'body':'bad request',
            'error':f"{e}"
          
        }
    

"""    {
        "name":"Sandip",
        "phone":1234567890,
        "email":"tanksandip778@gmail.com",
        "nda":true,
        "work_experience":"abc",
        "bg_test":true,
        "apt_test":true,
        "technical_experience":"5 year",
        "meta":"metadata"
    }"""