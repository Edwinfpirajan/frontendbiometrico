import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import xlsx from 'xlsx';


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
            if (!time) return '';   
            let date = new Date(time);
            let options = {hour: 'numeric', minute: 'numeric'};
            return date.toLocaleTimeString('en-US', options);
        } 
        const formatDate = (time) => {
            let date = new Date(time);
            let options = { day: '2-digit', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('es-ES', options);
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
        return <img src={`${attendance.photo}`}  className="product-image" />;
    }

    const header = (
        <div className="table-header" style={{ backgroundColor: colors.blueAccent[700], border: "1px solid red" }}>
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
                <Toolbar className="mb-0 toolbar" right={rightToolbarTemplate} style={{ background: "none", border: "none" }}/>
                <DataTable ref={dt} value={attendance}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} de {last} de un total {totalRecords} registros"
                    /* globalFilter={globalFilter} */ header={header} responsiveLayout="scroll">
                    <Column field="pinEmploye" header="Pin"/>
                    <Column field="first_name" header="Nombre"/>
                    <Column field="last_name" header="Apellido"/>
                    <Column field="date" header="Fecha" body={(rowData) => formatDate(rowData.date)}/>
                    <Column field="arrival" header="Llegada" body={(rowData) => formatTime(rowData.arrival)} />
                    <Column field="breakIn" header="Break In" body={(rowData) => formatTime(rowData.breakIn)} />
                    <Column field="breakOut" header="Break Out" body={(rowData) => formatTime(rowData.breakOut)} />
                    <Column field="departure" header="Departure" body={(rowData) => formatTime(rowData.departure)} />
                    <Column header="Foto" body={imageBodyTemplate} style={{ backgroundColor: colors.primary[400] }} />

                </DataTable>
            </div>
        </div>
    );
}

export default DataTableCrudDemo;