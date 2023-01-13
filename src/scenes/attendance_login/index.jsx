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

        if (pinEmploye === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios!',
            })
            return;
        } else {
            Swal.fire({
                position: 'center',
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
                                    id='arrival'
                                    type="radio"
                                    name="arrival"
                                    value="arrival"
                                    checked={state === 'arrival'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="arrival">
                                    <div className="indicator"></div>
                                    <span className="text"> Hora llegada</span>
                                </label>
                            </div>
                            <div className="wrapper">
                                <input
                                    className='state'
                                    id='breakIn'
                                    type="radio"
                                    name="breakIn"
                                    value="breakIn"
                                    checked={state === 'breakIn'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="breakIn">
                                    <div className="indicator"></div>
                                    <span className="text"> Salida almuerzo</span>
                                </label>
                            </div>
                            <div className="wrapper">
                                <input
                                    className="state"
                                    id='breakOut'
                                    type="radio"
                                    name="breakOut"
                                    value="breakOut"
                                    checked={state === 'breakOut'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="breakOut">
                                    <div className="indicator"></div>
                                    <span className="text"> Entrada almuerzo</span>
                                </label>
                            </div>



                            <div className="wrapper">
                                <input
                                    className="state"
                                    id='departure'
                                    type="radio"
                                    name="departure"
                                    value="departure"
                                    checked={state === 'departure'}
                                    onChange={event => setState(event.target.value)}
                                />
                                <label className="label" htmlFor="departure">
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

