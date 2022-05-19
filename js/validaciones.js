export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMenssajeDeError(tipoDeInput, input);
    };

}

const tiposDeErrores = [
    'valueMissing', 
    'TypeMismatch',
    'patternMismatch',
    'customError',
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio',
    },
    email: {
        valueMissing: 'El campo correo electrónico no puede estar vacio', 
        TypeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: 'Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial', 
    },
    nacimiento: {
        valueMissing: 'El campo nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad',
    },
    numero: {
        valueMissing: 'El campo número telefónico no puede estar vacio', 
        patternMismatch: 'El formato requerido es xxxxxxxxxxxxx (13 números)',
    },
    direccion: {
        valueMissing: 'El campo dirección no puede estar vacio', 
        patternMismatch: 'La dirección debe tener entre 10 y 40 caracteres',
    },
    ciudad: {
        valueMissing: 'El campo ciudad no puede estar vacio', 
        patternMismatch: 'La ciudad debe tener entre 10 y 40 caracteres',
    },
    estado: {
        valueMissing: 'El campo estado no puede estar vacio', 
        patternMismatch: 'El estado debe tener entre 10 y 40 caracteres',
    }, 
}; 

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMenssajeDeError(tipoDeInput, input){
    let mensaje = ""
    tiposDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error); 
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]); 
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    };

    input.setCustomValidity(mensaje)
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;

};



