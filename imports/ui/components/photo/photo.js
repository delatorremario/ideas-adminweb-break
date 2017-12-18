import React from 'react';
import { MeteorCamera } from 'meteor/mertyildiran:camera';
import Files from '../../../api/files/files'

MeteorCamera.locale.errorBrowserNotSupported = 'Lo sentimos, este navegador actualmente no es compatible con la funcionalidad de la cámara.' // "Sorry, this browser is currently not supported for camera functionality.";
MeteorCamera.locale.errorAccesingCamera = 'Hubo un error al acceder a la cámara.' // "There was an error accessing the camera.";
MeteorCamera.locale.usePhoto = 'Usar Foto' // "Use Photo";
MeteorCamera.locale.takeNewPhoto = 'Tomar Nueva Foto' // "Take New Photo";
MeteorCamera.locale.waitingPermissions = 'Esperando permisos de la cámara ...' // "Waiting for camera permissions...";
MeteorCamera.locale.takePhoto = 'Tomar Photo' // "Take Photo";
MeteorCamera.locale.cancel = 'Cancelar' // "Cancel";
MeteorCamera.locale.closePopup = 'Cerra' // "Close Popup";
MeteorCamera.locale.permissionsDenied = 'Permisos de la cámara denegados' // "Camera Permissions Denied";
MeteorCamera.locale.permissionsDeniedExp = 'Usted ha denegado el permiso de esta aplicación para usar su cámara. Si desea permitir permisos, siga las instrucciones para su navegador a continuación.' // "You have denied this app permission to use your camera. If you would like to allow permissions, follow the directions for your browser below.";
MeteorCamera.locale.howToChrome ='Vaya a Configuración> "Mostrar configuraciones avanzadas ..."> "Configuración de contenido ..."> Encabezado de medios> "Administrar excepciones ...", luego encuentre este sitio web en la lista y permita la captura de videos.' //'Go to Settings > "Show advanced settings..." > "Content settings..." > Media heading > "Manage exceptions...", then find this website in the list and allow video capture.';
MeteorCamera.locale.howToFirefox = 'Recargue la página e intente de nuevo.' // "Reload the page and try again.";
MeteorCamera.locale.howToOpera = 'Vaya a Preferencias> Sitios web> Encabezado de medios> "Administrar excepciones ...", luego encuentre este sitio web en la lista y permita la captura de videos.' // 'Go to Preferences > Websites > Media heading > "Manage exceptions...", then find this website in the list and allow video capture.';

const takePhoto = (saveData) => e => {
    MeteorCamera.getPicture((err, data) => {
        if (err) { console.log('err', err); return }
        //  console.log('data', data);
        // convertir a archivo

        let fileId = Files.insert({
            file: data,
            isBase64: true, // <— Mandatory
            fileName: 'camera.png', // <— Mandatory
            // type: 'image/png' // <— Mandatory
        });

        fileId.on('end', function (error, fileObj) {
            if (error) { console.log('Error', error); return; }
            saveData(fileObj);
            Bert.alert(`El archivo ${fileObj.name}, se subió correctamente.`, 'success');
        });

        fileId.on('error', function (error, fileObj) {
            Bert.alert(`${error}`, 'danger');
        });
    })
}

const Photo = ({ saveData }) => {


    return <div className="file addPhoto" onClick={takePhoto(saveData).bind(this)}>
        <div className='fa fa-camera'></div>
    </div>
}

export default Photo