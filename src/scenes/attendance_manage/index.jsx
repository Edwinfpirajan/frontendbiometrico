import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import  xlsx from 'xlsx';
// import { DatePicker } from 'react-date-picker';

import AttendanceService from '../../service/AttendanceService'

import './DataTableDemo.css';

const DataTableCrudDemo = () => {

    const [globalFilter, setGlobalFilter] = useState(null);
    // const toast = useRef(null);
    const dt = useRef(null);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await AttendanceService.getAllAttendance();
            setAttendance(data);
        };
        fetchData();
    }, []);

    const formatTime = (time) => {
        let date = new Date(time);
        let options = {hour: 'numeric', minute: 'numeric'};
        return date.toLocaleTimeString('en-US', options);
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(attendance);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'attendance');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <Button label="Export" icon="pi pi-download" onClick={exportCSV} /> */}
                <Button type="button" label="Exportar Registros" icon="pi pi-download" onClick={exportExcel} className="p-button-success mr-2" data-pr-tooltip="XLS" />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (attendance) => {
        return <img src={`${attendance.photo}`}  alt={attendance.image} className="product-image" />;
    }

    const header = (
        <div className="table-header" style={{backgroundColor: colors.blueAccent[700], border: "1px solid red"}}>
            <h5 className="mx-0 my-1">REGISTRO DE ASISTENCIAS</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );    

    return (
        <div className="datatable-crud-demo">
            <div className="card">
                <Toolbar className="mb-0 toolbar"  right={rightToolbarTemplate} style={{background: "none", border: "none"}}></Toolbar>
                <DataTable ref={dt} value={attendance}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} de {last} de un total {totalRecords} registros"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                        
                    <Column field="pinEmploye" header="Pin" sortable style={{ minWidth: '10rem',backgroundColor: colors.primary[400], fontWeight: "500" }} ></Column>
                    <Column field="arrival" header="Llegada" sortable style={{ minWidth: '10rem',backgroundColor: colors.primary[400], fontWeight: "500"}}></Column>
                    <Column field="breakIn" header="Hora almuerzo" sortable style={{ minWidth: '10rem',backgroundColor: colors.primary[400], fontWeight: "500"}}></Column>
                    <Column field="breakOut" header="Entrada almuerzo" sortable style={{ minWidth: '10rem',backgroundColor: colors.primary[400], fontWeight: "500"}}></Column>
                    <Column field="departure" header="Hora salida" sortable style={{ minWidth: '10rem',backgroundColor: colors.primary[400], fontWeight: "500"}}></Column>
                    <Column header="Foto" body={imageBodyTemplate} style={{backgroundColor: colors.primary[400]}}/>

                </DataTable>
            </div>
        </div>
    );
}

export default DataTableCrudDemo;