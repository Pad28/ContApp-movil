# ContApp Movil
___
### Instalar dependencias
- Ejecuta el comando `npm i` desde el directorio raiz

### Scripts
- `npx expo start`: Para ejecutar el modo desarrollo.

### Variables de entorno
- EXPO_PUBLIC_API_URL

### Llaves de almacenamineto asincrono
- FONT_SIZE: Acceder al tamaño de letra guardado por el usuario
- DEVELOPMENT_SETTINGS: Ver si las opciones de desarrollador estan activas o inactivas
- USER_AUTHENTICATED: Información del usuario autenticado
- USER_TOKEN: JWT de usuario autenticado

### Compilación
1. Crear una cuenta en expo e instalar eas-cli con 
```bash 
npm install eas-cli -g
```

2. Iniciar sesión es eas-cli con:
```bash
eas login
```

3. Iniciar un proyecto de eas con:
```bash
eas init
```

4. Crear un archivo de configuración con: 
```bash
eas build:configure
```
Esto crea un **_eas.json_** en la carpeta raiz del proyecto
<br/>
<br/>

5. La sección de **preview** del archivo json debe verse algo como esto:
```json
"preview": {
    "distribution": "internal",
    
    // Declara el valor de las variables de entorno aqui
    "env": {
        "EXPO_PUBLIC_API_URL": "http://isistemas.upt.edu.mx:22288" 
    }
}

```
6. Ejecuta el comando:
 ```bash
 eas build -p android --profile preview
 ```
Donde **_-p_** es la plataforma y **_--profile_** el perfil de construcción.