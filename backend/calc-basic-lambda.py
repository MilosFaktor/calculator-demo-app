import json
import os

ORIGIN_V1_BASIC_CALCULATOR_PROD = os.environ['ORIGIN_V1_BASIC_CALCULATOR_PROD']
ORIGIN_V1_BASIC_CALCULATOR_DEV = os.environ['ORIGIN_V1_BASIC_CALCULATOR_DEV']
ORIGIN_V1_BASIC_CALCULATOR_DEV_LOCAL_HOST = os.environ['ORIGIN_V1_BASIC_CALCULATOR_DEV_LOCAL_HOST']


ALLOWED_ORIGINS = [
    ORIGIN_V1_BASIC_CALCULATOR_PROD,
    ORIGIN_V1_BASIC_CALCULATOR_DEV,
    ORIGIN_V1_BASIC_CALCULATOR_DEV_LOCAL_HOST
]

def lambda_handler(event, context):
    print("EVENT:", json.dumps(event))  # pretty 

    origin = event.get("headers", {}).get("origin")
    if origin in ALLOWED_ORIGINS:
        cors_origin = origin
    else:
        cors_origin = ALLOWED_ORIGINS[0]  # default to first allowed

     # Allow OPTIONS requests (CORS preflight) to pass through
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors_origin,
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
            },
            'body': json.dumps({'message': 'CORS preflight'})
        }
    
    headers = event.get('headers', {})
    
    # 1. Check User-Agent (block API tools)
    user_agent = headers.get('User-Agent', '').lower()
    blocked_agents = ['postman', 'insomnia', 'curl', 'wget', 'python-requests', 'httpie']
    
    if any(agent in user_agent for agent in blocked_agents):
        return {
            'statusCode': 403,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors_origin,
            },
            'body': json.dumps({'error': 'Browser access only 1'})
        }
    
    # 2. Require browser-like User-Agent
    browser_indicators = ['mozilla', 'chrome', 'safari', 'firefox', 'edge']
    if not any(browser in user_agent for browser in browser_indicators):
        return {
            'statusCode': 403,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': cors_origin,
            },
            'body': json.dumps({'error': 'Browser access only 2'})
        }

    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': cors_origin,
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, X-Origin-Verify'
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