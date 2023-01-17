import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ScheduleService from '../../service/ScheduleService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';

const ScheduleManage = () => {
    const [schedules, setSchedules] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [scheduleDialog, setScheduleDialog] = useState(false);
    const [deleteScheduleDialog, setDeleteScheduleDialog] = useState(false);
    const [error, setError] = useState(null);
    const [saveSucces, setSaveSucces] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);

    useEffect(() => {
        let scheduleService = new ScheduleService();
        scheduleService.getAllSchedule().then(res => setSchedules(res));
      }, [!saveSucces])

    const header = (
        <div className="table-header">
            <h5>Lista de horarios</h5>
        </div>
            
    )

    const editSchedule = (schedule) => {
        setSchedule({...schedule});
        setScheduleDialog(true);
    }

    const confirmDeleteSchedule = (schedule) => {
        setSchedule(schedule);
        setDeleteScheduleDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" style={{backgroundColor:"#3E4396",
                border:"none"}} onClick={() => editSchedule(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteSchedule(rowData)} /> */}
            </React.Fragment>
        );
    }

    const hideDialog = () => {
        // setSubmitted(false);
        setScheduleDialog(false);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _schedule = {...schedule};
        _schedule[`${name}`] = val;

        setSchedule(_schedule);
    }

    const save = () => {
        // console.log("sirve el botón?");

    let scheduleService = new ScheduleService();
    console.log(schedule)
    scheduleService.updateSchedule(schedule).then(res => {
      setSchedule({})
      setScheduleDialog(false);
      setSaveSucces(!saveSucces);
    
    });

    // ScheduleService.saveSchedule({arrival: schedule.arrival, departure: schedule.departure}).then(res => {
    //     setSchedule([])
    //     setScheduleDialog(false);
    //   });
    }

    const renderFooter = () => {
        return (
          <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setScheduleDialog(false)} className="p-button-text" />
            <Button label="Confirmar" icon="pi pi-check" onClick={() => save()} autoFocus />
          </div>
        );
      }

    return (
        <div>
            <div className="card">
                <DataTable value={schedules} style={{width:"600px", margin:"0 auto"}} header={header} /* footer="Footer"  */showGridlines responsiveLayout="scroll" >
                    <Column className='text-center' field="arrival" header="llegada"></Column>
                    <Column className='text-center' field="departure" header="salida"></Column>
                    <Column header="opciones" body={actionBodyTemplate} /* exportable={false} */  style={{ maxWidth: '4rem' }} ></Column>
                </DataTable>
                <Dialog visible={scheduleDialog} header='Horas' onHide={hideDialog} footer={renderFooter()}>
                <form id="schedule-form">
                <div className="field" footer={renderFooter()}>
                    <label htmlFor="arrival">Horas</label>
                    <input type="time" style={{fontSize:"1.2em", marginRight:"30px"}} id='arrival' value={schedule?.arrival} onChange={(e) => onInputChange(e, 'arrival')} />
                    <input type="time" style={{fontSize:"1.2em"}} id='departure' value={schedule?.departure} onChange={(e) => onInputChange(e, 'departure')} />
                    {/* <InputTextarea id="arrival" value={schedule?.arrival} onChange={(e) => onInputChange(e, 'arrival')} required rows={3} cols={20} />
                    <InputTextarea id="departure" value={schedule?.departure} onChange={(e) => onInputChange(e, 'departure')} required rows={3} cols={20} /> */}
                     {/* <InputText name="arrival" value={schedule?.arrival} onChange={({ target }) => setSchedule({ ...schedule, ['arrival']: target.value })} style={{ width: '400px' }} />
                     <InputText name="departure" value={schedule?.departure} onChange={({ target }) => setSchedule({ ...schedule, ['departure']: target.value })} style={{ width: '400px' }} /> */}
                </div>
                </form>
                </Dialog>
            </div>
        </div>
    );
}

export default ScheduleManage