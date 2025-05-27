# Product API Challenge – Reporte del Participante

## 🧑‍💻 Nombre del Participante

María José Silva Sánchez

## ⏱ Tiempo total estimado

10-12 horas

## ✅ Funcionalidades completadas

- [x] Ambiente funcionando  
- [x] Se agregó el campo "stock"  
- [x] Se muestra el "stock" en el listado  
- [x] Se documentaron los cambios en SUBMISSION.md

## 🧾 Detalles de los cambios realizados

Describe aquí brevemente:

- ¿Cómo agregaste el nuevo campo stock?

Primero, agregué el campo stock en el modelo para poder trabajar con este dato desde el backend. Luego, lo incluí en el controlador, asignándole el tipo de dato y su valor correspondiente. Posteriormente, en el frontend desarrollado con Vue, incorporé el campo stock en el formulario para que sea visible. Además, declaré la variable stock en el componente y la añadí al objeto de envío del formulario, asegurando así que el dato se transmitiera correctamente al backend y se guardara en la base de datos. Finalmente, creé una migración, la edité para incluir el nuevo campo en la tabla correspondiente la y ejecuté, lo que permitió reflejar este cambio en la estructura de la base de datos. 

- ¿Qué archivos modificaste?


Los archivos modificados fueron los siguientes: 

- backend   
  - Controllers/Api/ProducControler.php  
  - Models/Product.php   
  - routes/api.php  
      
- frontend-vue  
  - views/Homeview.vue  
      
- frontend-react  
  - src/App.js

- ¿Qué cambios hiciste en la interfaz?


Los cambios que realicé en la interfaz fueron los siguientes:

- **Organización del formulario:** Se añadió un nuevo campo junto al campo de precio. Para mantener la coherencia visual,ambos campos fueron distribuidos utilizando un sistema de diseño con espacios proporcionales.  
- **Estructura de la tabla de productos:** Se ajustaron las columnas para mostrar claramente los títulos correspondientes a cada dato (nombre, precio, stock). Se aplicó una disposición vertical ordenada y se centraron los contenidos    
- **Formato de precios en CLP:** Se incorporó una lógica que permite al usuario ingresar precios tanto con o sin separador de miles (por ejemplo, “2000” o “2.000”), los cuales se transforman automáticamente al formato de moneda chilena ($2.000) al mostrarse.  
- **Validaciones de producto:** Se añadieron confirmaciones para evitar duplicados. Si el nombre del producto ya existe, el sistema consulta si se desea actualizarlo o cancelar. También se implementaron validaciones al eliminar un producto para confirmar la acción.  
    
- ¿Cuál fue el paso más desafiante del desafío?

El paso más desafiante del desafío fue la conexión a la base de datos, ya que anteriormente solo conocía conceptos básicos como las inyecciones SQL. Este proyecto me permitió comprender cómo se realiza una conexión estructurada utilizando Laravel, a través de modelos, controladores y rutas API.

## 🧪 Notas adicionales (opcional)

Agrega aquí cualquier información relevante, problemas encontrados o mejoras sugeridas.

Problemas encontrados: 

- Inicialmente, los precios se almacenaban incorrectamente en cuanto al formato.  
- No se encontraba habilitado para actualizar productos.


Mejoras sugeridas:

- Permitir edición directa desde la tabla de productos.

Información relevante:

- Para la estructura de la tabla, inicialmente utilicé un estilo clásico y documentado en TailwindCSS con anchos fijos para las columnas. Consideré la opción de usar FlexBox por ser más flexible y adaptativo, tal como fue recomendado por la Inteligencia Artifical, pero decidí mantener la estructura original porque no encontré documentación oficial suficiente que respalde el uso de flex para esta tabla en el contexto de TailwindCSS.