from copy import deepcopy


def merge(list1:list, list2:list) -> list:

    return list(set(list1).union(set(list2)))


def parse_json(json_to_parse):
        
        DEFAULT_JSON ={
            "ClassName": "",
            "Endpoint": "",
            "Methods": []
        }
        
        new_json = []
        api_resources = json_to_parse["resources"]

        for resource in api_resources:
            new_resource = deepcopy(DEFAULT_JSON)
            new_resource["ClassName"] = resource["name"]
            new_resource["Endpoint"] = resource["subdomain"]

            if resource["isGet"]:
                get_method_config = resource["GetMethod"]
                new_resource["Methods"].append(get_method_config)

            if resource["isPost"]:
                post_method_config = resource["PostMethod"]
                new_resource["Methods"].append(post_method_config)
            if resource['isDelete']:
                            delete_method_config = resource['DeleteMethod']
                            new_resource["Methods"].append(delete_method_config)
            if resource['isPut']:
                put_method_config = resource['PutMethod']
                new_resource["Methods"].append(put_method_config)
            new_json.append(new_resource)

        return new_json


def generate_conditions(conditions:list) -> str:

    clause = []

    for condition in conditions:
        clause.append(condition['Column'] + ' = ' + "'" + condition['Value'] + "'")

    if not clause:
        return ''

    return ' WHERE ' + ' AND '.join(clause)


def generate_put_body(columns:list, values:list) -> str:

    body = []

    for column, value in zip(columns, values):
        body.append(column + ' = ' + value)

    if not body:
        return 'SET column = value'

    return 'SET ' + ', '.join(body)

     