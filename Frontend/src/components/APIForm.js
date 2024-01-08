
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Label, FormGroup, Button, FormFeedback, Alert } from 'reactstrap';
import axios from 'axios';
import './apiform.css';
import TooltipButton from './TooltipButton';
import 'react-multi-carousel/lib/styles.css';

export const FormularioAPI = () => {
    const initialState = {
        apiName: '',
        resources: [{
            isGet: false,
            isPost: false,
            isPut: false,
            isDelete: false,
            name: '',
            subdomain: '/',
            GetMethod: {
                Type: 'get',
                Source: '',
                MethodConfig: {
                    Json: {
                        Dir: '',
                        Param:''
                    },
                    Sql: {
                        DbName: '',
                        Username: '',
                        Password: '',
                        Ip: '',
                        Port: '',
                        Columns: [''],
                        Table: '',
                        Conditions: [
                            {
                            
                                Column: '',
                                Value: ''
                            } 
                        ]

                    },
                    Raw: {
                        Param: ''
                    }
                }
            },
            PostMethod: {
                Type: 'post',
                Source: '',
                MethodConfig: {
                    Json: {
                        Dir: ''
                    },
                    Sql: {
                        DbName: '',
                        Username: '',
                        Password: '',
                        Ip: '',
                        Port: '',
                        Columns: [''],
                        Table: '',
                        Values: [''],
                        Conditions: [
                            {
                            
                                Column: '',
                                Value: ''
                            } 
                        ]

                    },
                    Raw: {
                        Param: ''
                    }
                }
            },
            PutMethod: {
                Type: 'put',
                Source: '',
                MethodConfig: {
                    Json: {
                        Dir: ''
                    },
                    Sql: {
                        DbName: '',
                        Username: '',
                        Password: '',
                        Ip: '',
                        Port: '',
                        Columns: [''],
                        Values: [''],
                        Table: '',
                        Conditions: [
                            {
                            
                                Column: '',
                                Value: ''
                            } 
                        ]
                    },
                    Raw: {
                        Param: ''
                    }
                }
            },
            DeleteMethod: {
                Type: 'delete',
                Source: '',
                MethodConfig: {
                    Json: {
                        Dir: ''
                    },
                    Sql: {
                        DbName: '',
                        Username: '',
                        Password: '',
                        Ip: '',
                        Port: '',
                        Columns: [''],
                        Values:[''],
                        Table: '',
                        Conditions: [
                            {
                                Column: '',
                                Value: ''
                            }
                        ]
                    },
                    Raw: {
                        Param: ''
                    }
                }
            }

        }],
        invalidAPIName: false,
    };
    const formRef = useRef(null);
    const [data, setData] = useState(initialState);
    const [resources, setResources] = useState([initialState]);
    const [allValidFields, setAllValidFields] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [state, setState] = useState(initialState);
    // const [popoverOpen, setPopoverOpen] = React.useState(false);
    // const [currentConditionIndex, setCurrentConditionIndex] = React.useState(null);
    // const [validFields, setValidFields] = useState({
    //     Name: false,
    //     Subdomain: false,
    //     Source: false,
    //     Dir: false,
    //     Param: false,
    //     DbName: false,
    //     Username: false,
    //     Password: false,
    //     Ip: false,
    //     Port: false,
    //     Columns: false,
    //     Table: false,
    //     Values: false,
    // });
        
	const expresiones = {
		Name: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		Subdomain: /^\/[\w\d\s\S]*$/, 
        Source: /^[a-zA-Z0-9!@#$%^&*()_\-+=<>?/[\]{},.|~]+$/, // Letras numeros caracteres especiales
        Dir: /^[a-zA-Z0-9!@#$%^&*()_\-+=<>?/[\]{},.|~]+$/,
        Param:/^[a-zA-Z0-9_-]{4,16}$/,
        DbName:/^[a-zA-Z0-9_-]{4,16}$/,
        Username:/^[a-zA-Z0-9_-]{4,16}$/,
        Password: /^[a-zA-Z0-9!@#$%^&*()_\-+=<>?/[\]{},.|~]+$/,
        Ip:/^[a-zA-Z0-9!@#$%^&*()_\-+=<>?/[\]{},.|~]+$/,
        Port: /^[a-zA-Z0-9!@#$%^&*()_\-+=<>?/[\]{},.|~]+$/,
        Columns:/^[a-zA-Z0-9_-]{4,16}$/,
        Table:/^[a-zA-Z0-9_-]{4,16}$/,
        Values:/^[a-zA-Z0-9_-]{4,16}$/,
	}

    const reiniciarFormulario = () => {
        setData(initialState);
        setFormSubmitted(false);
        setAllValidFields(true);
    }
    const validateFields = () => {
        let allFieldsFilled = true;
        let allFieldsValid = true;
    
        if (!data.apiName) {
            allFieldsFilled = false;
        } else if (!expresiones.name.test(data.apiName)) {
            allFieldsValid = false;
        }
    
        data.resources.forEach(resource => {
            for (let key in resource) {
                if (!resource[key]) {
                    allFieldsFilled = false;
                } else if (expresiones[key] && !expresiones[key].test(resource[key])) {
                    allFieldsValid = false;
                }
            }
        });
    
        setAllValidFields(allFieldsFilled && allFieldsValid);
    }
        useEffect(() => {
        if(formSubmitted) validateFields();
    }, [data, formSubmitted]);

    const onChange = (e, index) => {
        const { name, value } = e.target;
        let resourcesCopy = [...data.resources];
      
        if (["isGet", "isPost", "isPut", "isDelete"].includes(name)) {
          resourcesCopy[index][name] = e.target.checked;
      
          // Refactorización de la lógica de métodos
          const methods = ["GET", "POST", "PUT", "DELETE"];
          const activeMethods = methods.filter(method => resourcesCopy[index]["is" + method]);
          resourcesCopy[index].method = activeMethods.join(',');
      
        } else {
          if (name === 'subdomain') {
            // Asegurarse de que siempre comience con "/"
            const newValue = value.startsWith('/') ? value : `/${value}`;
            resourcesCopy[index][name] = newValue;
          } else {
            resourcesCopy[index][name] = value;
          }
        }
      
        setData(prevState => ({ ...prevState, resources: resourcesCopy }));
      };
      
    const methodChange = (e, index, method, param, conditionIndex) => {
        const { name, value } = e.target;
        let resourcesCopy = [...data.resources];
            switch(method){
                case 'get':
                    switch(param){
                        case 'source':
                            resourcesCopy[index].GetMethod.Source = e.target.value;
                            break;

                        case 'dir':
                            resourcesCopy[index].GetMethod.MethodConfig.Json.Dir = e.target.value
                            break;

                        case 'param':
                            resourcesCopy[index].GetMethod.MethodConfig.Json.Param = e.target.value
                            break;

                        case 'dbname':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.DbName = value
                            break;

                        case 'username':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Username = value
                            break;
                            
                        case 'password':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Password = value
                            break;

                        case 'ip':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Ip = value
                            break;

                        case 'port':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Port = value
                            break;

                        case 'columns':
                            const columnsArray = value.split(',').map(item => item.trim());
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Columns = columnsArray;
                            break;

                        case 'table':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Table = value
                            break;
                        case 'conditions':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Conditions = value
                            break;
                                
                        case 'column':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Conditions[conditionIndex].Column = value
                            break;

                        case 'value':
                            resourcesCopy[index].GetMethod.MethodConfig.Sql.Conditions[conditionIndex].Value = value
                            break;
    
                        case 'rawparam':
                            resourcesCopy[index].GetMethod.MethodConfig.Raw.Param = value
                            break;

                    
                    }
                    break;
                case 'post':
                    switch(param){
                        case 'source':
                            resourcesCopy[index].PostMethod.Source = value
                            break;

                        case 'dir':
                            resourcesCopy[index].PostMethod.MethodConfig.Json.Dir = value
                            break;

                        case 'param':
                            resourcesCopy[index].PostMethod.MethodConfig.Json.Param = value
                            break;

                        case 'dbname':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.DbName = value
                            break;

                        case 'username':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Username = value
                            break;
                            
                        case 'password':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Password = value
                            break;

                        case 'ip':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Ip = value
                            break;

                        case 'port':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Port = value
                            break;

                        case 'table':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Table = value
                            break;

                        case 'columns':
                            const columnsArray = value.split(',').map(item => item.trim());
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Columns = columnsArray;
                            break;

                        case 'values':
                            const valuesArray = value.split(',').map(item => item.trim());
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Values = valuesArray;
                            break;
                            
                        case 'conditions':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Conditions = value
                            break;
                            
                        case 'column':
                                resourcesCopy[index].PostMethod.MethodConfig.Sql.Conditions[conditionIndex].Column = value
                                break;                                                               
                        case 'value':
                            resourcesCopy[index].PostMethod.MethodConfig.Sql.Conditions[conditionIndex].Value = value
                            break;

                        case 'rawparam':
                            resourcesCopy[index].PostMethod.MethodConfig.Raw.Param = value
                            break;
                    
                    }
                    break;
                    case 'put':
                        switch(param){
                            case 'source':
                                resourcesCopy[index].PutMethod.Source = value
                                break;
    
                            case 'dir':
                                resourcesCopy[index].PutMethod.MethodConfig.Json.Dir = value
                                break;
    
                            case 'param':
                                resourcesCopy[index].PutMethod.MethodConfig.Json.Param = value
                                break;
    
                            case 'dbname':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.DbName = value
                                break;
    
                            case 'username':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Username = value
                                break;
                                
                            case 'password':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Password = value
                                break;
    
                            case 'ip':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Ip = value
                                break;
    
                            case 'port':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Port = value
                                break;
    
                            // case 'columns':
                            //     resourcesCopy[index].PutMethod.MethodConfig.Sql.Columns = value
                            //     break;
                            // case 'values':
                            //     resourcesCopy[index].PutMethod.MethodConfig.Sql.Values = value
                            //     break;
                            case 'columns':
                                const columnsArray = value.split(',').map(item => item.trim());
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Columns = columnsArray;
                                break;

                            case 'values':
                                const valuesArray = value.split(',').map(item => item.trim());
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Values = valuesArray;
                                break;
                            
                            case 'table':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Table = value
                                break;
    
                            case 'conditions':
                                resourcesCopy[index].PutMethod.MethodConfig.Sql.Conditions = value
                                break;
                                
                            case 'column':
                                    resourcesCopy[index].PutMethod.MethodConfig.Sql.Conditions[conditionIndex].Column = value
                                    break;
                                                               

                            case 'value':
                                    resourcesCopy[index].PutMethod.MethodConfig.Sql.Conditions[conditionIndex].Value = value
                                    break;
    
                            case 'rawparam':
                                resourcesCopy[index].PutMethod.MethodConfig.Raw.Param = value
                                break;
                        
                        }
                        break;
                        case 'delete':
                            switch(param){
                                case 'source':
                                    resourcesCopy[index].DeleteMethod.Source = value
                                    break;
        
                                case 'dir':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Json.Dir = value
                                    break;
        
                                case 'param':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Json.Param = value
                                    break;
        
                                case 'dbname':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.DbName = value
                                    break;
        
                                case 'username':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Username = value
                                    break;
                                    
                                case 'password':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Password = value
                                    break;
        
                                case 'ip':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Ip = value
                                    break;
        
                                case 'port':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Port = value
                                    break;
        
                                case 'columns':
                                        const columnsArray = value.split(',').map(item => item.trim());
                                        resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Columns = columnsArray;
                                    break;
        
                                case 'values':
                                        const valuesArray = value.split(',').map(item => item.trim());
                                        resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Values = valuesArray;
                                    break;
                                    
                
                                case 'table':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Table = value
                                    break;
        
                                case 'conditions':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Conditions = value
                                    break;
                                
                                case 'column':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Conditions[conditionIndex].Column = value
                                    break;
                                                               

                                case 'value':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Sql.Conditions[conditionIndex].Value = value
                                    break;

                                case 'rawparam':
                                    resourcesCopy[index].DeleteMethod.MethodConfig.Raw.Param = value
                                    break;
                            
                            }
                            break;
            
            }
        setData(prevState => ({ ...prevState, resources: resourcesCopy }));
    };

    const addResource = () => {
        setData(prevState => ({ 
            ...prevState, 
            resources: [
                ...prevState.resources, 
                {
                    isGet: false,
                    isPost: false,
                    isPut: false,
                    isDelete: false,
                    name: '',
                    subdomain: '',
                    GetMethod: {
                        Type: 'get',
                        Source: '',
                        MethodConfig: {
                            Json: {
                                Dir: '',
                                Param:''
                            },
                            Sql: {
                                DbName: '',
                                Username: '',
                                Password: '',
                                Ip: '',
                                Port: '',
                                Columns: [''],
                                Table: '',
                                Conditions: [
                                    {
                                    
                                        Column: '',
                                        Value: ''
                                    } 
                                ]
        
                            },
                            Raw: {
                                Param: ''
                            }
                        }
                    },
                    PostMethod: {
                        Type: 'post',
                        Source: '',
                        MethodConfig: {
                            Json: {
                                Dir: ''
                            },
                            Sql: {
                                DbName: '',
                                Username: '',
                                Password: '',
                                Ip: '',
                                Port: '',
                                Columns: [''],
                                Table: '',
                                Values: [''],
                                Conditions: [
                                    {
                                    
                                        Column: '',
                                        Value: ''
                                    } 
                                ]
        
                            },
                            Raw: {
                                Param: ''
                            }
                        }
                    },
                    PutMethod: {
                        Type: 'put',
                        Source: '',
                        MethodConfig: {
                            Json: {
                                Dir: ''
                            },
                            Sql: {
                                DbName: '',
                                Username: '',
                                Password: '',
                                Ip: '',
                                Port: '',
                                Columns: [''],
                                Values: [''],
                                Table: '',
                                Conditions: [{
                                    
                                        Column: '',
                                        Value: ''
                                    
                            }],
                                    },
                            Raw: {
                                Param: ''
                            }
                        }
                    },
                    DeleteMethod: {
                        Type: 'delete',
                        Source: '',
                        MethodConfig: {
                            Json: {
                                Dir: ''
                            },
                            Sql: {
                                DbName: '',
                                Username: '',
                                Password: '',
                                Ip: '',
                                Port: '',
                                Columns: [''],
                                Table: '',
                                Values:[''],
                                Conditions: [
                                    {
                                        Column: '',
                                        Value: ''
                                    }
                                ],
                                    },
                            Raw: {
                                Param: ''
                            }
                        }
                    }

                }
             ]
        }));
    };
    
    const removeResource = index => {
        let resourcesCopy = [...data.resources];
    
        // Si hay solo un recurso, evitamos su eliminación.
        if (resourcesCopy.length <= 1) {
            return; // Simplemente salimos de la función sin hacer nada.
        }
    
        resourcesCopy.splice(index, 1);
        setData(prevState => ({ ...prevState, resources: resourcesCopy }));
    };
    const addCondition = (resourceIndex, methodType) => {
        // Clonamos el estado actual para no mutarlo directamente
        const currentState = {...state};
        
        // Crear un nuevo objeto Condition con valores predeterminados
        const newCondition = 
            {
            Column: '',
            Value: ''
        }
        ;
        
        // Añadir el nuevo objeto Condition al array de Conditions correspondiente
        if (methodType === 'put') {
            currentState.resources[resourceIndex].PutMethod.MethodConfig.Sql.Conditions.push(newCondition);
        }if (methodType === 'delete') {
            currentState.resources[resourceIndex].DeleteMethod.MethodConfig.Sql.Conditions.push(newCondition);
        }if (methodType === 'post') {
            currentState.resources[resourceIndex].PostMethod.MethodConfig.Sql.Conditions.push(newCondition);
        }else if (methodType === 'get') {
            currentState.resources[resourceIndex].GetMethod.MethodConfig.Sql.Conditions.push(newCondition);
        }
        
        // Actualizar el estado
        setState(currentState);
    }
    
    const removeCondition = (resourceIndex, methodType, conditionIndex) => {
        // Clonamos el estado actual para no mutarlo directamente
        const currentState = {...state};
        
        let conditionsArray;
    
        if (methodType === 'put') {
            conditionsArray = currentState.resources[resourceIndex].PutMethod.MethodConfig.Sql.Conditions;
        } else if (methodType === 'delete') {
            conditionsArray = currentState.resources[resourceIndex].DeleteMethod.MethodConfig.Sql.Conditions;
        } else if (methodType === 'post') {
            conditionsArray = currentState.resources[resourceIndex].PostMethod.MethodConfig.Sql.Conditions;
        } else if (methodType === 'get') {
            conditionsArray = currentState.resources[resourceIndex].GetMethod.MethodConfig.Sql.Conditions;
        }
    
        // Solo eliminar la condición si hay más de una condición en el array
        if (conditionsArray.length > 1) {
            conditionsArray.splice(conditionIndex, 1);
        } else {

        }
        
        // Actualizar el estado
        setState(currentState);
    }
            
    const enviarAlaBD = async e => {
        e.preventDefault();
    
        // Verifica si los campos son válidos usando checkValidity
        if (formRef.current && formRef.current.checkValidity()) {
            console.log("Se envian los datos " + JSON.stringify(data));
            
            try {
                const response = await axios.post('http://127.0.0.1:5001/form', data);
                
                // Crear un Blob con el contenido de response.data
                const blob = new Blob([response.data], { type: 'text/x-python' });
                
                // Crear un enlace para descargar el Blob
                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = 'APIzzy.py';
                
                // Adjuntar el enlace al documento y hacer clic en él para iniciar la descarga
                document.body.appendChild(downloadLink);
                downloadLink.click();
                
                // Limpiar: eliminar el enlace del documento
                document.body.removeChild(downloadLink);
                
                // Reiniciar el formulario después de enviarlo
                reiniciarFormulario();
                
            } catch (error) {
                console.error('Error al hacer la petición:', error.response ? error.response : error);
            }
        } else {
            console.error("Hay campos inválidos o incompletos.");
        }
    }
        

    return (
      <section id="FormAPI">

        <div className="container">
            <div className="row">
                <div className="col-50">
                    <div className="form-container">

                        <Row>
                            <Col xs="3"></Col>
                            <Col xs="6">
                                <h2>Formulario APIzzy</h2>

                                <Button color="warning" onClick={reiniciarFormulario} style={{ marginBottom: '20px' }}>Reiniciar</Button>
                                {/* {!allValidFields && formSubmitted && <Alert color="danger">Por favor, rellena todos los campos.</Alert>} */}
                                {formSubmitted && allValidFields && <Alert color="success">¡API creada con éxito!</Alert>}
                                <Form innerRef={formRef} onSubmit={enviarAlaBD}>
                                    <Button onClick={addResource}>Agregar recurso </Button>

                                    {data.resources.map((resource, index) => (
                                        <div key={index}>

                                            <h4>
                                                Recurso {index + 1}
                                                {index !== 0 && 

                                                    <Button color="danger" onClick={() => removeResource(index)} style={{ marginLeft: '10px' }}>Eliminar</Button>

                                                }
                                            </h4>
                                            <FormGroup>
                                                <Label>Nombre del recurso:</Label>
                                                <div className="d-flex align-items-center">
                                                    <Input 
                                                        type="text" 
                                                        name="name" 
                                                        value={resource.name} 
                                                        onChange={e => onChange(e, index)} 
                                                        pattern="^[a-zA-Z][a-zA-Z0-9_]{3,16}$"
                                                        required
                                                        className='mi-input-customizado'
                                                        placeholder='ejm_Users'
                                                        invalid={!new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,16}$").test(resource.name) && formSubmitted}

                                                    />
                                                    <TooltipButton id="nombre_recurso" tooltipText="Nombre al que se le quiere colocar al recurso." />
                                                    <FormFeedback>El formato del nombre del recurso es inválido o el campo está vacío.</FormFeedback>
                                                </div>
                                            </FormGroup>                         
                                            <FormGroup >
                                                <Label>Subdominio (path):</Label>
                                                <div className="d-flex align-items-center">
                                                    <Input 
                                                        required
                                                        type="text" 
                                                        name="subdomain" 
                                                        value={resource.subdomain} 
                                                        onChange={e => onChange(e, index)}
                                                        pattern="^\/[a-zA-Z0-9_]+$"  // Comienza con '/' seguido por cualquier combinación de letras, números, y guiones bajos
                                                        invalid={!new RegExp("^\/[a-zA-Z0-9_]+$").test(resource.subdomain) && formSubmitted}
                                                    />
                                                    <TooltipButton id="sub_recurso" tooltipText="El Subdominio siempre comienza con un '/' y es el path. Un ejemplo '/dominio'." />
                                                    <FormFeedback>El formato del subdominio es inválido.</FormFeedback>
                                                </div>
                                            </FormGroup>
                                                                
                                                     <FormGroup check inline>

                                                        <Label check>
                                                            <Input 
                                                                type="checkbox" 
                                                                name="isGet" 
                                                                checked={resource.isGet} 
                                                                onChange={e => onChange(e, index)} 
                                                                
                                                            />
                                                            GET
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Label check>
                                                            <Input 
                                                                type="checkbox" 
                                                                name="isPost" 
                                                                checked={resource.isPost} 
                                                                onChange={e => onChange(e, index)} 
                                                                
                                                            />
                                                            POST
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Label check>
                                                            <Input 
                                                                type="checkbox" 
                                                                name="isPut" 
                                                                checked={resource.isPut} 
                                                                onChange={e => onChange(e, index)} 
                                                                
                                                            />
                                                            PUT
                                                        </Label>
                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Label check>
                                                            <Input 
                                                                type="checkbox" 
                                                                name="isDelete" 
                                                                checked={resource.isDelete} 
                                                                onChange={e => onChange(e, index)} 
                                                                
                                                            />
                                                            DELETE
                                                        </Label>
                                                    </FormGroup>


                                            {resource.isGet && (
                                                <div>
                                                    <h5>Detalles GET</h5>
                                                    <FormGroup>

                                                        <Label>Source:</Label>
                                                    <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="select" 
                                                                name="source" 
                                                                value={resource.GetMethod.Source}
                                                                onChange={e => methodChange(e, index, 'get', 'source')}
                                                                required
                                                                // invalid={!resource.source && formSubmitted}
                                                            >
                                                                <option value="">Selecciona una fuente</option>
                                                                <option value="Json">JSON</option>
                                                                <option value="Sql">SQL</option>
                                                                <option value="Raw">RAW</option>

                                                            </Input>
                                                        <TooltipButton id="source_get" tooltipText="El source es la estructura en que estan los datos." />
                                                        <FormFeedback>Elige un source.</FormFeedback>
                                                    </div>
                                                    {/* <FormFeedback>Este campo es obligatorio al seleccionar GET</FormFeedback> */}
                                                </FormGroup>
                                                </div>
                                            )}
                                            {resource.isGet && resource.GetMethod.Source === "Json" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Ubicación del JSON:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="jsonLocation" 
                                                                    value={resource.GetMethod.MethodConfig.Json.Dir} 
                                                                    onChange={e => methodChange(e, index, 'get', 'dir')}
                                                                    pattern='^[^:?*"<>\|]+$'
                                                                    required
                                                                    invalid={!new RegExp("^[^:?*\"<>|]+$").test(resource.GetMethod.MethodConfig.Json.Dir) && formSubmitted}
                                                                    />
                                                            <TooltipButton id="json_get_location" tooltipText="La ubicación del json." />
                                                            <FormFeedback>El formato es inválido o esta vacio el campo.</FormFeedback>
                                                        </div>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label>Key (parámetro):</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="jsonKey" 
                                                                value={resource.GetMethod.MethodConfig.Json.Param} 
                                                                onChange={e => methodChange(e, index, 'get', 'param')} 
                                                                required
                                                                pattern="^[a-zA-Z][a-zA-Z0-9_]{3,16}$"
                                                                // className='mi-input-customizado'
                                                                // placeholder='ejm_Users'
                                                                invalid={!new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,16}$").test(resource.GetMethod.MethodConfig.Json.Param) && formSubmitted}
                                                                    />
                                                            <TooltipButton id="json_get_key" tooltipText="Una key de JSON se refiere al identificador único utilizado en un par clave-valor dentro de un objeto JSON para representar la propiedad o nombre del dato deseado." />
                                                            <FormFeedback>El formato es inválido o el campo está vacío.</FormFeedback>
                                                        </div>
                                                    </FormGroup>
                                                </>
                                            )}
                                            {resource.isGet && resource.GetMethod.Source === "Raw" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Prametro del Raw:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="rawparam" 
                                                                value={resource.GetMethod.MethodConfig.rawparam} 
                                                                // onChange={e => onChange(e, index)} 
                                                                onChange={e => methodChange(e, index, 'get', 'rawparam')}
                                                                // invalid={!resource.jsonLocation && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                            <TooltipButton id="raw_get_param" tooltipText="Un Parámetro del RAW se refiere a un valor o dato sin procesar que se pasa a una función o sistema, generalmente sin estar estructurado o filtrado." />

                                                        </div>
                                                    </FormGroup>
                                                        </>
                                            )}
                                            {resource.isGet && resource.GetMethod.Source === "Sql" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Nombre de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">
                                                            <Input 
                                                                type="text" 
                                                                name="dbName" 
                                                                value={resource.GetMethod.MethodConfig.Sql.DbName} 
                                                                onChange={e => methodChange(e, index, 'get', 'dbname')}
                                                                
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_get_dbName" tooltipText="En este campo se debe de ingresar el nombre de la base de datos en SQL al cual se le quiere realizar un método get." />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label> Username:</Label>
                                                        <div className="d-flex align-items-center">
                                                            <Input 
                                                                type="text" 
                                                                name="username" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Username} 
                                                                onChange={e => methodChange(e, index, 'get', 'username')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_username" tooltipText="En este campo se debe de ingresar el username de la base de datos en SQL al cual se le quiere realizar un método get." />

                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label>Password del Username:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="password" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Password} 
                                                                onChange={e => methodChange(e, index, 'get', 'password')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_password" tooltipText="En este campo se debe de ingresar el password del username de la base de datos en SQL al cual se le quiere realizar un método get." />
                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque la Ip de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="ip" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Ip} 
                                                                onChange={e => methodChange(e, index, 'get', 'ip')}
                                                                pattern="((([0-9]{1,4})\.){3})[0-9]{1,4}" 
                                                                required
                                                                className='mi-input-customizado'
                                                                placeholder='ejemplo= 192.0.8.32'
                                                                invalid={!new RegExp("((([0-9]{1,4})\.){3})[0-9]{1,4}").test(resource.GetMethod.MethodConfig.Sql.Ip) && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_ip" tooltipText="En este campo se debe de ingresar el ip de la base de datos en SQL al cual se le quiere realizar un método get." />
                                                            <FormFeedback>El formato es inválido o el campo está vacío.</FormFeedback>

                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque el puerto:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="port" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Port} 
                                                                onChange={e => methodChange(e, index, 'get', 'port')}
                                                                pattern='^\d{1,15}$'      
                                                                invalid={!new RegExp("^\d{1,15}$").test(resource.GetMethod.MethodConfig.Sql.Port) && formSubmitted}
                                                       
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_port" tooltipText="En este campo se debe de ingresar el port de la base de datos en SQL al cual se le quiere realizar un método get." />
                                                            <FormFeedback>El formato del puerto es inválido.</FormFeedback>

                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de la Tabla en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="table" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Table} 
                                                                onChange={e => methodChange(e, index, 'get', 'table')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_table" tooltipText="En este campo se debe de ingresar el nombre de la tabla base de datos en SQL al cual se le quiere realizar un método get." />

                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    
                                                    <FormGroup>
                                                        <Label>Nombre de la Columnas en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="dbName" 
                                                                value={resource.GetMethod.MethodConfig.Sql.Columns} 
                                                                onChange={e => methodChange(e, index, 'get', 'columns')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_get_colums" tooltipText="En este campo se debe de ingresar las columnas, separadas por ',' de la base de datos de SQL al cual se le quiere realizar un método get." />
                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                
                                                    </FormGroup>
                                                    <FormGroup>

                                                        <Button className="customButton" onClick={() => addCondition(index, 'get')}>Agregar Condición</Button>
                                                    </FormGroup>

                                                    {resource.GetMethod.MethodConfig.Sql.Conditions.map((condition, conditionIndex) => (
                                                        <FormGroup key={conditionIndex}> 

                                                            <div className='containerConditions' >

                                                                <Label>Condición {conditionIndex + 1}</Label>
                                                                <TooltipButton marginTop="10px" id="sql_get_conditions" tooltipText="En las conditions, puedes agregar tantas condiciones desees presionando el boton de 'Agregar condición', solo debes de colocar la columna y el valor." />


                                                            </div>
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Columna"
                                                                    value={condition.Column}
                                                                    onChange={e => methodChange(e, index, 'get', 'column', conditionIndex)}
                                                                />
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Valor"
                                                                    value={condition.Value}
                                                                    onChange={e => methodChange(e, index, 'get', 'value', conditionIndex)}
                                                                />
                                                                {conditionIndex !== 0 && 
                                                                    <Button onClick={() => removeCondition(index, 'get', conditionIndex)}>Eliminar Condición</Button>
                                                                }
                                                        </FormGroup>
                                                    ))}



                                                </>
                                            )}


                                            {resource.isPost && (
                                                <div>
                                                <h5>Detalles POST</h5>
                                                <FormGroup>
                                                <Label>Source:</Label>
                                                <div className="d-flex align-items-center">

                                                    <Input 
                                                        type="select" 
                                                        name="source" 
                                                        value={resource.PostMethod.Source}
                                                        onChange={e => methodChange(e, index, 'post', 'source')}
                                                        required
                                                        // invalid={!resource.source && formSubmitted}
                                                    >
                                                        <option value="">Selecciona una fuente</option>
                                                        <option value="Json">JSON</option>
                                                        <option value="Sql">SQL</option>
                                                        <option value="Raw">RAW</option>

                                                    </Input>
                                                    <TooltipButton id="post_source" tooltipText="El source es la estructura en que estan los datos." />
                                                    <FormFeedback>Elige un source.</FormFeedback>

                                                </div>
                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar GET</FormFeedback> */}
                                            </FormGroup>
                                            </div>
                                            )}
                                            {resource.isPost && resource.PostMethod.Source === "Sql" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Nombre de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="dbName" 
                                                                value={resource.PostMethod.MethodConfig.Sql.DbName} 
                                                                onChange={e => methodChange(e, index, 'post', 'dbname')}
                                                                required
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_post_dbName" tooltipText="En este campo se debe de ingresar el nombre de la base de datos en SQL al cual se le quiere realizar un método post." />
                                                        </div>
                                                    </FormGroup>


                                                    <FormGroup>
                                                        <Label> Username:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="username" 
                                                                value={resource.PostMethod.MethodConfig.Sql.Username} 
                                                                onChange={e => methodChange(e, index, 'post', 'username')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_post_username" tooltipText="En este campo se debe de ingresar el username de la base de datos en SQL al cual se le quiere realizar un método post." />

                                                        </div>
                                                    </FormGroup>

                                                    {/*... (aquí puedes repetir la estructura para el resto de campos de SQL, como user, password, etc.)*/}
                                                    <FormGroup>
                                                        <Label>Password del Username:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="password" 
                                                                value={resource.PostMethod.MethodConfig.Sql.Password} 
                                                                onChange={e => methodChange(e, index, 'post', 'password')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_post_password" tooltipText="En este campo se debe de ingresar el password del username de la base de datos en SQL al cual se le quiere realizar un método post." />

                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque la Ip de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="ip" 
                                                                    value={resource.PostMethod.MethodConfig.Sql.Ip} 
                                                                    onChange={e => methodChange(e, index, 'post', 'ip')}
                                                                    pattern="((([0-9]{1,4})\.){3})[0-9]{1,4}"
                                                                    required
                                                                    className='mi-input-customizado'
                                                                    placeholder='ejemplo= 192.0.8.32'
                                                                    invalid={!new RegExp("((([0-9]{1,4})\.){3})[0-9]{1,4}").test(resource.PostMethod.MethodConfig.Sql.Ip) && formSubmitted}
    
                                                                    // invalid={!resource.dbName && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                                <TooltipButton id="sql_post_ip" tooltipText="En este campo se debe de ingresar el ip de la base de datos en SQL al cual 
                                                                se le quiere realizar un método post. Ejemplo 192.0.8.5 (entre 1 a 4 conjunto de numeros separados por punto)." />
                                                                <FormFeedback>El formato es inválido o el campo está vacío.</FormFeedback>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque el puerto:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="port" 
                                                                    value={resource.PostMethod.MethodConfig.Sql.Port} 
                                                                    onChange={e => methodChange(e, index, 'post', 'port')}
                                                                    pattern='^\d{1,15}$'      
                                                                    invalid={!new RegExp("^\d{1,15}$").test(resource.PostMethod.MethodConfig.Sql.Port) && formSubmitted}
    
                                                                    // invalid={!resource.dbName && formSubmitted}
                                                                />
                                                                <TooltipButton id="sql_post_port" tooltipText="En este campo se debe de ingresar el port de la base de datos en SQL al cual se le quiere realizar un método post." />
                                                                <FormFeedback>El formato del puerto es inválido.</FormFeedback>

                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de la Tabla en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="table" 
                                                                    value={resource.PostMethod.MethodConfig.Sql.Table} 
                                                                    onChange={e => methodChange(e, index, 'post', 'table')}
                                                                    // invalid={!resource.dbName && formSubmitted}
                                                                />
                                                                <TooltipButton id="sql_post_table" tooltipText="En este campo se debe de ingresar el nombre de la tabla base de datos en SQL al cual se le quiere realizar un método post." />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                        </div>
                                                    </FormGroup>
                                                    
                                                    <FormGroup>
                                                        
                                                        <Label>Nombre de la Columnas en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="columns" 
                                                                value={resource.PostMethod.MethodConfig.Sql.Columns} 
                                                                onChange={e => methodChange(e, index, 'post', 'columns')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_post_columns" tooltipText="En este campo se debe de ingresar el nombre de las columnas (varias), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de columnas debe ser igual a la de valores." />

                                                        </div>
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre del valor de la condicion en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="values" 
                                                                value={resource.PostMethod.MethodConfig.Sql.Values} 
                                                                onChange={e => methodChange(e, index, 'post', 'values')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_post_values" tooltipText="En este campo se debe de ingresar los vbalores (varios), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de valores debe ser igual a la de columnas." />
                                                        </div>
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                
                                                    <FormGroup>

                                                        <Button className="customButton" onClick={() => addCondition(index, 'post')}>Agregar Condición</Button>
                                                    </FormGroup>


                                                    {resource.PostMethod.MethodConfig.Sql.Conditions.map((condition, conditionIndex) => (
                                                        <FormGroup key={conditionIndex}> 

                                                            <div className='containerConditions' >

                                                                <Label>Condición {conditionIndex + 1}</Label>
                                                                <TooltipButton marginTop="10px" id="sql_post_conditions" tooltipText="En las conditions, puedes agregar tantas condiciones desees presionando el boton de 'Agregar condición', solo debes de colocar la columna y el valor." />


                                                            </div>
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Columna"
                                                                    value={condition.Column}
                                                                    onChange={e => methodChange(e, index, 'post', 'column', conditionIndex)}
                                                                />
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Valor"
                                                                    value={condition.Value}
                                                                    onChange={e => methodChange(e, index, 'post', 'value', conditionIndex)}
                                                                />
                                                                {conditionIndex !== 0 && 

                                                                    <Button onClick={() => removeCondition(index, 'post', conditionIndex)}>Eliminar Condición</Button>
                                                                }
                                                        </FormGroup>
                                                    ))}

                                                </>
                                            )}
                                            {resource.isPost && resource.PostMethod.Source === "Raw" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Prametro del Raw:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="rawparam" 
                                                                value={resource.PostMethod.MethodConfig.Raw.Param} 
                                                                // onChange={e => onChange(e, index)} 
                                                                onChange={e => methodChange(e, index, 'post', 'rawparam')}
                                                                // invalid={!resource.jsonLocation && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                            <TooltipButton id="raw_post_param" tooltipText="En este campo se debe de ingresar parametro del Raw." />

                                                        </div>
                                                    </FormGroup>
                                                        </>
                                            )}
                                            {resource.isPost && resource.PostMethod.Source === "Json" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Ubicación del JSON:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="jsonLocation" 
                                                                value={resource.PostMethod.MethodConfig.Json.Dir} 
                                                                // onChange={e => onChange(e, index)} 
                                                                onChange={e => methodChange(e, index, 'post', 'dir')}
                                                                pattern='^[^:?*"<>\|]+$'
                                                                required
                                                                invalid={!new RegExp("^[^:?*\"<>|]+$").test(resource.PostMethod.MethodConfig.Json.Dir) && formSubmitted}

                                                                // invalid={!resource.jsonLocation && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                            <TooltipButton id="json_post_dir" tooltipText="En este campo se debe de ingresar la dirección del json." />
                                                            <FormFeedback>El formato del subdominio es inválido.</FormFeedback>

                                                        </div>
                                                    </FormGroup>

                                                </>
                                            )}
                            

                                            {resource.isPut && (
                                                                <div>
                                                                <h5>Detalles Put</h5>
                                                                <FormGroup>
                                                                <Label>Source:</Label>
                                                                <div className="d-flex align-items-center">

                                                                    <Input 
                                                                        type="select" 
                                                                        name="source" 
                                                                        value={resource.PutMethod.Source}
                                                                        onChange={e => methodChange(e, index, 'put', 'source')}
                                                                        required
                                                                        // invalid={!resource.source && formSubmitted}
                                                                    >
                                                                        <option value="">Selecciona una fuente</option>
                                                                        <option value="Json">JSON</option>
                                                                        <option value="Sql">SQL</option>
                                                                        <option value="Raw">RAW</option>

                                                                    </Input>
                                                                    <TooltipButton id="put_source" tooltipText="El source es la estructura en que estan los datos."  />
                                                                    <FormFeedback>Elige un source.</FormFeedback>
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar GET</FormFeedback> */}
                                                                </div>
                                                            </FormGroup>
                                                            </div>
                                            )}
                                            {resource.isPut && resource.PutMethod.Source === "Sql" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Nombre de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="dbName" 
                                                                value={resource.PutMethod.MethodConfig.Sql.DbName} 
                                                                onChange={e => methodChange(e, index, 'put', 'dbname')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_put_dbName" tooltipText="En este campo se debe de ingresar el nombre de la base de datos en SQL al cual se le quiere realizar un método post." />

                                                            </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label> Username:</Label>
                                                        <div className="d-flex align-items-center">
                                                        <Input 
                                                            type="text" 
                                                            name="username" 
                                                            value={resource.PutMethod.MethodConfig.Sql.Username} 
                                                            onChange={e => methodChange(e, index, 'put', 'username')}
                                                            // invalid={!resource.dbName && formSubmitted}
                                                        />
                                                            <TooltipButton id="sql_put_username" tooltipText="En este campo se debe de ingresar el username de la base de datos en SQL al cual se le quiere realizar un método put." />
                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label>Password del Username:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="password" 
                                                                value={resource.PutMethod.MethodConfig.Sql.Password} 
                                                                onChange={e => methodChange(e, index, 'put', 'password')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_put_password" tooltipText="En este campo se debe de ingresar el password del username de la base de datos en SQL al cual se le quiere realizar un método put." />
                                                    </div>
                                                    </FormGroup>
                                                    <FormGroup>

                                                        <Label>Coloque la Ip de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="ip" 
                                                                value={resource.PutMethod.MethodConfig.Sql.Ip} 
                                                                onChange={e => methodChange(e, index, 'put', 'ip')}
                                                                pattern="((([0-9]{1,4})\.){3})[0-9]{1,4}"
                                                                required
                                                                className='mi-input-customizado'
                                                                placeholder='ejemplo= 192.0.8.32'
                                                                invalid={!new RegExp("((([0-9]{1,4})\.){3})[0-9]{1,4}").test(resource.PutMethod.MethodConfig.Sql.Ip) && formSubmitted}

                                                            />
                                                            <TooltipButton id="sql_put_ip" tooltipText="En este campo se debe de ingresar el ip de la base de datos en SQL al cual se le quiere realizar un método put." />
                                                            <FormFeedback>El formato es inválido o el campo está vacío.</FormFeedback>
                                                
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque el puerto:</Label>
                                                        <div className="d-flex align-items-center">
                                                                <Input 
                                                                    type="text" 
                                                                    name="port" 
                                                                    value={resource.PutMethod.MethodConfig.Sql.Port} 
                                                                    onChange={e => methodChange(e, index, 'put', 'port')}
                                                                    pattern='^\d{1,15}$'      
                                                                    invalid={!new RegExp("^\d{1,15}$").test(resource.PutMethod.MethodConfig.Sql.Port) && formSubmitted}
                                                                    />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                                <TooltipButton id="sql_put_port" tooltipText="En este campo se debe de ingresar el port de la base de datos en SQL al cual se le quiere realizar un método put." />
                                                                <FormFeedback>El formato del puerto es inválido.</FormFeedback>

                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de la Tabla en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">
                                                        <Input 
                                                            type="text" 
                                                            name="table" 
                                                            value={resource.PutMethod.MethodConfig.Sql.Table} 
                                                            onChange={e => methodChange(e, index, 'put', 'table')}
                                                            // invalid={!resource.dbName && formSubmitted}
                                                        />
                                                            <TooltipButton id="sql_put_table" tooltipText="En este campo se debe de ingresar el nombre de la tabla en la base de datos en SQL al cual se le quiere realizar un método put." />
                                                    </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de la Columnas en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">
                                                                <Input 
                                                                    type="text" 
                                                                    name="columns" 
                                                                    //value={resource.PutMethod.MethodConfig.Sql.Columns} 
                                                                    value={Array.isArray(resource.PutMethod.MethodConfig.Sql.Columns) ? resource.PutMethod.MethodConfig.Sql.Columns.join(',') : ''}
                                                                    onChange={e => methodChange(e, index, 'put', 'columns')}
                                                                    // invalid={!resource.dbName && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                                <TooltipButton id="sql_put_columns" tooltipText="En este campo se debe de ingresar el nombre de las columnas (varias), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de columnas debe ser igual a la de valores." />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de los Valores </Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="values" 
                                                                    value={Array.isArray(resource.PutMethod.MethodConfig.Sql.Values) ? resource.PutMethod.MethodConfig.Sql.Values.join(',') : ''}
                                                                    onChange={e => methodChange(e, index, 'put', 'values')}
                                                                    // invalid={!resource.dbName && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                                <TooltipButton id="sql_put_values" tooltipText="En este campo se debe de ingresar los vbalores (varios), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de valores debe ser igual a la de columnas." />
                                                        </div>
                                                    </FormGroup>

                                                    <FormGroup>

                                                        <Button className="customButton" onClick={() => addCondition(index, 'put')}>Agregar Condición</Button>
                                                    </FormGroup>

                                                    {resource.PutMethod.MethodConfig.Sql.Conditions.map((condition, conditionIndex) => (
                                                        <FormGroup key={conditionIndex}> 

                                                            <div className='containerConditions' >

                                                                <Label>Condición {conditionIndex + 1}</Label>
                                                                <TooltipButton marginTop="10px" id="sql_post_conditions" tooltipText="En las conditions, puedes agregar tantas condiciones desees presionando el boton de 'Agregar condición', solo debes de colocar la columna y el valor." />


                                                            </div>
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Columna"
                                                                    value={condition.Column}
                                                                    onChange={e => methodChange(e, index, 'put', 'column', conditionIndex)}
                                                                />
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Valor"
                                                                    value={condition.Value}
                                                                    onChange={e => methodChange(e, index, 'put', 'value', conditionIndex)}
                                                                />
                                                                {conditionIndex !== 0 && 

                                                                    <Button onClick={() => removeCondition(index, 'put', conditionIndex)}>Eliminar Condición {conditionIndex}</Button>
                                                                }
                                                        </FormGroup>
                                                    ))}


                                                </>

                                            
                                            )}
                                            {resource.isPut && resource.PutMethod.Source === "Raw" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Prametro del Raw:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="rawparam" 
                                                                    value={resource.PutMethod.MethodConfig.Raw.Param} 
                                                                    // onChange={e => onChange(e, index)} 
                                                                    onChange={e => methodChange(e, index, 'put', 'rawparam')}
                                                                    // invalid={!resource.jsonLocation && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                                <TooltipButton id="raw_put_param" tooltipText="En este campo se debe de ingresar parametro del Raw." />
                                                        </div>
                                                    </FormGroup>
                                                        </>
                                            )}
                                            {resource.isPut && resource.PutMethod.Source === "Json" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Ubicación del JSON:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="jsonLocation" 
                                                                    value={resource.PutMethod.MethodConfig.Json.Dir} 
                                                                    // onChange={e => onChange(e, index)} 
                                                                    onChange={e => methodChange(e, index, 'put', 'dir')}
                                                                    pattern='^[^:?*"<>\|]+$'
                                                                    required
                                                                    invalid={!new RegExp("^[^:?*\"<>|]+$").test(resource.PutMethod.MethodConfig.Json.Dir) && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                                <TooltipButton id="json_put_dir" tooltipText="En este campo se debe de ingresar la dirección del json." />
                                                                <FormFeedback>El formato es inválido o esta vacio el campo.</FormFeedback>
                                                        </div>
                                                    </FormGroup>

                                                </>
                                            )}

                                                {resource.isDelete && (
                                                                <div>
                                                                <h5>Detalles Delete</h5>
                                                                <FormGroup>
                                                                <Label>Source:</Label>
                                                                <div className="d-flex align-items-center">

                                                                    <Input 
                                                                        type="select" 
                                                                        name="source" 
                                                                        value={resource.DeleteMethod.Source}
                                                                        onChange={e => methodChange(e, index, 'delete', 'source')}
                                                                        required                                                                    >
                                                                        <option value="">Selecciona una fuente</option>
                                                                        <option value="Json">JSON</option>
                                                                        <option value="Sql">SQL</option>
                                                                        <option value="Raw">RAW</option>

                                                                    </Input>
                                                                    <TooltipButton id="delete_source" tooltipText="El source es la estructura en que estan los datos." />
                                                                    <FormFeedback>Elige un source.</FormFeedback>
                                                                </div>
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar GET</FormFeedback> */}
                                                            </FormGroup>
                                                            </div>
                                            )}
                                            {resource.isDelete && resource.DeleteMethod.Source === "Sql" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Nombre de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="dbName" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.DbName} 
                                                                onChange={e => methodChange(e, index, 'delete', 'dbname')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_delete_dbName" tooltipText="En este campo se debe de ingresar el nombre de la base de datos en SQL al cual se le quiere realizar un método delete." />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label> Username:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="username" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Username} 
                                                                onChange={e => methodChange(e, index, 'delete', 'username')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_delete_username" tooltipText="En este campo se debe de ingresar el username de la base de datos en SQL al cual se le quiere realizar un método delete." />
                                                        </div>
                                                        {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Label>Password del Username:</Label>
                                                        <div className="d-flex align-items-center">
                                                            <Input 
                                                                type="text" 
                                                                name="password" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Password} 
                                                                onChange={e => methodChange(e, index, 'delete', 'password')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_delete_password" tooltipText="En este campo se debe de ingresar el password del username de la base de datos en SQL al cual se le quiere realizar un método delete." />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque la Ip de la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="ip" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Ip} 
                                                                onChange={e => methodChange(e, index, 'delete', 'ip')}
                                                                pattern="((([0-9]{1,4})\.){3})[0-9]{1,4}"
                                                                required
                                                                className='mi-input-customizado'
                                                                placeholder='ejemplo= 192.0.8.32'
                                                                invalid={!new RegExp("((([0-9]{1,4})\.){3})[0-9]{1,4}").test(resource.DeleteMethod.MethodConfig.Sql.Ip) && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_delete_ip" tooltipText="En este campo se debe de ingresar el ip de la base de datos en SQL al cual se le quiere realizar un método delete." />
                                                            <FormFeedback>El formato es inválido o el campo está vacío.</FormFeedback>

                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Coloque el puerto:</Label>
                                                        <div className="d-flex align-items-center">
                                                            <Input 
                                                                type="text" 
                                                                name="port" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Port} 
                                                                onChange={e => methodChange(e, index, 'delete', 'port')}
                                                                pattern='^\d{1,15}$'      
                                                                invalid={!new RegExp("^\d{1,15}$").test(resource.DeleteMethod.MethodConfig.Sql.Port) && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_deletet_port" tooltipText="En este campo se debe de ingresar el port de la base de datos en SQL al cual se le quiere realizar un método delete." />
                                                            <FormFeedback>El formato del puerto es inválido.</FormFeedback>
                                                        </div>       
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre de la Tabla en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="table" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Table} 
                                                                onChange={e => methodChange(e, index, 'delete', 'table')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_delete_table" tooltipText="En este campo se debe de ingresar el nombre de la tabla base de datos en SQL al cual se le quiere realizar un método delete." />
                                                        </div>
                                                    </FormGroup>
                                                    
                                                    <FormGroup>
                                                        <Label>Nombre de la Columna en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="columns" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Columns} 
                                                                onChange={e => methodChange(e, index, 'delete', 'columns')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                            <TooltipButton id="sql_delete_columns" tooltipText="En este campo se debe de ingresar el nombre de las columnas (varias), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de columnas debe ser igual a la de valores." />
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label>Nombre del valor de la condicion en la Base de Datos:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="values" 
                                                                value={resource.DeleteMethod.MethodConfig.Sql.Values} 
                                                                onChange={e => methodChange(e, index, 'delete', 'values')}
                                                                // invalid={!resource.dbName && formSubmitted}
                                                            />
                                                            <TooltipButton id="sql_delete_values" tooltipText="En este campo se debe de ingresar los vbalores (varios), separadas por una coma (,) en cual se le quiere realizar un método post. La cantidad de valores debe ser igual a la de columnas." />
                                                        </div>
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar SQL</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup>

                                                        <Button className="customButton" onClick={() => addCondition(index, 'delete')}>Agregar Condición</Button>
                                                    </FormGroup>


                                                    {resource.DeleteMethod.MethodConfig.Sql.Conditions.map((condition, conditionIndex) => (
                                                        <FormGroup key={conditionIndex}> 

                                                            <div className='containerConditions' >

                                                                <Label>Condición {conditionIndex + 1}</Label>
                                                                <TooltipButton marginTop="10px" id="sql_delete_conditions" tooltipText="En las conditions, puedes agregar tantas condiciones desees presionando el boton de 'Agregar condición', solo debes de colocar la columna y el valor." />


                                                            </div>
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Columna"
                                                                    value={condition.Column}
                                                                    onChange={e => methodChange(e, index, 'delete', 'column', conditionIndex)}
                                                                />
                                                                <Input 
                                                                    type="text" 
                                                                    placeholder="Valor"
                                                                    value={condition.Value}
                                                                    onChange={e => methodChange(e, index, 'delete', 'value', conditionIndex)}
                                                                />
                                                                {conditionIndex !== 0 && 

                                                                    <Button onClick={() => removeCondition(index, 'delete', conditionIndex)}>Eliminar Condición</Button>
                                                                }
                                                        </FormGroup>
                                                    ))}


                                                </>

                                            
                                            )}
                                            {resource.isDelete && resource.DeleteMethod.Source === "Raw" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Prametro del Raw:</Label>
                                                        <div className="d-flex align-items-center">

                                                            <Input 
                                                                type="text" 
                                                                name="rawparam" 
                                                                value={resource.DeleteMethod.MethodConfig.Raw.Param} 
                                                                // onChange={e => onChange(e, index)} 
                                                                onChange={e => methodChange(e, index, 'delete', 'rawparam')}
                                                                // invalid={!resource.jsonLocation && formSubmitted}
                                                            />
                                                            {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                            <TooltipButton id="raw_delete_param" tooltipText="En este campo se debe de ingresar parametro del Raw." />
                                                        </div>
                                                    </FormGroup>
                                                        </>
                                            )}
                                            {resource.isDelete && resource.DeleteMethod.Source === "Json" && (
                                                <>
                                                    <FormGroup>
                                                        <Label>Ubicación del JSON:</Label>
                                                        <div className="d-flex align-items-center">

                                                                <Input 
                                                                    type="text" 
                                                                    name="jsonLocation" 
                                                                    value={resource.DeleteMethod.MethodConfig.Json.Dir} 
                                                                    // onChange={e => onChange(e, index)} 
                                                                    onChange={e => methodChange(e, index, 'delete', 'dir')}
                                                                    pattern='^[^:?*"<>\|]+$'
                                                                    required
                                                                    invalid={!new RegExp("^[^:?*\"<>|]+$").test(resource.DeleteMethod.MethodConfig.Json.Dir) && formSubmitted}
                                                                />
                                                                {/* <FormFeedback>Este campo es obligatorio al seleccionar JSON</FormFeedback> */}
                                                                <TooltipButton id="json_DELETE_dir" tooltipText="En este campo se debe de ingresar la dirección del json." />
                                                                <FormFeedback>El formato es inválido o esta vacio el campo.</FormFeedback>
                                                        </div>
                                                    </FormGroup>

                                                </>
                                            )}
                                        </div>
                                    ))}
                                    <FormGroup>
                                        <Button color="success" type="submit" >Crear</Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
      </section>

    );
}
