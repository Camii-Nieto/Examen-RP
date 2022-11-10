// requiero todos los datos que voy a necesitar del html
const agregarParticipante = document.querySelector(".agregar");
const listaParticipantes = document.querySelector(".lista");
const nombre = document.querySelector(".nombreParticipante");
const apellido = document.querySelector(".apellidoParticipante");
const dni = document.querySelector(".dniParticipante");
const form = document.querySelector(".formParticipantes");
const tipoSorteo = document.querySelector(".tipoSorteo");
const cantGanadores = document.querySelector(".cantGanadores");
const sortear = document.querySelector(".sortear");
const formSorteo = document.querySelector(".formSorteo");
const listaGanadores = document.querySelector(".listaGanadores");
const columnaGanadores = document.querySelector(".columnaGanadores");
const form2 = document.querySelector(".formSorteo");


// Array para registrar los participantes
const participantes = []; 
// Array para guardar los documentos y poder comparar que no haya dos iguales 
const documentos = [];
// Array para guardar a los ganadores
const ganadores = [];


// plasmo el usuario en el html
const generarParticipante = (nombre, apellido, dni) => {
    const codigo = `
    <tr>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${dni}</td>
  </tr>
    `
    listaParticipantes.innerHTML += codigo;
}

// Funcion para cargar la tabla del sorteo sin orden
const generarGanador = (nombre, apellido, dni) => {
    const ganador = `
    <tr>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${dni}</td>
  </tr>
    `
    listaGanadores.innerHTML += ganador;
}

// Funcion para cargar la tabla del sorteo ordenado
const generarGanador2 = (puesto, nombre, apellido, dni) => {
    const ganador = `
    <tr>
    <td>${puesto}</td>
    <td>${nombre}</td>
    <td>${apellido}</td>
    <td>${dni}</td>
  </tr>
    `
    listaGanadores.innerHTML += ganador;
}


// Funcion para generar las columnas del sorteo sin orden
const generarColumnas = () => {
    const columnas =   `<th scope="col">Nombre</th>
    <th scope="col">Apellido</th>
    <th scope="col">DNI</th> `
    
    columnaGanadores.innerHTML += columnas;

}

// Funcion para generar las columnas del sorteo ordenado
const generarColumnas2 = () => {
    const columnas =   `
    <th scope="col">Puesto</th>
    <th scope="col">Nombre</th>
    <th scope="col">Apellido</th>
    <th scope="col">DNI</th>
    `
    
    columnaGanadores.innerHTML += columnas;

}


// funcion para generar el array de participantes para realizar el sorteo
agregarParticipante.addEventListener("click", async (e)=> {
        e.preventDefault();
        const usuarioNombre = nombre.value.trim();  // trim elimina los espacios en blanco
        const usuarioApellido = apellido.value.trim(); 
        const usuarioDNI = dni.value.trim();
        
        // verifico que los campos esten completos 
        if(!usuarioNombre && !usuarioApellido && !usuarioDNI){
            alert("Por favor llene los formularios correctamente")
            // si el dni del usuario ya esta ingresado tira un error
        }  else if (documentos.includes(usuarioDNI)){
            alert("El usuario ya existe, por favor ingrese uno diferente"); //si el usuario ya existe devuelve una alerta
        } else {
            // pusheo los dni a un array para luego comparar si ese usuario ya esta ingresado
            documentos.push(dni.value.trim());
            // genero el usuario 
            generarParticipante(usuarioNombre, usuarioApellido, usuarioDNI);
            // pusheo el participante al array para utilizarlo para el sorteo
            participantes.push({
                nombre: nombre.value.trim(),
                apellido: apellido.value.trim(),
                dni: dni.value.trim()
            });
            console.log(participantes);
            form.reset(); //reseteo el formulario
             
        }
    });



const sorteo1 =  ( participantes, cantGanadores) => {
    // array para guardar los documentos y comparar que no se repitan los ganadores
    const documentosSorteo = [];

    // si la cantidad de ganadores es mas grande que la cantidad de participantes ingresados
    if(participantes.length < cantGanadores){
        // devuelve una alerta
        alert("Por favor ingrese una cantidad ganadores menor a los participantes ingresados");
    } else {
        // mientras que los ganadores sean menores a la cantidad deseada se repite el ciclo
        while(ganadores.length < cantGanadores){
            // numero random para sacar los ganadores
            let numeroRandom = Math.floor(Math.random() * participantes.length);
     
            // si el array de ganadores esta vacio pushea el primer resultado
            if(ganadores.length === 0){
             ganadores.push(participantes[numeroRandom]);
             // pusheo el dni para comparar que no se repita
             documentosSorteo.push(participantes[numeroRandom].dni);
            } else {
             // si el usuario no estaen el array de ganadores
             if(!documentosSorteo.includes(participantes[numeroRandom].dni)){
                 ganadores.push(participantes[numeroRandom]);
                 documentosSorteo.push(participantes[numeroRandom].dni);
             }
            }
         }
         console.log(ganadores);
         console.log("sorteo1");
         generarColumnas();
         for(let i =0; i < ganadores.length; i++){
            generarGanador(ganadores[i].nombre, ganadores[i].apellido, ganadores[i].dni);
         }
         form2.reset();
         participantes = [];
    }
}

const sorteo2 =  ( participantes, cantGanadores) => {
    // Array para guardar los documentos y poder comparar que no haya dos iguales 
    const documentosSorteo = [];

  // comparo que la cantidad de ganadores sea menor a los ingresados
    if(participantes.length < cantGanadores){
        alert("Por favor ingrese una cantidad ganadores menor a los participantes ingresados");
    } else {
        while(ganadores.length < cantGanadores){
            let numeroRandom = Math.floor(Math.random() * participantes.length);
     
            if(ganadores.length === 0){
             ganadores.push(participantes[numeroRandom]);
             documentosSorteo.push(participantes[numeroRandom].dni);
            } else {
             if(!documentosSorteo.includes(participantes[numeroRandom].dni)){
                 ganadores.push(participantes[numeroRandom]);
                 documentosSorteo.push(participantes[numeroRandom].dni);
             }
            }
         }
         console.log(ganadores);
         generarColumnas2();
         for(let i =0; i < ganadores.length; i++){
            generarGanador2(i+1, ganadores[i].nombre, ganadores[i].apellido, ganadores[i].dni);
         }
         form2.reset();
         participantes = [];
    }
}

// funcion para que al apretar el boton se ejecute la funcion de sorteo
sortear.addEventListener("click", (e) =>{
    e.preventDefault();
    // tomo el tipo de sorteo ingresado por el usuario
    let tipoSorteo2 =  tipoSorteo.options[tipoSorteo.selectedIndex].value.trim();
    // tomo la cantidad de ganadores que ingreso el usuario
    let cantGanadores2 = cantGanadores.value.trim();
    
    // depende el tipo de sorteo ingresado se ejecuta la funcion correspondiente
    if(tipoSorteo2 == 2){
        sorteo2(participantes, cantGanadores2);
    } else if(tipoSorteo2 == 1) {
        sorteo1(participantes, cantGanadores2)
    } else {
        return console.error("error");
    }
        
})



  
