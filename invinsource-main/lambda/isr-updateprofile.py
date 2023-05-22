import json
import boto3
import datetime
import time
dynamodb = boto3.resource('dynamodb')
table_name = 'user'
def lambda_handler(event, context):
    # TODO implement
    try:
        
        name=event["name"]
        phone=event["phone"]
        email=event["email"]
        nda=event['nda']
        work_experience=event['work_experience']
        bg_test=event['bg_test']
        apt_test=event['apt_test']
        technical_experience=event['technical_experience']
        meta=event['meta']
        userrole=event['role']
        table = dynamodb.Table(table_name)
        response = table.get_item(
            Key={
                'email': email
               
            }
        )
        # set update key value 
        updatekey={
        'email': email}
        update_expression = 'SET username = :username,phone= :phone,nda=:nda,work_exprience=:work_exprience,bg_test=:bg_test,apt_test=:apt_test,updatedate=:updatedate,userrole=:userrole,technical_experience=:technical_experience,meta=:meta'
        expression_attribute_values = {':username': name,':phone':phone,':nda':nda,':work_exprience':work_experience,':bg_test':bg_test,':apt_test':apt_test,':updatedate':f"{datetime.date.today()}",':userrole':userrole,':technical_experience':technical_experience,':meta':meta
                                        
        }
        if 'Item' in response:
            user_data = response['Item']
            response = table.update_item(Key=updatekey,UpdateExpression=update_expression,ExpressionAttributeValues=expression_attribute_values)
            return {'statusCode': 200,'body': 'Update successful'}
        else:
            return {'statusCode': 400,'body': 'User Not Found'}
        
    except Exception as e:
        return  {'statusCode': 400,'body': 'bad request'}
    
