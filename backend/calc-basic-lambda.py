import json
import os

ORIGIN_V1_BASIC_CALCULATOR = os.environ['ORIGIN_V1_BASIC_CALCULATOR']

def lambda_handler(event, context):
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ORIGIN_V1_BASIC_CALCULATOR,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    }
    try:
        # Determine HTTP method
        http_method = event.get('httpMethod', 'GET').upper()
        
        # Handle POST: calculator logic
        if http_method == 'POST':
            # For POST, parameters are in the body as a JSON string
            if event.get('body'):
                params = json.loads(event['body'])
            else:
                params = event.get('queryStringParameters')
            
            if not params:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'Missing parameters'}),
                    'headers': headers
                }
            
            a = float(params.get('a'))
            b = float(params.get('b'))
            op = params.get('operation')
            
            if op == 'add':
                result = a + b
            elif op == 'subtract':
                result = a - b
            elif op == 'multiply':
                result = a * b
            elif op == 'divide':
                if b == 0:
                    return {
                        'statusCode': 400,
                        'body': json.dumps({'error': 'Division by zero'}),
                        'headers': headers
                    }
                result = a / b
            else:
                return {
                    'statusCode': 400,
                    'body': json.dumps({'error': 'Invalid operation'}),
                    'headers': headers
                }
            
            return {
                'statusCode': 200,
                'body': json.dumps({'result': result}),
                'headers': headers
            }
        
        # Handle GET: return Lambda/API Gateway context info
        elif http_method == 'GET':
            function_name = context.function_name
            function_version = context.function_version
            domain_name = event.get('requestContext', {}).get('domainName', 'api.example.com')
            stage = event.get('requestContext', {}).get('stage', 'v1')
            resource_path = event.get('requestContext', {}).get('resourcePath', '/basic-calc')
            alias = stage.upper()
            api_endpoint = f"{domain_name}/{stage}{resource_path}"
            body = f"This is {function_name} lambda called from API {api_endpoint} ... version: {function_version} with {alias} Alias!"
            return {
                'statusCode': 200,
                'body': json.dumps({'message': body}),
                'headers': headers
            }
        else:
            return {
                'statusCode': 405,
                'body': json.dumps({'error': 'Method Not Allowed'}),
                'headers': headers
            }
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Something went wrong', 'details': str(e)}),
            'headers': headers
        }