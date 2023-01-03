import { preventDefault } from '@fullcalendar/core';
import logoDistri from '../../img/logos/logo.png'   
import Swal from 'sweetalert2'
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import AttendanceService from '../../service/AttendanceService'
import './style.css';

const Formulario = () => {
    const webcamRef = useRef(null);
    const [pinEmploye, setPinEmploye] = useState('');
    const [state, setState] = useState('');
    const [photo, setPhoto] = useState(null);

    let takePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhoto(imageSrc);
    }

    // const handleValidatePin = (e) => {
    //     e.preventDefault();
    //     AttendanceService.validatePin(pinEmploye).then((employe) => {
    //       if (employe) {
    //         Swal.fire({
    //           icon: "success",
    //           title: `Empleado encontrado`,
    //           html: `
    //             <p>Nombre: ${employe.first_name} ${employe.last_name}</p>
    //             <p>Empresa: ${employe.company}</p>
    //             <p>Cargo: ${employe.position}</p>
    //           `,
    //         });
    //       }
    //     });
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault()

        takePhoto()

        if (pinEmploye === '' || state === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
            return;
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500
            })
        }

        // console.log(photo);                              
        await AttendanceService.createArrival({
            pinEmploye,
            state,
            photo
        });
    }


    return (
        <section className='container'>
            <div className='contenido'>
                <div className='content1' >
                    <div className='cam-content'>
                        <img src={logoDistri} className="logo-distri" />
                        <Webcam
                            audio={false}
                            // height={320}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={380}
                        />
                    </div>
                </div>
                <div className='content2'>
                    <form onSubmit={handleSubmit}>
                        <div className="radiogroup">
                            <div className='idemploye'>
                                <label>PIN EMPLEADO</label>
                                <input
                                    className="id-input"
                                    placeholder="Escriba su pin"
                                    type="text"
                                    name="pinEmploye"
                                    value={pinEmploye}
                                    onChange={event => setPinEmploye(event.target.value)}
                                />
                            </div>
                            <div className="wrapper">
                                <input
                                    className='state'
                                    id='Hora llegada'
                                    type="radio"
                                    name="state"
                                    value="Hora llegada"
                                    checked={state === 'Hora llegada'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="Hora llegada">
                                    <div className="indicator"></div>
                                    <span className="text"> Hora llegada</span>
                                </label>
                            </div>
                            <div className="wrapper">
                                <input
                                    className='state'
                                    id='Salida almuerzo'
                                    type="radio"
                                    name="state"
                                    value="Salida almuerzo"
                                    checked={state === 'Salida almuerzo'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="Salida almuerzo">
                                    <div className="indicator"></div>
                                    <span className="text"> Salida almuerzo</span>
                                </label>
                            </div>
                            <div className="wrapper">
                                <input
                                    className="state"
                                    id='Entrada almuerzo'
                                    type="radio"
                                    name="state"
                                    value="Entrada almuerzo"
                                    checked={state === 'Entrada almuerzo'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="Entrada almuerzo">
                                    <div className="indicator"></div>
                                    <span className="text"> Entrada almuerzo</span>
                                </label>
                            </div>



                            <div className="wrapper">
                                <input
                                    className="state"
                                    id='Hora de salida'
                                    type="radio"
                                    name="state"
                                    value="Hora de salida"
                                    checked={state === 'Hora de salida'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="Hora de salida">
                                    <div className="indicator"></div>
                                    <span className="text"> Hora salida</span>
                                </label>
                            </div>


                        </div>
                        <button type='submit' className="btn-save" onClick={takePhoto}>
                            <span className="text">REGISTRAR</span>
                            <span className="icon">
                                <i className="pi pi-check"></i>
                            </span>
                        </button>
                    </form>

                </div>
            </div>


        </section>
    );
}

export default Formulario;

