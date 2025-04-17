function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Procesar JSON de EZE GEN1 (hasta 200 registros por sensor por call)
    
    if (jsonPayload.data !== null) {
        /*--------------------------------------------------------------------------------------------
        VARIABLES PLANTA 1
        ----------------------------------------------------------------------------------------------*/
        var camaraA = device.endpoints.byAddress(1);
        var hornoA = device.endpoints.byAddress(2);
        var hornoB = device.endpoints.byAddress(3);
        var camaraD = device.endpoints.byAddress(9);
        var puertasCamA = device.endpoints.byAddress(11);


        /*--------------------------------------------------------------------------------------------
        VARIABLES PLANTA 2
        ----------------------------------------------------------------------------------------------*/
        var camaraB = device.endpoints.byAddress(1);
        var empaque1 = device.endpoints.byAddress(2);
        var puertaC = device.endpoints.byAddress(3);
        var mezcla = device.endpoints.byAddress(4);
        var puertaB = device.endpoints.byAddress(5);
        var puertaCext = device.endpoints.byAddress(6);
        var camaraC = device.endpoints.byAddress(12);
        var potes = device.endpoints.byAddress(1);



/*------------------------------------------------------------------------------------------------------

SENTENCIAS PLANTA 1  SENTENCIAS PLANTA 1  SENTENCIAS PLANTA 1  SENTENCIAS PLANTA 1  SENTENCIAS PLANTA 1  

--------------------------------------------------------------------------------------------------------*/        


        
        // Sentencia para Payload de Camara de  frio A Input 1
        if (jsonPayload.pid == "Camara de Frio AII")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraA.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload de Horno A input 2
        if (jsonPayload.pid == "Horno A")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    hornoA.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload de Horno B input 3
        if (jsonPayload.pid == "Horno B")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    hornoB.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



        // Sentencia para Payload Camara D
        if (jsonPayload.pid == "Camara de Frio D")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraD.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }






         // Sentencia para Payload Puerta Camara A
        /*
        2800:  AMBAS CERRADAS -----> 1
        3900:  EXTERIOR ABIERTA ---> 2
        5000:  INTERIOR ABIERTA ---> 1
        10000: AMBAS ABIERTAS -----> 2
        */

        if (jsonPayload.pid == "Puertas camara Frio A")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);

                    if(item.val <= 2800){
                    env.log("Cerrada  ",item.val, " ciclo ",i)
                    puertasCamA.updateIASSensorStatus(1,item.time);
                    }
                    if(item.val > 2800 && item.val <=10000 ){
                    env.log("Abierta",item.val, " ciclo ",i)
                    puertasCamA.updateIASSensorStatus(2,item.time);
                    }
                    if(item.val > 10000 ){
                    env.log("Fuera de rango",item.val, " ciclo ",i)
                    puertasCamA.updateIASSensorStatus(7,item.time);
                    }

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }







    }
   





/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

SENTENCIAS PLANTA 2  SENTENCIAS PLANTA 2  SENTENCIAS PLANTA 2  SENTENCIAS PLANTA 2 SENTENCIAS PLANTA 2  

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/




// Camara de Frio B

if (jsonPayload.pid == "CAMARA_B")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraB.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }







//-------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------







// Empaque 1

if (jsonPayload.pid == "SALA ENVASADO")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    empaque1.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }











//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

//Puertas Frio C

if (jsonPayload.pid == "Puerta Camara de Frio C int")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);
                    let aux = parseInt(item.val);
                    env.log("Numero parseado--->",aux);

                    if(aux == "20"  ){
                    puertaC.updateIASSensorStatus(1);
                    env.log("cerrada",aux, " ciclo ", i);
                    }
                    if(aux == "100" ){
                    puertaC.updateIASSensorStatus(2);
                    env.log("abierta",aux, " ciclo ", i);
                    }
                    if(aux > 100 || aux < 20){
                    env.log("otro ",aux, " ciclo ", i);
                    puertaC.updateIASSensorStatus(7);
                    }
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

// Mezcla Sellado Dosificado


if (jsonPayload.pid == "Mezcla")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    mezcla.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }






//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------



//Puerta cámara de frio B


if (jsonPayload.pid == "Puerta B")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);
                    let aux = parseInt(item.val);
                    env.log("Numero parseado--->",aux);

                    if(aux == 4)
                    puertaB.updateIASSensorStatus(1);
                    env.log("cerrada ",aux , " ciclo ",i);
                    if(aux == "5" )
                    puertaB.updateIASSensorStatus(2);
                    env.log("abierta ",aux, " ciclo ",i);
                    if(aux > 5 || aux < 4 )
                    puertaB.updateIASSensorStatus(7);
                    env.log("otro ", " ciclo ",i);

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------
//Puertas Frio C exterior

if (jsonPayload.pid == "Puerta C ext")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);
                    aux= parseInt(item.val);
                    env.log("Numero parseado--->",aux);

                    if(aux == 6  ){
                    puertaCext.updateIASSensorStatus(1);
                    env.log("cerrada  ",aux, " ciclo ",i);
                    }
                    if(aux == 7 ){
                    puertaCext.updateIASSensorStatus(2);
                    env.log("abierta  ",aux," ciclo ",i);
                    }
                    if(aux > 7 || aux < 6 ){
                    puertaCext.updateIASSensorStatus(7);
                    env.log("otro  ",aux, " ciclo ",i);
                    }

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



//-------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------

// Camara de Frio C 

if (jsonPayload.pid == "CAMARA FRIO C")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraC.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }











//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------


// POTES

if (jsonPayload.pid == "POTES")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("VALOR --> ",item.val);
                    env.log("Ciclo --> ",i);
                    potes.updateGenericSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }











//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

    // Importante: si el script llega a este punto es que no se pudo parsear el json.
    // Como no estamos devolviendo nada, el motor de scripting devolverá el valor por
    // defecto, que consiste en:
    // - Status code 200
    // - Content type "text/plain"
    // - Body vacío (sin contenido)
}